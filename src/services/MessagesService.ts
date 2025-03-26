
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";

export type Message = Tables<"messages">;
export type Conversation = Tables<"conversations">;

export type ConversationWithDetails = Conversation & {
  profile?: {
    display_name: string | null;
    photo_url: string | null;
  };
  unreadCount: number;
  lastMessage?: {
    text: string | null;
    created_at: string | null;
  };
};

export const MessagesService = {
  async getConversations(userId: string): Promise<ConversationWithDetails[]> {
    try {
      const { data: conversations, error } = await supabase
        .from("conversations")
        .select("*")
        .contains("participants", [userId])
        .order("updated_at", { ascending: false });

      if (error) {
        console.error("Error fetching conversations:", error);
        throw error;
      }

      // For each conversation, get the profile of the other user (if one-to-one)
      // and the unread message count
      const conversationsWithDetails = await Promise.all(
        conversations.map(async (conversation) => {
          let profile = null;
          let unreadCount = 0;
          
          // Get other user's profile if this is a one-to-one conversation
          if (!conversation.is_group && conversation.participants.length === 2) {
            const otherUserId = conversation.participants.find(id => id !== userId);
            if (otherUserId) {
              const { data } = await supabase
                .from("profiles")
                .select("display_name, photo_url")
                .eq("id", otherUserId)
                .single();
              profile = data;
            }
          }

          // Get unread message count
          const { count } = await supabase
            .from("messages")
            .select("*", { count: "exact", head: true })
            .eq("conversation_id", conversation.id)
            .not("read_by", "cs", `["${userId}"]`);

          unreadCount = count || 0;

          return {
            ...conversation,
            profile,
            unreadCount,
            lastMessage: conversation.last_message as any
          };
        })
      );

      return conversationsWithDetails;
    } catch (error) {
      console.error("Error in getConversations:", error);
      return [];
    }
  },

  async getMessages(conversationId: string, userId: string): Promise<Message[]> {
    try {
      const { data: messages, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
        throw error;
      }

      // Mark messages as read
      this.markMessagesAsRead(conversationId, userId);

      return messages;
    } catch (error) {
      console.error("Error in getMessages:", error);
      return [];
    }
  },

  async markMessagesAsRead(conversationId: string, userId: string): Promise<void> {
    try {
      // Get all unread messages by this user in this conversation
      const { data: unreadMessages, error: fetchError } = await supabase
        .from("messages")
        .select("id, read_by")
        .eq("conversation_id", conversationId)
        .not("read_by", "cs", `["${userId}"]`);

      if (fetchError) throw fetchError;

      // Update each message to mark as read by this user
      if (unreadMessages && unreadMessages.length > 0) {
        for (const message of unreadMessages) {
          const readBy = message.read_by ? [...message.read_by as string[]] : [];
          if (!readBy.includes(userId)) {
            readBy.push(userId);
            
            await supabase
              .from("messages")
              .update({ read_by: readBy })
              .eq("id", message.id);
          }
        }
      }
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  },

  async sendMessage(conversationId: string, userId: string, text: string, userName: string): Promise<Message | null> {
    try {
      // Insert the message
      const { data: newMessage, error: insertError } = await supabase
        .from("messages")
        .insert({
          conversation_id: conversationId,
          sender_id: userId,
          sender_name: userName,
          text: text,
          read_by: [userId] // Mark as read by the sender
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // Update the conversation's last_message and updated_at
      const { error: updateError } = await supabase
        .from("conversations")
        .update({
          last_message: {
            text: text,
            created_at: new Date().toISOString()
          },
          updated_at: new Date().toISOString()
        })
        .eq("id", conversationId);

      if (updateError) throw updateError;

      return newMessage;
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
      return null;
    }
  },

  async createConversation(
    creatorId: string,
    participants: string[],
    isGroup: boolean = false,
    groupName: string | null = null,
    lodgeId: string | null = null
  ): Promise<string | null> {
    try {
      // Check if a one-to-one conversation already exists between these users
      if (!isGroup && participants.length === 2) {
        const { data: existingConversations } = await supabase
          .from("conversations")
          .select("id, participants")
          .eq("is_group", false)
          .contains("participants", participants);

        // Find a conversation that has exactly these two participants
        const exactMatch = existingConversations?.find(conv => 
          conv.participants.length === 2 && 
          participants.every(p => conv.participants.includes(p))
        );

        if (exactMatch) {
          return exactMatch.id;
        }
      }

      // Create a new conversation
      const { data, error } = await supabase
        .from("conversations")
        .insert({
          created_by: creatorId,
          participants: participants,
          is_group: isGroup,
          group_name: groupName,
          lodge_id: lodgeId,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      
      return data.id;
    } catch (error) {
      console.error("Error creating conversation:", error);
      toast({
        title: "Error",
        description: "Failed to create conversation. Please try again.",
        variant: "destructive"
      });
      return null;
    }
  }
};

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Mail, Check, Clock, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { 
  MessagesService, 
  ConversationWithDetails, 
  Message 
} from '@/services/MessagesService';
import { toast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import MobileFooterMenu from '@/components/layout/MobileFooterMenu';
import { supabase } from '@/integrations/supabase/client';

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language === 'fr' ? fr : enUS;
  const { user } = useAuth();
  
  const [conversations, setConversations] = useState<ConversationWithDetails[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ConversationWithDetails | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Load conversations
  useEffect(() => {
    const loadConversations = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const userConversations = await MessagesService.getConversations(user.id);
        setConversations(userConversations);
        
        // Select the first conversation if one exists and none is selected
        if (userConversations.length > 0 && !selectedConversation) {
          setSelectedConversation(userConversations[0]);
        }
      } catch (error) {
        console.error('Error loading conversations:', error);
        toast({
          title: t('messages.errors.loadFailed'),
          description: t('messages.errors.tryAgain'),
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
    
    // Set up real-time subscription for new messages
    if (user) {
      const subscription = supabase
        .channel('public:messages')
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        }, (payload) => {
          const newMsg = payload.new as Message;
          
          // If the message belongs to the current conversation, add it
          if (selectedConversation && newMsg.conversation_id === selectedConversation.id) {
            setMessages(prev => [...prev, newMsg]);
            
            // Mark the message as read immediately if it's to the current conversation
            MessagesService.markMessagesAsRead(newMsg.conversation_id, user.id);
          }
          
          // Refresh conversations to update last message and unread counts
          MessagesService.getConversations(user.id).then(updatedConversations => {
            setConversations(updatedConversations);
            
            // Update selected conversation if it's the one that received the message
            if (selectedConversation && newMsg.conversation_id === selectedConversation.id) {
              const updatedSelectedConv = updatedConversations.find(
                c => c.id === selectedConversation.id
              );
              if (updatedSelectedConv) {
                setSelectedConversation(updatedSelectedConv);
              }
            }
          });
        })
        .subscribe();
        
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [user, t, selectedConversation]);

  // Load messages when a conversation is selected
  useEffect(() => {
    const loadMessages = async () => {
      if (!user || !selectedConversation) return;
      
      try {
        setLoadingMessages(true);
        const conversationMessages = await MessagesService.getMessages(
          selectedConversation.id, 
          user.id
        );
        setMessages(conversationMessages);
        
        // Refresh conversations to update unread counts
        const updatedConversations = await MessagesService.getConversations(user.id);
        setConversations(updatedConversations);
        
        // Update selected conversation
        const updatedSelected = updatedConversations.find(c => c.id === selectedConversation.id);
        if (updatedSelected) {
          setSelectedConversation(updatedSelected);
        }
      } catch (error) {
        console.error('Error loading messages:', error);
      } finally {
        setLoadingMessages(false);
      }
    };

    loadMessages();
  }, [selectedConversation, user, ]);

  // Filter conversations based on search term
  const filteredConversations = conversations.filter(conversation => {
    // For group chats, search by group name
    if (conversation.is_group && conversation.group_name) {
      return conversation.group_name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    
    // For individual chats, search by other user's name
    if (conversation.profile?.display_name) {
      return conversation.profile.display_name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    
    return false;
  });

  // Get conversation name for display
  const getConversationName = (conversation: ConversationWithDetails) => {
    if (conversation.is_group) {
      return conversation.group_name || t('messages.unnamed');
    }
    
    return conversation.profile?.display_name || t('messages.unnamed');
  };

  // Get avatar for conversation
  const getConversationAvatar = (conversation: ConversationWithDetails) => {
    if (conversation.is_group) {
      // Use a default group avatar
      return null;
    }
    
    return conversation.profile?.photo_url;
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!user || !selectedConversation || !newMessage.trim()) return;
    
    try {
      await MessagesService.sendMessage(
        selectedConversation.id,
        user.id,
        newMessage.trim(),
        user.user_metadata?.display_name || 'User'
      );
      
      // Clear the input
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: t('messages.errors.sendFailed'),
        description: t('messages.errors.tryAgain'),
        variant: 'destructive',
      });
    }
  };

  // Handle creating a new conversation
  const handleNewConversation = () => {
    // This would typically open a modal to select users
    toast({
      title: t('messages.newConversation'),
      description: t('messages.newConversationDesc'),
    });
  };

  // Count unread messages across all conversations
  const unreadCount = conversations.reduce(
    (count, conversation) => count + (conversation.unreadCount || 0), 
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-masonic-blue-900">{t('messages.title')}</h1>
                <p className="text-gray-600 mt-1">{t('messages.subtitle')}</p>
              </div>
              
              <Button 
                className="flex items-center"
                onClick={handleNewConversation}
              >
                <Plus className="mr-2 h-4 w-4" />
                {t('messages.newMessage')}
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8"
          >
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="flex flex-col md:flex-row h-[600px]">
                {/* Messages Sidebar */}
                <div className="md:w-64 border-r border-gray-200 flex flex-col h-full overflow-hidden">
                  <div className="p-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="text"
                        placeholder={t('messages.search')}
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="p-3 flex-1 overflow-hidden">
                    <Tabs defaultValue="inbox" className="h-full flex flex-col">
                      <TabsList className="w-full">
                        <TabsTrigger value="inbox" className="flex-1">
                          {t('messages.tabs.inbox')}
                          {unreadCount > 0 && (
                            <span className="ml-2 bg-masonic-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                              {unreadCount}
                            </span>
                          )}
                        </TabsTrigger>
                        <TabsTrigger value="sent" className="flex-1">{t('messages.tabs.sent')}</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="inbox" className="mt-3 flex-1 overflow-y-auto space-y-1">
                        <div className="flex flex-col space-y-1 mb-3">
                          <Button variant="ghost" className="w-full justify-start text-gray-700 font-normal hover:bg-gray-100 hover:text-gray-900">
                            <Mail className="mr-2 h-4 w-4 text-gray-500" />
                            {t('messages.filters.all')}
                          </Button>
                          <Button variant="ghost" className="w-full justify-start text-gray-700 font-normal hover:bg-gray-100 hover:text-gray-900">
                            <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                            {t('messages.filters.unread')}
                            {unreadCount > 0 && (
                              <span className="ml-2 bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-0.5">
                                {unreadCount}
                              </span>
                            )}
                          </Button>
                          <Button variant="ghost" className="w-full justify-start text-gray-700 font-normal hover:bg-gray-100 hover:text-gray-900">
                            <Check className="mr-2 h-4 w-4 text-green-500" />
                            {t('messages.filters.read')}
                          </Button>
                        </div>
                        
                        {loading ? (
                          // Loading skeleton for conversations
                          Array(5).fill(0).map((_, i) => (
                            <div key={i} className="p-3 border-b border-gray-100">
                              <div className="flex items-center space-x-3">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div className="space-y-2 flex-1">
                                  <Skeleton className="h-4 w-3/4" />
                                  <Skeleton className="h-3 w-1/2" />
                                </div>
                              </div>
                            </div>
                          ))
                        ) : filteredConversations.length > 0 ? (
                          filteredConversations.map((conversation) => (
                            <button
                              key={conversation.id}
                              className={`w-full text-left p-3 rounded-md transition-colors ${
                                selectedConversation?.id === conversation.id
                                  ? 'bg-masonic-blue-50'
                                  : 'hover:bg-gray-50'
                              }`}
                              onClick={() => setSelectedConversation(conversation)}
                            >
                              <div className="flex items-start">
                                <div className="flex-shrink-0 mr-3">
                                  <div className="relative">
                                    <Avatar>
                                      <AvatarImage src={getConversationAvatar(conversation) || ''} />
                                      <AvatarFallback>
                                        {getInitials(getConversationName(conversation))}
                                      </AvatarFallback>
                                    </Avatar>
                                    {conversation.unreadCount > 0 && (
                                      <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-masonic-blue-600 ring-2 ring-white"></span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <p className={`text-sm font-medium truncate ${
                                      conversation.unreadCount > 0 
                                        ? 'text-gray-900'
                                        : 'text-gray-700'
                                    }`}>
                                      {getConversationName(conversation)}
                                    </p>
                                    {conversation.lastMessage?.created_at && (
                                      <p className="text-xs text-gray-500">
                                        {format(
                                          new Date(conversation.lastMessage.created_at),
                                          'd MMM',
                                          { locale: currentLocale }
                                        )}
                                      </p>
                                    )}
                                  </div>
                                  <p className={`text-sm truncate ${
                                    conversation.unreadCount > 0
                                      ? 'font-semibold text-gray-900'
                                      : 'text-gray-500'
                                  }`}>
                                    {conversation.lastMessage?.text || ''}
                                  </p>
                                </div>
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="text-center py-10">
                            <Mail className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-600">{t('messages.emptySearch')}</p>
                          </div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="sent" className="mt-3 flex-1">
                        <div className="text-center py-4 text-gray-500 text-sm">
                          {t('messages.tabs.sentMessage')}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
                
                {/* Messages Content */}
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                  {selectedConversation ? (
                    <>
                      {/* Conversation Header */}
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={getConversationAvatar(selectedConversation) || ''} />
                            <AvatarFallback>
                              {getInitials(getConversationName(selectedConversation))}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">
                              {getConversationName(selectedConversation)}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {selectedConversation.is_group
                                ? `${selectedConversation.participants.length} ${t('messages.members')}`
                                : t('messages.directMessage')}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Messages List */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {loadingMessages ? (
                          // Loading skeleton for messages
                          Array(5).fill(0).map((_, i) => (
                            <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                              <div className={`flex items-start ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                <Skeleton className="h-8 w-8 rounded-full" />
                                <div className={`mx-2 space-y-2 max-w-[80%] ${i % 2 === 0 ? 'mr-12' : 'ml-12'}`}>
                                  <Skeleton className="h-4 w-20" />
                                  <Skeleton className={`h-16 ${i % 2 === 0 ? 'w-40' : 'w-52'}`} />
                                </div>
                              </div>
                            </div>
                          ))
                        ) : messages.length > 0 ? (
                          messages.map((message) => {
                            const isCurrentUser = user && message.sender_id === user.id;
                            return (
                              <div 
                                key={message.id} 
                                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                              >
                                <div className={`flex items-start ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback>
                                      {getInitials(message.sender_name || 'User')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className={`mx-2 max-w-[80%] ${isCurrentUser ? 'text-right' : 'text-left'}`}>
                                    <p className="text-xs text-gray-500 mb-1">
                                      {message.sender_name || 'User'} • {
                                        message.created_at ? 
                                        format(
                                          new Date(message.created_at),
                                          'HH:mm',
                                          { locale: currentLocale }
                                        ) : ''
                                      }
                                    </p>
                                    <div className={`rounded-lg px-4 py-2 inline-block ${
                                      isCurrentUser 
                                        ? 'bg-masonic-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-800'
                                    }`}>
                                      <p>{message.text}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="text-center py-10">
                            <Mail className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-600">{t('messages.startConversation')}</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Message Input */}
                      <div className="p-4 border-t border-gray-200">
                        <div className="flex items-end space-x-2">
                          <Textarea
                            placeholder={t('messages.writeMessage')}
                            className="flex-1 resize-none"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                              }
                            }}
                          />
                          <Button onClick={handleSendMessage} size="icon">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center p-8">
                        <Mail className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium text-gray-900">
                          {t('messages.noConversationSelected')}
                        </h3>
                        <p className="mt-1 text-gray-500">
                          {t('messages.selectConversation')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <MobileFooterMenu />
      <Footer />
    </div>
  );
};

export default Messages;

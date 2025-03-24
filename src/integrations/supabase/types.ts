export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      attendance: {
        Row: {
          excuse: string | null
          id: string
          status: string | null
          tenue_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          excuse?: string | null
          id?: string
          status?: string | null
          tenue_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          excuse?: string | null
          id?: string
          status?: string | null
          tenue_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_tenue_id_fkey"
            columns: ["tenue_id"]
            isOneToOne: false
            referencedRelation: "tenues"
            referencedColumns: ["id"]
          },
        ]
      }
      books: {
        Row: {
          author: string | null
          available: boolean | null
          category: string | null
          cover_url: string | null
          created_at: string | null
          created_by: string
          description: string | null
          id: string
          lodge_id: string
          publisher: string | null
          title: string
          year: string | null
        }
        Insert: {
          author?: string | null
          available?: boolean | null
          category?: string | null
          cover_url?: string | null
          created_at?: string | null
          created_by: string
          description?: string | null
          id?: string
          lodge_id: string
          publisher?: string | null
          title: string
          year?: string | null
        }
        Update: {
          author?: string | null
          available?: boolean | null
          category?: string | null
          cover_url?: string | null
          created_at?: string | null
          created_by?: string
          description?: string | null
          id?: string
          lodge_id?: string
          publisher?: string | null
          title?: string
          year?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "books_lodge_id_fkey"
            columns: ["lodge_id"]
            isOneToOne: false
            referencedRelation: "lodges"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string | null
          created_by: string
          group_name: string | null
          id: string
          is_group: boolean | null
          last_message: Json | null
          lodge_id: string | null
          participants: string[]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          group_name?: string | null
          id?: string
          is_group?: boolean | null
          last_message?: Json | null
          lodge_id?: string | null
          participants: string[]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          group_name?: string | null
          id?: string
          is_group?: boolean | null
          last_message?: Json | null
          lodge_id?: string | null
          participants?: string[]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_lodge_id_fkey"
            columns: ["lodge_id"]
            isOneToOne: false
            referencedRelation: "lodges"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          author_name: string | null
          category: string | null
          created_at: string | null
          created_by: string
          degree: number | null
          description: string | null
          file_type: string | null
          file_url: string | null
          id: string
          lodge_id: string
          title: string
        }
        Insert: {
          author_name?: string | null
          category?: string | null
          created_at?: string | null
          created_by: string
          degree?: number | null
          description?: string | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          lodge_id: string
          title: string
        }
        Update: {
          author_name?: string | null
          category?: string | null
          created_at?: string | null
          created_by?: string
          degree?: number | null
          description?: string | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          lodge_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_lodge_id_fkey"
            columns: ["lodge_id"]
            isOneToOne: false
            referencedRelation: "lodges"
            referencedColumns: ["id"]
          },
        ]
      }
      invitations: {
        Row: {
          code: string
          created_at: string | null
          email: string | null
          expires_at: string
          id: string
          invited_by: string
          is_used: boolean | null
          lodge_id: string
          role: string | null
          used_at: string | null
          used_by: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          email?: string | null
          expires_at: string
          id?: string
          invited_by: string
          is_used?: boolean | null
          lodge_id: string
          role?: string | null
          used_at?: string | null
          used_by?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          email?: string | null
          expires_at?: string
          id?: string
          invited_by?: string
          is_used?: boolean | null
          lodge_id?: string
          role?: string | null
          used_at?: string | null
          used_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invitations_lodge_id_fkey"
            columns: ["lodge_id"]
            isOneToOne: false
            referencedRelation: "lodges"
            referencedColumns: ["id"]
          },
        ]
      }
      lodge_memberships: {
        Row: {
          degree: number | null
          id: string
          is_active: boolean | null
          joined_at: string | null
          lodge_id: string
          office: string | null
          role: string | null
          user_id: string
        }
        Insert: {
          degree?: number | null
          id?: string
          is_active?: boolean | null
          joined_at?: string | null
          lodge_id: string
          office?: string | null
          role?: string | null
          user_id: string
        }
        Update: {
          degree?: number | null
          id?: string
          is_active?: boolean | null
          joined_at?: string | null
          lodge_id?: string
          office?: string | null
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lodge_memberships_lodge_id_fkey"
            columns: ["lodge_id"]
            isOneToOne: false
            referencedRelation: "lodges"
            referencedColumns: ["id"]
          },
        ]
      }
      lodges: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          name: string
          obedience: string | null
          primary_color: string | null
          rite: string | null
          secondary_color: string | null
          subscription_expiry: string | null
          subscription_level: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name: string
          obedience?: string | null
          primary_color?: string | null
          rite?: string | null
          secondary_color?: string | null
          subscription_expiry?: string | null
          subscription_level?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name?: string
          obedience?: string | null
          primary_color?: string | null
          rite?: string | null
          secondary_color?: string | null
          subscription_expiry?: string | null
          subscription_level?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          attachments: Json | null
          conversation_id: string
          created_at: string | null
          id: string
          read_by: Json | null
          sender_id: string
          sender_name: string | null
          text: string | null
        }
        Insert: {
          attachments?: Json | null
          conversation_id: string
          created_at?: string | null
          id?: string
          read_by?: Json | null
          sender_id: string
          sender_name?: string | null
          text?: string | null
        }
        Update: {
          attachments?: Json | null
          conversation_id?: string
          created_at?: string | null
          id?: string
          read_by?: Json | null
          sender_id?: string
          sender_name?: string | null
          text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      news: {
        Row: {
          author_id: string
          author_name: string | null
          content: string | null
          created_at: string | null
          id: string
          image_url: string | null
          lodge_id: string
          published_at: string | null
          title: string
        }
        Insert: {
          author_id: string
          author_name?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          lodge_id: string
          published_at?: string | null
          title: string
        }
        Update: {
          author_id?: string
          author_name?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          lodge_id?: string
          published_at?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "news_lodge_id_fkey"
            columns: ["lodge_id"]
            isOneToOne: false
            referencedRelation: "lodges"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          lodge_id: string | null
          message: string | null
          read_at: string | null
          recipient_id: string
          resource_id: string | null
          resource_type: string | null
          sender_id: string | null
          title: string
          type: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          lodge_id?: string | null
          message?: string | null
          read_at?: string | null
          recipient_id: string
          resource_id?: string | null
          resource_type?: string | null
          sender_id?: string | null
          title: string
          type?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          lodge_id?: string | null
          message?: string | null
          read_at?: string | null
          recipient_id?: string
          resource_id?: string | null
          resource_type?: string | null
          sender_id?: string | null
          title?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_lodge_id_fkey"
            columns: ["lodge_id"]
            isOneToOne: false
            referencedRelation: "lodges"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          created_by: string
          currency: string | null
          id: string
          invoice_url: string | null
          lodge_id: string
          payment_method: string | null
          status: string
          subscription_period_end: string | null
          subscription_period_start: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          created_by: string
          currency?: string | null
          id?: string
          invoice_url?: string | null
          lodge_id: string
          payment_method?: string | null
          status: string
          subscription_period_end?: string | null
          subscription_period_start?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          created_by?: string
          currency?: string | null
          id?: string
          invoice_url?: string | null
          lodge_id?: string
          payment_method?: string | null
          status?: string
          subscription_period_end?: string | null
          subscription_period_start?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_lodge_id_fkey"
            columns: ["lodge_id"]
            isOneToOne: false
            referencedRelation: "lodges"
            referencedColumns: ["id"]
          },
        ]
      }
      planches: {
        Row: {
          author_id: string
          author_name: string | null
          content: string | null
          created_at: string | null
          degree: number | null
          file_url: string | null
          id: string
          lodge_id: string
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id: string
          author_name?: string | null
          content?: string | null
          created_at?: string | null
          degree?: number | null
          file_url?: string | null
          id?: string
          lodge_id: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          author_name?: string | null
          content?: string | null
          created_at?: string | null
          degree?: number | null
          file_url?: string | null
          id?: string
          lodge_id?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "planches_lodge_id_fkey"
            columns: ["lodge_id"]
            isOneToOne: false
            referencedRelation: "lodges"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          birth_date: string | null
          created_at: string | null
          display_name: string | null
          id: string
          initiation_date: string | null
          interests: string | null
          last_login: string | null
          phone_number: string | null
          photo_url: string | null
          profession: string | null
          raising_date: string | null
        }
        Insert: {
          address?: string | null
          birth_date?: string | null
          created_at?: string | null
          display_name?: string | null
          id: string
          initiation_date?: string | null
          interests?: string | null
          last_login?: string | null
          phone_number?: string | null
          photo_url?: string | null
          profession?: string | null
          raising_date?: string | null
        }
        Update: {
          address?: string | null
          birth_date?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string
          initiation_date?: string | null
          interests?: string | null
          last_login?: string | null
          phone_number?: string | null
          photo_url?: string | null
          profession?: string | null
          raising_date?: string | null
        }
        Relationships: []
      }
      tenues: {
        Row: {
          address: string | null
          agenda: Json | null
          created_at: string | null
          created_by: string
          degree: number | null
          description: string | null
          end_time: string | null
          file_url: string | null
          id: string
          location: string | null
          lodge_id: string
          notes: string | null
          officers: Json | null
          planches: Json | null
          tenue_date: string
          theme: string | null
          time: string | null
          title: string
          type: string | null
        }
        Insert: {
          address?: string | null
          agenda?: Json | null
          created_at?: string | null
          created_by: string
          degree?: number | null
          description?: string | null
          end_time?: string | null
          file_url?: string | null
          id?: string
          location?: string | null
          lodge_id: string
          notes?: string | null
          officers?: Json | null
          planches?: Json | null
          tenue_date: string
          theme?: string | null
          time?: string | null
          title: string
          type?: string | null
        }
        Update: {
          address?: string | null
          agenda?: Json | null
          created_at?: string | null
          created_by?: string
          degree?: number | null
          description?: string | null
          end_time?: string | null
          file_url?: string | null
          id?: string
          location?: string | null
          lodge_id?: string
          notes?: string | null
          officers?: Json | null
          planches?: Json | null
          tenue_date?: string
          theme?: string | null
          time?: string | null
          title?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tenues_lodge_id_fkey"
            columns: ["lodge_id"]
            isOneToOne: false
            referencedRelation: "lodges"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      mark_message_as_read: {
        Args: {
          message_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

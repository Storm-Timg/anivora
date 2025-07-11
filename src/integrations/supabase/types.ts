export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      anime: {
        Row: {
          banner_url: string | null
          created_at: string
          description: string | null
          description_arabic: string | null
          duration_minutes: number | null
          episodes_count: number | null
          id: string
          poster_url: string | null
          rating: number | null
          season: string | null
          source: string | null
          status: string | null
          studio: string | null
          title: string
          title_arabic: string
          title_english: string | null
          trailer_url: string | null
          updated_at: string
          year: number | null
        }
        Insert: {
          banner_url?: string | null
          created_at?: string
          description?: string | null
          description_arabic?: string | null
          duration_minutes?: number | null
          episodes_count?: number | null
          id?: string
          poster_url?: string | null
          rating?: number | null
          season?: string | null
          source?: string | null
          status?: string | null
          studio?: string | null
          title: string
          title_arabic: string
          title_english?: string | null
          trailer_url?: string | null
          updated_at?: string
          year?: number | null
        }
        Update: {
          banner_url?: string | null
          created_at?: string
          description?: string | null
          description_arabic?: string | null
          duration_minutes?: number | null
          episodes_count?: number | null
          id?: string
          poster_url?: string | null
          rating?: number | null
          season?: string | null
          source?: string | null
          status?: string | null
          studio?: string | null
          title?: string
          title_arabic?: string
          title_english?: string | null
          trailer_url?: string | null
          updated_at?: string
          year?: number | null
        }
        Relationships: []
      }
      anime_genres: {
        Row: {
          anime_id: string
          genre_id: string
          id: string
        }
        Insert: {
          anime_id: string
          genre_id: string
          id?: string
        }
        Update: {
          anime_id?: string
          genre_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "anime_genres_anime_id_fkey"
            columns: ["anime_id"]
            isOneToOne: false
            referencedRelation: "anime"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "anime_genres_genre_id_fkey"
            columns: ["genre_id"]
            isOneToOne: false
            referencedRelation: "genres"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          anime_id: string | null
          content: string
          created_at: string
          episode_id: string | null
          id: string
          likes_count: number | null
          parent_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          anime_id?: string | null
          content: string
          created_at?: string
          episode_id?: string | null
          id?: string
          likes_count?: number | null
          parent_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          anime_id?: string | null
          content?: string
          created_at?: string
          episode_id?: string | null
          id?: string
          likes_count?: number | null
          parent_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_anime_id_fkey"
            columns: ["anime_id"]
            isOneToOne: false
            referencedRelation: "anime"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_episode_id_fkey"
            columns: ["episode_id"]
            isOneToOne: false
            referencedRelation: "episodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
        ]
      }
      episodes: {
        Row: {
          air_date: string | null
          anime_id: string
          created_at: string
          description: string | null
          description_arabic: string | null
          duration_minutes: number | null
          episode_number: number
          id: string
          thumbnail_url: string | null
          title: string | null
          title_arabic: string | null
          video_url: string | null
        }
        Insert: {
          air_date?: string | null
          anime_id: string
          created_at?: string
          description?: string | null
          description_arabic?: string | null
          duration_minutes?: number | null
          episode_number: number
          id?: string
          thumbnail_url?: string | null
          title?: string | null
          title_arabic?: string | null
          video_url?: string | null
        }
        Update: {
          air_date?: string | null
          anime_id?: string
          created_at?: string
          description?: string | null
          description_arabic?: string | null
          duration_minutes?: number | null
          episode_number?: number
          id?: string
          thumbnail_url?: string | null
          title?: string | null
          title_arabic?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "episodes_anime_id_fkey"
            columns: ["anime_id"]
            isOneToOne: false
            referencedRelation: "anime"
            referencedColumns: ["id"]
          },
        ]
      }
      genres: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          name_arabic: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          name_arabic: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          name_arabic?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
          username?: string
        }
        Relationships: []
      }
      user_favorites: {
        Row: {
          anime_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          anime_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          anime_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_favorites_anime_id_fkey"
            columns: ["anime_id"]
            isOneToOne: false
            referencedRelation: "anime"
            referencedColumns: ["id"]
          },
        ]
      }
      user_ratings: {
        Row: {
          anime_id: string
          created_at: string
          id: string
          rating: number | null
          review: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          anime_id: string
          created_at?: string
          id?: string
          rating?: number | null
          review?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          anime_id?: string
          created_at?: string
          id?: string
          rating?: number | null
          review?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_ratings_anime_id_fkey"
            columns: ["anime_id"]
            isOneToOne: false
            referencedRelation: "anime"
            referencedColumns: ["id"]
          },
        ]
      }
      user_watch_history: {
        Row: {
          anime_id: string
          completed: boolean | null
          created_at: string
          episode_id: string | null
          id: string
          last_watched: string
          user_id: string
          watch_progress: number | null
        }
        Insert: {
          anime_id: string
          completed?: boolean | null
          created_at?: string
          episode_id?: string | null
          id?: string
          last_watched?: string
          user_id: string
          watch_progress?: number | null
        }
        Update: {
          anime_id?: string
          completed?: boolean | null
          created_at?: string
          episode_id?: string | null
          id?: string
          last_watched?: string
          user_id?: string
          watch_progress?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_watch_history_anime_id_fkey"
            columns: ["anime_id"]
            isOneToOne: false
            referencedRelation: "anime"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_watch_history_episode_id_fkey"
            columns: ["episode_id"]
            isOneToOne: false
            referencedRelation: "episodes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

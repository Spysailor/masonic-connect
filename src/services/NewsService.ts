
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";
import { useTranslation } from "react-i18next";
import { i18nWithFallback } from "@/utils/i18n-fallback";

export type News = Tables<"news">;

export const NewsService = {
  async getNews(lodgeId: string): Promise<News[]> {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("lodge_id", lodgeId)
        .order("published_at", { ascending: false });

      if (error) {
        console.error("Error fetching news:", error);
        toast({
          title: i18nWithFallback('actualites.errors.fetchFailed', 'Error fetching news'),
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      return data || [];
    } catch (error: any) {
      console.error("Exception in getNews:", error);
      toast({
        title: i18nWithFallback('actualites.errors.fetchFailed', 'Error fetching news'),
        description: error.message,
        variant: "destructive",
      });
      return [];
    }
  },

  async getNewsById(id: string): Promise<News | null> {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching news item:", error);
        toast({
          title: i18nWithFallback('actualites.errors.itemFetchFailed', 'Error fetching news item'),
          description: error.message,
          variant: "destructive",
        });
        return null;
      }

      return data;
    } catch (error: any) {
      console.error("Exception in getNewsById:", error);
      toast({
        title: i18nWithFallback('actualites.errors.itemFetchFailed', 'Error fetching news item'),
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  },

  async createNews(newsData: Omit<News, "id" | "created_at">): Promise<News | null> {
    try {
      const { data, error } = await supabase
        .from("news")
        .insert([newsData])
        .select()
        .single();

      if (error) {
        console.error("Error creating news:", error);
        toast({
          title: i18nWithFallback('actualites.errors.createFailed', 'Error creating news'),
          description: error.message,
          variant: "destructive",
        });
        return null;
      }

      toast({
        title: i18nWithFallback('actualites.success.created', 'News created successfully'),
      });

      return data;
    } catch (error: any) {
      console.error("Exception in createNews:", error);
      toast({
        title: i18nWithFallback('actualites.errors.createFailed', 'Error creating news'),
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  },

  async updateNews(id: string, newsData: Partial<News>): Promise<News | null> {
    try {
      const { data, error } = await supabase
        .from("news")
        .update(newsData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating news:", error);
        toast({
          title: i18nWithFallback('actualites.errors.updateFailed', 'Error updating news'),
          description: error.message,
          variant: "destructive",
        });
        return null;
      }

      toast({
        title: i18nWithFallback('actualites.success.updated', 'News updated successfully'),
      });

      return data;
    } catch (error: any) {
      console.error("Exception in updateNews:", error);
      toast({
        title: i18nWithFallback('actualites.errors.updateFailed', 'Error updating news'),
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  },

  async deleteNews(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from("news")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting news:", error);
        toast({
          title: i18nWithFallback('actualites.errors.deleteFailed', 'Error deleting news'),
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: i18nWithFallback('actualites.success.deleted', 'News deleted successfully'),
      });

      return true;
    } catch (error: any) {
      console.error("Exception in deleteNews:", error);
      toast({
        title: i18nWithFallback('actualites.errors.deleteFailed', 'Error deleting news'),
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  }
};

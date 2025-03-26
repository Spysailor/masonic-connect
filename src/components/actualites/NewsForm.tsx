
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save } from 'lucide-react';

interface NewsFormProps {
  newsId?: string;
}

const NewsForm: React.FC<NewsFormProps> = ({ newsId }) => {
  const { t } = useTranslation();
  const isEditMode = !!newsId;
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const formSchema = z.object({
    title: z.string().min(1, t('actualites.form.titleRequired')),
    content: z.string().min(1, t('actualites.form.contentRequired')),
    author_name: z.string().optional(),
    image_url: z.string().url(t('actualites.form.invalidUrl')).optional().or(z.literal('')),
  });

  type FormValues = z.infer<typeof formSchema>;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      author_name: '',
      image_url: '',
    },
  });

  useEffect(() => {
    const fetchNewsData = async () => {
      if (!isEditMode) return;
      
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('id', newsId)
          .single();
          
        if (error) throw error;
        
        if (data) {
          form.reset({
            title: data.title || '',
            content: data.content || '',
            author_name: data.author_name || '',
            image_url: data.image_url || '',
          });
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        toast({
          title: t('actualites.errors.error'),
          description: t('actualites.errors.cantLoadNews'),
          variant: "destructive",
        });
      }
    };
    
    fetchNewsData();
  }, [newsId, form, toast, isEditMode, t]);

  const onSubmit = async (values: FormValues) => {
    try {
      if (isEditMode) {
        // Update existing news
        const { error } = await supabase
          .from('news')
          .update({
            title: values.title,
            content: values.content,
            author_name: values.author_name || null,
            image_url: values.image_url || null,
          })
          .eq('id', newsId);
          
        if (error) throw error;
        
        toast({
          title: t('actualites.success'),
          description: t('actualites.newsUpdated'),
        });
      } else {
        // Create new news
        const { error } = await supabase
          .from('news')
          .insert({
            title: values.title,
            content: values.content,
            author_name: values.author_name || null,
            image_url: values.image_url || null,
            published_at: new Date().toISOString(),
            // We need to add these fields for Supabase
            author_id: 'user123', // This should be replaced with the actual user ID
            lodge_id: 'lodge123', // This should be replaced with the actual lodge ID
          });
          
        if (error) throw error;
        
        toast({
          title: t('actualites.success'),
          description: t('actualites.newsCreated'),
        });
      }
      
      // Navigate back to news list
      navigate('/actualites');
    } catch (error) {
      console.error('Error saving news:', error);
      toast({
        title: t('actualites.errors.error'),
        description: t('actualites.errors.cantSaveNews'),
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center mb-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/actualites')}
            className="mr-2"
          >
            <ArrowLeft size={16} />
          </Button>
          <CardTitle>{isEditMode ? t('actualites.editTitle') : t('actualites.createTitle')}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('actualites.form.title')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('actualites.form.titlePlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('actualites.form.content')}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={t('actualites.form.contentPlaceholder')} 
                      className="min-h-[200px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="author_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('actualites.form.author')}</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t('actualites.form.authorPlaceholder')} 
                        {...field} 
                        value={field.value || ''} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('actualites.form.imageUrl')}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t('actualites.form.imageUrlPlaceholder')} 
                      {...field} 
                      value={field.value || ''} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button type="submit" className="bg-masonic-blue-700 hover:bg-masonic-blue-800">
                <Save className="mr-2 h-4 w-4" />
                {isEditMode ? t('actualites.form.update') : t('actualites.form.create')}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NewsForm;

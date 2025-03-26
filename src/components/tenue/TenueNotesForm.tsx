
import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';

interface TenueNotesFormProps {
  form: UseFormReturn<any>;
}

const TenueNotesForm: React.FC<TenueNotesFormProps> = ({ form }) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('tenueForm.details.description')}</FormLabel>
            <FormControl>
              <Textarea 
                placeholder={t('tenueForm.details.descriptionPlaceholder')} 
                className="min-h-[100px]" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('tenueForm.details.notes')}</FormLabel>
            <FormControl>
              <Textarea 
                placeholder={t('tenueForm.details.notesPlaceholder')} 
                className="min-h-[100px]" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TenueNotesForm;

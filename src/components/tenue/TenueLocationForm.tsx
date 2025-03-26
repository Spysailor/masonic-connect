
import React from 'react';
import { MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';

interface TenueLocationFormProps {
  form: UseFormReturn<any>;
}

const TenueLocationForm: React.FC<TenueLocationFormProps> = ({ form }) => {
  const { t } = useTranslation();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="lodge"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('tenueForm.details.lodge')}</FormLabel>
            <FormControl>
              <Input placeholder={t('tenueForm.details.lodgePlaceholder')} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('tenueForm.details.location')}</FormLabel>
            <FormControl>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input className="pl-10" placeholder={t('tenueForm.details.locationPlaceholder')} {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>{t('tenueForm.details.address')}</FormLabel>
            <FormControl>
              <Input placeholder={t('tenueForm.details.addressPlaceholder')} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TenueLocationForm;

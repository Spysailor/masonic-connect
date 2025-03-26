
import React from 'react';
import { useTranslation } from 'react-i18next';
import { UseFormReturn } from 'react-hook-form';
import TenueBasicInfoForm from './TenueBasicInfoForm';
import TenueLocationForm from './TenueLocationForm';
import TenueNotesForm from './TenueNotesForm';

interface TenueDetailsFormProps {
  form: UseFormReturn<any>;
}

const TenueDetailsForm: React.FC<TenueDetailsFormProps> = ({ form }) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-medium mb-4">{t('tenueForm.sections.basicInfo')}</h3>
        <TenueBasicInfoForm form={form} />
      </section>
      
      <section>
        <h3 className="text-lg font-medium mb-4">{t('tenueForm.sections.location')}</h3>
        <TenueLocationForm form={form} />
      </section>
      
      <section>
        <h3 className="text-lg font-medium mb-4">{t('tenueForm.sections.notes')}</h3>
        <TenueNotesForm form={form} />
      </section>
    </div>
  );
};

export default TenueDetailsForm;

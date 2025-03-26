
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

interface TenueFormActionsProps {
  formMode: 'create' | 'edit';
  isLoading: boolean;
  onCancel: () => void;
  onDelete?: () => void;
}

const TenueFormActions: React.FC<TenueFormActionsProps> = ({ 
  formMode, 
  isLoading, 
  onCancel, 
  onDelete 
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-between mt-8">
      <div>
        {formMode === 'edit' && onDelete && (
          <Button
            type="button"
            variant="destructive"
            onClick={onDelete}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {t('tenueForm.cancelMeeting')}
          </Button>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          {t('tenueForm.cancel')}
        </Button>
        
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          {isLoading ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              {t('tenueForm.saving')}
            </>
          ) : (
            formMode === 'create' ? t('tenueForm.create') : t('tenueForm.save')
          )}
        </Button>
      </div>
    </div>
  );
};

export default TenueFormActions;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface TenueCancelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TenueCancelDialog: React.FC<TenueCancelDialogProps> = ({ 
  open, 
  onOpenChange 
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleConfirm = () => {
    onOpenChange(false);
    navigate('/agenda');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('tenueForm.cancelDialog.title')}</DialogTitle>
          <DialogDescription>
            {t('tenueForm.cancelDialog.description')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            {t('tenueForm.cancelDialog.continueEditing')}
          </Button>
          <Button 
            type="button" 
            variant="destructive" 
            onClick={handleConfirm}
          >
            {t('tenueForm.cancelDialog.quitWithoutSaving')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TenueCancelDialog;

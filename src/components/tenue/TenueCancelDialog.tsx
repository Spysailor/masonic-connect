
import React from 'react';
import { useNavigate } from 'react-router-dom';
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

  const handleConfirm = () => {
    onOpenChange(false);
    navigate('/agenda');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Annuler les modifications</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir annuler ? Toutes les modifications non enregistrées seront perdues.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Continuer l'édition
          </Button>
          <Button 
            type="button" 
            variant="destructive" 
            onClick={handleConfirm}
          >
            Quitter sans sauvegarder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TenueCancelDialog;

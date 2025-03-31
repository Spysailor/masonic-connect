
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

interface NewsDeleteDialogProps {
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  handleDeleteNews: () => Promise<void>;
}

const NewsDeleteDialog: React.FC<NewsDeleteDialogProps> = ({
  deleteDialogOpen,
  setDeleteDialogOpen,
  handleDeleteNews
}) => {
  const { t } = useTranslation();

  return (
    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('common.confirm')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('actualites.deleteConfirm.description', 'Cette action ne peut pas être annulée. Cette actualité sera définitivement supprimée.')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteNews} className="bg-red-600 hover:bg-red-700">
            {t('common.delete')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NewsDeleteDialog;

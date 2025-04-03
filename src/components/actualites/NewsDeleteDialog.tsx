
import React from 'react';
import { useTranslation } from 'react-i18next';
import { i18nWithFallback } from '@/utils/i18n-fallback';
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
          <AlertDialogTitle>{i18nWithFallback('common.confirm', 'Confirm')}</AlertDialogTitle>
          <AlertDialogDescription>
            {i18nWithFallback('actualites.deleteConfirm.description', 'This action cannot be undone. This news article will be permanently deleted.')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{i18nWithFallback('common.cancel', 'Cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteNews} className="bg-red-600 hover:bg-red-700">
            {i18nWithFallback('common.delete', 'Delete')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NewsDeleteDialog;

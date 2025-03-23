
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

// Form schema for validation
export const tenueFormSchema = z.object({
  title: z.string().min(3, { message: 'Le titre doit contenir au moins 3 caractères' }),
  date: z.date({ required_error: 'La date est requise' }),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, { message: 'Format heure invalide' }),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, { message: 'Format heure invalide' }),
  location: z.string().min(2, { message: 'Le lieu est requis' }),
  address: z.string().min(5, { message: 'L\'adresse est requise' }),
  lodge: z.string().min(2, { message: 'La loge est requise' }),
  degree: z.string(),
  theme: z.string().optional(),
  type: z.string(),
  description: z.string().optional(),
  notes: z.string().optional(),
});

export type TenueFormValues = z.infer<typeof tenueFormSchema>;

// Mock data for an existing tenue (for edit mode)
export const mockTenue = {
  id: '1',
  title: 'Tenue au 1er degré',
  date: new Date('2023-05-15T19:00:00'),
  startTime: '19:00',
  endTime: '22:00',
  location: 'Temple Les Trois Vertus',
  address: '15 rue de la Paix, 75001 Paris',
  lodge: 'Les Trois Vertus',
  degree: '1',
  theme: 'Travaux symboliques',
  type: 'regular',
  description: 'Tenue régulière avec lecture de planches et travaux rituels.',
  notes: 'Ne pas oublier vos décors. Un agape suivra la tenue.',
  status: 'confirmed' as const,
};

export const useTenueForm = (id?: string) => {
  const formMode = id ? 'edit' : 'create';
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  // Initialize form with default values or existing tenue data
  const form = useForm<TenueFormValues>({
    resolver: zodResolver(tenueFormSchema),
    defaultValues: formMode === 'create' 
      ? {
          title: '',
          date: new Date(),
          startTime: '19:00',
          endTime: '22:00',
          location: '',
          address: '',
          lodge: '',
          degree: '1',
          theme: '',
          type: 'regular',
          description: '',
          notes: '',
        }
      : {
          title: mockTenue.title,
          date: mockTenue.date,
          startTime: mockTenue.startTime,
          endTime: mockTenue.endTime,
          location: mockTenue.location,
          address: mockTenue.address,
          lodge: mockTenue.lodge,
          degree: mockTenue.degree,
          theme: mockTenue.theme,
          type: 'regular',
          description: mockTenue.description,
          notes: mockTenue.notes,
        }
  });

  const onSubmit = async (data: TenueFormValues) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form data submitted:', data);
      
      toast({
        title: formMode === 'create' ? 'Tenue créée avec succès' : 'Tenue mise à jour avec succès',
        description: `${data.title} - ${format(data.date, 'dd/MM/yyyy')}`,
      });
      
      navigate('/agenda');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'enregistrement de la tenue',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (form.formState.isDirty) {
      setCancelDialogOpen(true);
    } else {
      navigate('/agenda');
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Tenue annulée',
        description: 'La tenue a été annulée avec succès',
      });
      
      navigate('/agenda');
    } catch (error) {
      console.error('Error deleting tenue:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'annulation de la tenue',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    formMode,
    isLoading,
    cancelDialogOpen,
    setCancelDialogOpen,
    onSubmit,
    handleCancel,
    handleDelete
  };
};

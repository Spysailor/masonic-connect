
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, MapPin, Users, FileText, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Form schema for validation
const tenueFormSchema = z.object({
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

type TenueFormValues = z.infer<typeof tenueFormSchema>;

// Mock data for an existing tenue (for edit mode)
const mockTenue = {
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
  type: 'Tenue régulière',
  description: 'Tenue régulière avec lecture de planches et travaux rituels.',
  notes: 'Ne pas oublier vos décors. Un agape suivra la tenue.',
  status: 'confirmed' as const,
};

const TenueForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formMode, setFormMode] = useState<'create' | 'edit'>(id ? 'edit' : 'create');
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <Link to="/agenda" className="inline-flex items-center text-masonic-blue-700 hover:text-masonic-blue-900">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Retour à l'agenda</span>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <CardHeader className="bg-gradient-to-r from-masonic-blue-800 to-masonic-blue-900 text-white">
                <CardTitle className="text-2xl">
                  {formMode === 'create' ? 'Créer une nouvelle tenue' : 'Modifier la tenue'}
                </CardTitle>
                <CardDescription className="text-gray-200">
                  Remplissez le formulaire pour {formMode === 'create' ? 'créer' : 'modifier'} une tenue
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-6">
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="mb-6 w-full grid grid-cols-3">
                    <TabsTrigger value="details">Détails</TabsTrigger>
                    <TabsTrigger value="agenda">Programme</TabsTrigger>
                    <TabsTrigger value="participants">Participants</TabsTrigger>
                  </TabsList>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <TabsContent value="details" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Titre de la tenue</FormLabel>
                                <FormControl>
                                  <Input placeholder="Titre de la tenue" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Type de tenue</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Sélectionnez le type de tenue" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="regular">Tenue régulière</SelectItem>
                                    <SelectItem value="initiation">Initiation</SelectItem>
                                    <SelectItem value="elevation">Élévation</SelectItem>
                                    <SelectItem value="installation">Installation</SelectItem>
                                    <SelectItem value="white">Tenue blanche ouverte</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Date</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant="outline"
                                        className={cn(
                                          "w-full pl-3 text-left font-normal flex justify-between items-center",
                                          !field.value && "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "EEEE d MMMM yyyy", { locale: fr })
                                        ) : (
                                          <span>Choisir une date</span>
                                        )}
                                        <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarComponent
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) => date < new Date()}
                                      initialFocus
                                      locale={fr}
                                      className="p-3 pointer-events-auto"
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="startTime"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Heure de début</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                                      <Input className="pl-10" type="time" {...field} />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="endTime"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Heure de fin</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                                      <Input className="pl-10" type="time" {...field} />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="degree"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel>Degré</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-row space-x-4"
                                  >
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="1" />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">1° degré</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="2" />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">2° degré</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="3" />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">3° degré</FormLabel>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="theme"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Thème</FormLabel>
                                <FormControl>
                                  <Input placeholder="Thème de la tenue" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="lodge"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Loge</FormLabel>
                                <FormControl>
                                  <Input placeholder="Nom de la loge" {...field} />
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
                                <FormLabel>Lieu</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                                    <Input className="pl-10" placeholder="Nom du temple" {...field} />
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
                              <FormItem>
                                <FormLabel>Adresse</FormLabel>
                                <FormControl>
                                  <Input placeholder="Adresse complète" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Description détaillée de la tenue" 
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
                              <FormLabel>Notes additionnelles</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Informations complémentaires (tenue vestimentaire, agape, etc.)" 
                                  className="min-h-[100px]" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TabsContent>
                      
                      <TabsContent value="agenda" className="space-y-6">
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <AlertTriangle className="h-5 w-5 text-yellow-400" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-yellow-700">
                                Cette fonctionnalité sera disponible prochainement. Vous pourrez ajouter le programme détaillé de la tenue.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-md p-4">
                          <div className="flex items-center mb-4">
                            <FileText className="mr-2 h-5 w-5 text-gray-500" />
                            <h3 className="font-medium text-gray-700">Programme par défaut</h3>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex">
                              <div className="w-20 flex-shrink-0 text-gray-500 font-medium">
                                19:00
                              </div>
                              <div className="flex-grow">
                                <div className="bg-gray-50 p-3 rounded-lg border-l-2 border-gray-300">
                                  Ouverture des travaux
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex">
                              <div className="w-20 flex-shrink-0 text-gray-500 font-medium">
                                19:30
                              </div>
                              <div className="flex-grow">
                                <div className="bg-gray-50 p-3 rounded-lg border-l-2 border-gray-300">
                                  Lecture et approbation du procès-verbal
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex">
                              <div className="w-20 flex-shrink-0 text-gray-500 font-medium">
                                20:00
                              </div>
                              <div className="flex-grow">
                                <div className="bg-gray-50 p-3 rounded-lg border-l-2 border-gray-300">
                                  Travaux du jour
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex">
                              <div className="w-20 flex-shrink-0 text-gray-500 font-medium">
                                21:30
                              </div>
                              <div className="flex-grow">
                                <div className="bg-gray-50 p-3 rounded-lg border-l-2 border-gray-300">
                                  Circulation du sac des propositions et du tronc de bienfaisance
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex">
                              <div className="w-20 flex-shrink-0 text-gray-500 font-medium">
                                22:00
                              </div>
                              <div className="flex-grow">
                                <div className="bg-gray-50 p-3 rounded-lg border-l-2 border-gray-300">
                                  Clôture des travaux
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="participants" className="space-y-6">
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <AlertTriangle className="h-5 w-5 text-yellow-400" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-yellow-700">
                                Cette fonctionnalité sera disponible prochainement. Vous pourrez inviter des frères et sœurs à votre tenue.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-md p-4">
                          <div className="flex items-center mb-4">
                            <Users className="mr-2 h-5 w-5 text-gray-500" />
                            <h3 className="font-medium text-gray-700">Officiers par défaut</h3>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="text-sm text-gray-500">Vénérable Maître</div>
                              <div className="font-medium text-gray-900">Jean Dupont</div>
                            </div>
                            
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="text-sm text-gray-500">Premier Surveillant</div>
                              <div className="font-medium text-gray-900">Paul Martin</div>
                            </div>
                            
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="text-sm text-gray-500">Deuxième Surveillant</div>
                              <div className="font-medium text-gray-900">Philippe Moreau</div>
                            </div>
                            
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="text-sm text-gray-500">Orateur</div>
                              <div className="font-medium text-gray-900">Pierre Lambert</div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <div className="flex flex-col sm:flex-row gap-3 justify-between mt-8">
                        <div>
                          {formMode === 'edit' && (
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={handleDelete}
                              disabled={isLoading}
                              className="w-full sm:w-auto"
                            >
                              Annuler cette tenue
                            </Button>
                          )}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            disabled={isLoading}
                            className="w-full sm:w-auto"
                          >
                            Annuler
                          </Button>
                          
                          <Button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full sm:w-auto"
                          >
                            {isLoading ? (
                              <>
                                <span className="animate-spin mr-2">⏳</span>
                                Enregistrement...
                              </>
                            ) : (
                              formMode === 'create' ? 'Créer la tenue' : 'Sauvegarder les modifications'
                            )}
                          </Button>
                        </div>
                      </div>
                    </form>
                  </Form>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TenueForm;


import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Form } from '@/components/ui/form';

// Import our refactored components
import TenueFormHeader from '@/components/tenue/TenueFormHeader';
import TenueDetailsForm from '@/components/tenue/TenueDetailsForm';
import TenueAgendaForm from '@/components/tenue/TenueAgendaForm';
import TenueParticipantsForm from '@/components/tenue/TenueParticipantsForm';
import TenueFormActions from '@/components/tenue/TenueFormActions';
import TenueCancelDialog from '@/components/tenue/TenueCancelDialog';
import { useTenueForm } from '@/hooks/useTenueForm';

const TenueForm = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    form, 
    formMode, 
    isLoading, 
    cancelDialogOpen, 
    setCancelDialogOpen, 
    onSubmit, 
    handleCancel, 
    handleDelete 
  } = useTenueForm(id);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <TenueFormHeader formMode={formMode} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card>
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
                        <TenueDetailsForm form={form} />
                      </TabsContent>
                      
                      <TabsContent value="agenda" className="space-y-6">
                        <TenueAgendaForm />
                      </TabsContent>
                      
                      <TabsContent value="participants" className="space-y-6">
                        <TenueParticipantsForm />
                      </TabsContent>
                      
                      <TenueFormActions 
                        formMode={formMode}
                        isLoading={isLoading}
                        onCancel={handleCancel}
                        onDelete={handleDelete}
                      />
                    </form>
                  </Form>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      
      <TenueCancelDialog 
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
      />
      
      <Footer />
    </div>
  );
};

export default TenueForm;

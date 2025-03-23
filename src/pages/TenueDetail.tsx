
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Download, Clock, Users, BookOpen, Edit } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const TenueDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [attendance, setAttendance] = useState<'confirmed' | 'declined' | 'pending'>('pending');
  const [excuse, setExcuse] = useState('');
  
  // Mock data for demonstration - in a real app this would be fetched based on the ID
  const tenue = {
    id: id || '1',
    title: 'Tenue au 1er degré',
    type: 'Tenue régulière',
    date: new Date('2023-05-15T19:00:00'),
    time: '19:00',
    endTime: '22:00',
    location: 'Temple Les Trois Vertus',
    address: '15 rue de la Paix, 75001 Paris',
    lodge: 'Les Trois Vertus',
    degree: 1,
    theme: 'Travaux symboliques',
    description: 'Tenue régulière avec lecture de planches et travaux rituels.',
    notes: 'Ne pas oublier vos décors. Un agape suivra la tenue.',
    officiers: [
      { role: 'Vénérable Maître', name: 'Jean Dupont' },
      { role: 'Premier Surveillant', name: 'Paul Martin' },
      { role: 'Deuxième Surveillant', name: 'Philippe Moreau' },
      { role: 'Orateur', name: 'Pierre Lambert' },
      { role: 'Secrétaire', name: 'Michel Bernard' },
      { role: 'Trésorier', name: 'Jacques Renaud' },
      { role: 'Expert', name: 'André Petit' },
      { role: 'Maître des Cérémonies', name: 'Robert Leroy' },
    ],
    agenda: [
      { time: '19:00', activity: 'Ouverture des travaux' },
      { time: '19:30', activity: 'Lecture et approbation du procès-verbal' },
      { time: '19:45', activity: 'Présentation de la planche "Symbolisme du pavé mosaïque"' },
      { time: '20:30', activity: 'Discussions' },
      { time: '21:30', activity: 'Circulation du sac des propositions et du tronc de bienfaisance' },
      { time: '21:45', activity: 'Clôture des travaux' },
      { time: '22:00', activity: 'Agape fraternelle' },
    ],
    planches: [
      { title: 'Symbolisme du pavé mosaïque', author: 'Jean Dupont', type: 'Planche' },
    ],
    fileURL: '#',
    status: 'confirmed' as const,
  };

  // Function to handle attendance change
  const handleAttendanceChange = (status: 'confirmed' | 'declined' | 'pending') => {
    setAttendance(status);
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
            className="mb-6 flex justify-between items-center"
          >
            <Link to="/agenda" className="inline-flex items-center text-masonic-blue-700 hover:text-masonic-blue-900">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Retour à l'agenda</span>
            </Link>
            
            <Link 
              to={`/agenda/${id}/edit`}
              className="inline-flex items-center text-masonic-blue-700 hover:text-masonic-blue-900"
            >
              <Edit className="h-4 w-4 mr-1" />
              <span>Modifier</span>
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tenue Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-2"
            >
              <Card className="overflow-hidden">
                <div className="bg-masonic-blue-800 text-white p-6">
                  <div className="flex items-center space-x-2 text-masonic-blue-200 text-sm mb-2">
                    <span className={`inline-block w-3 h-3 rounded-full ${
                      tenue.degree === 1 ? 'bg-blue-500' : 
                      tenue.degree === 2 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></span>
                    <span>
                      {tenue.degree === 1 ? '1er degré' : 
                       tenue.degree === 2 ? '2ème degré' : '3ème degré'}
                    </span>
                    <span>•</span>
                    <span>{tenue.type}</span>
                  </div>
                  
                  <h1 className="text-2xl font-bold mb-2">{tenue.title}</h1>
                  
                  <div className="flex flex-wrap gap-4 text-sm mt-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{format(tenue.date, 'EEEE d MMMM yyyy', { locale: fr })}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{tenue.time} - {tenue.endTime}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{tenue.location}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <Tabs defaultValue="informations" className="w-full">
                    <TabsList className="mb-6 w-full">
                      <TabsTrigger value="informations" className="flex-1">Informations</TabsTrigger>
                      <TabsTrigger value="agenda" className="flex-1">Déroulement</TabsTrigger>
                      <TabsTrigger value="officiers" className="flex-1">Officiers</TabsTrigger>
                      <TabsTrigger value="planches" className="flex-1">Planches</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="informations" className="mt-0">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Description</h3>
                          <p className="mt-1 text-gray-800">{tenue.description}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Thème</h3>
                          <p className="mt-1 text-gray-800">{tenue.theme}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Lieu</h3>
                          <p className="mt-1 text-gray-800">{tenue.location}</p>
                          <p className="text-gray-600">{tenue.address}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Loge</h3>
                          <p className="mt-1 text-gray-800">{tenue.lodge}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                          <p className="mt-1 text-gray-800">{tenue.notes}</p>
                        </div>
                        
                        <div className="pt-4">
                          <Button variant="outline" className="flex items-center">
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger la convocation
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="agenda" className="mt-0">
                      <div className="space-y-4">
                        {tenue.agenda.map((item, index) => (
                          <div key={index} className="flex">
                            <div className="w-20 flex-shrink-0 text-gray-500 font-medium">
                              {item.time}
                            </div>
                            <div className="flex-grow">
                              <div className="bg-gray-50 p-3 rounded-lg border-l-2 border-masonic-blue-700">
                                {item.activity}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="officiers" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tenue.officiers.map((officier, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500">{officier.role}</div>
                            <div className="font-medium text-gray-900">{officier.name}</div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="planches" className="mt-0">
                      {tenue.planches.length > 0 ? (
                        <div className="space-y-4">
                          {tenue.planches.map((planche, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium text-gray-900">{planche.title}</h3>
                                  <p className="text-sm text-gray-500 mt-1">
                                    Par {planche.author} • {planche.type}
                                  </p>
                                </div>
                                <Button variant="ghost" size="sm" className="text-masonic-blue-700">
                                  <BookOpen className="h-4 w-4 mr-2" />
                                  Voir
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-gray-500 py-4">
                          Aucune planche prévue pour cette tenue.
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Attendance Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-masonic-blue-900 mb-4">Présence</h2>
                  
                  <div className="space-y-4 mb-6">
                    <button
                      onClick={() => handleAttendanceChange('confirmed')}
                      className={`w-full py-2 px-4 rounded-md text-center ${
                        attendance === 'confirmed'
                          ? 'bg-green-100 text-green-700 border-2 border-green-400'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Je serai présent
                    </button>
                    
                    <button
                      onClick={() => handleAttendanceChange('declined')}
                      className={`w-full py-2 px-4 rounded-md text-center ${
                        attendance === 'declined'
                          ? 'bg-red-100 text-red-700 border-2 border-red-400'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Je serai absent
                    </button>
                  </div>
                  
                  {attendance === 'declined' && (
                    <div className="mb-6">
                      <label htmlFor="excuse" className="block text-sm font-medium text-gray-700 mb-1">
                        Motif d'absence
                      </label>
                      <textarea
                        id="excuse"
                        rows={3}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                        placeholder="Veuillez indiquer le motif de votre absence..."
                        value={excuse}
                        onChange={(e) => setExcuse(e.target.value)}
                      ></textarea>
                    </div>
                  )}
                  
                  <Button className="w-full mb-6">
                    Confirmer ma réponse
                  </Button>
                  
                  <div>
                    <div className="flex items-center mb-4">
                      <Users className="h-5 w-5 text-gray-400 mr-2" />
                      <h3 className="text-md font-medium text-gray-700">Participants</h3>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="text-sm font-medium">Présents confirmés</div>
                        <div className="text-sm text-gray-500">12</div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm font-medium">Absents excusés</div>
                        <div className="text-sm text-gray-500">4</div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm font-medium">En attente de réponse</div>
                        <div className="text-sm text-gray-500">8</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <Button variant="outline" className="w-full">
                        Voir la liste des participants
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TenueDetail;

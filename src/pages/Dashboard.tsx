
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TenueCard from '@/components/dashboard/TenueCard';
import MemberCard from '@/components/dashboard/MemberCard';
import NewsCard from '@/components/dashboard/NewsCard';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('agenda');
  
  // Mock data for demonstration
  const upcomingTenues = [
    {
      id: '1',
      title: 'Tenue au 1er degré',
      date: new Date('2023-05-15T19:00:00'),
      location: 'Temple Les Trois Vertus',
      degree: 1,
      status: 'confirmed',
    },
    {
      id: '2',
      title: 'Tenue au 3ème degré - Élévation',
      date: new Date('2023-05-22T19:00:00'),
      location: 'Temple La Sagesse',
      degree: 3,
      status: 'pending',
    },
    {
      id: '3',
      title: 'Tenue au 2ème degré - Passage',
      date: new Date('2023-05-29T19:00:00'),
      location: 'Temple Les Trois Vertus',
      degree: 2,
      status: 'pending',
    },
  ];
  
  const members = [
    {
      id: '1',
      name: 'Jean Dupont',
      role: 'Vénérable Maître',
      lodge: 'Les Trois Vertus',
      avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: '2',
      name: 'Paul Martin',
      role: 'Premier Surveillant',
      lodge: 'Les Trois Vertus',
      avatarUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
    },
    {
      id: '3',
      name: 'Philippe Moreau',
      role: 'Deuxième Surveillant',
      lodge: 'Les Trois Vertus',
      avatarUrl: 'https://randomuser.me/api/portraits/men/55.jpg',
    },
    {
      id: '4',
      name: 'Pierre Lambert',
      role: 'Orateur',
      lodge: 'Les Trois Vertus',
      avatarUrl: 'https://randomuser.me/api/portraits/men/64.jpg',
    },
  ];
  
  const news = [
    {
      id: '1',
      title: 'Élection du nouveau Vénérable',
      content: "Les élections pour le nouveau collège d'officiers se tiendront lors de la prochaine tenue...",
      date: new Date('2023-05-01'),
      author: 'Jean Dupont',
      imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      id: '2',
      title: 'Rencontre inter-obédientielle',
      content: 'Une rencontre entre plusieurs obédiences aura lieu le mois prochain. Inscrivez-vous...',
      date: new Date('2023-04-28'),
      author: 'Paul Martin',
      imageUrl: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80',
    },
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-masonic-blue-900">Tableau de bord</h1>
            <p className="text-gray-600 mt-1">Bienvenue sur votre espace personnel MasonConnect</p>
          </motion.div>
          
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          >
            <div className="bg-white rounded-xl shadow-sm p-6 flex items-center">
              <div className="w-12 h-12 rounded-full bg-masonic-blue-100 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-masonic-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Prochaine tenue</p>
                <p className="text-lg font-semibold text-masonic-blue-900">15 mai 2023</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 flex items-center">
              <div className="w-12 h-12 rounded-full bg-masonic-blue-100 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-masonic-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Frères</p>
                <p className="text-lg font-semibold text-masonic-blue-900">24 membres</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 flex items-center">
              <div className="w-12 h-12 rounded-full bg-masonic-blue-100 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-masonic-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Planches</p>
                <p className="text-lg font-semibold text-masonic-blue-900">12 documents</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 flex items-center">
              <div className="w-12 h-12 rounded-full bg-masonic-blue-100 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-masonic-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Messages</p>
                <p className="text-lg font-semibold text-masonic-blue-900">3 non lus</p>
              </div>
            </div>
          </motion.div>
          
          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-6"
          >
            <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
              <button
                className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'agenda' ? 'bg-masonic-blue-700 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('agenda')}
              >
                Agenda
              </button>
              <button
                className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'freres' ? 'bg-masonic-blue-700 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('freres')}
              >
                Frères
              </button>
              <button
                className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'actualites' ? 'bg-masonic-blue-700 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('actualites')}
              >
                Actualités
              </button>
            </div>
          </motion.div>
          
          {/* Tab Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mb-8"
          >
            {activeTab === 'agenda' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-masonic-blue-900">Prochaines tenues</h2>
                  <a href="/agenda" className="text-sm text-masonic-blue-700 font-medium hover:text-masonic-blue-600">
                    Voir tout →
                  </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {upcomingTenues.map((tenue) => (
                    <TenueCard key={tenue.id} tenue={tenue} />
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'freres' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-masonic-blue-900">Officiers de loge</h2>
                  <a href="/freres" className="text-sm text-masonic-blue-700 font-medium hover:text-masonic-blue-600">
                    Voir tout →
                  </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {members.map((member) => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'actualites' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-masonic-blue-900">Dernières actualités</h2>
                  <a href="/actualites" className="text-sm text-masonic-blue-700 font-medium hover:text-masonic-blue-600">
                    Voir tout →
                  </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {news.map((item) => (
                    <NewsCard key={item.id} news={item} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
          
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <h2 className="text-xl font-bold text-masonic-blue-900 mb-4">Actions rapides</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a href="/agenda/create" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-masonic-blue-100 flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-masonic-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">Créer une tenue</span>
              </a>
              
              <a href="/planches/create" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-masonic-blue-100 flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-masonic-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">Rédiger une planche</span>
              </a>
              
              <a href="/messages/new" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-masonic-blue-100 flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-masonic-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">Nouveau message</span>
              </a>
              
              <a href="/qrcode" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-masonic-blue-100 flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-masonic-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">Générer QR Code</span>
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;

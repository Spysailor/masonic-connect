
/**
 * Utility for initializing test data in Supabase
 * This utility can be imported and called in development to set up test data
 */

import { supabase } from '@/integrations/supabase/client';

// Sample lodge data
const lodgeData = {
  name: 'Universalys',
  description: "Loge maçonnique sous l'égide de la Grande Loge de l'Île Maurice",
  rite: 'Rite Écossais Ancien et Accepté',
  obedience: 'Grande Loge de l\'Île Maurice',
  is_active: true,
  subscription_level: 'premium',
  subscription_expiry: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
  primary_color: '#1e40af',
  secondary_color: '#3b82f6',
};

// Sample user profiles
const profiles = [
  {
    id: '', // Will be filled with auth user ID
    display_name: 'Paul Emmanuel',
    profession: 'Architecte',
    phone_number: '+230 5123 4567',
    photo_url: 'https://randomuser.me/api/portraits/men/41.jpg',
    initiation_date: '2010-05-15',
    raising_date: '2012-06-20',
  },
  {
    id: '', // Placeholder for another user
    display_name: 'Jean Dupont',
    profession: 'Médecin',
    phone_number: '+230 5234 5678',
    photo_url: 'https://randomuser.me/api/portraits/men/32.jpg',
    initiation_date: '2012-03-10',
    raising_date: '2014-04-15',
  },
  {
    id: '', // Placeholder for another user
    display_name: 'Philippe Moreau',
    profession: 'Avocat',
    phone_number: '+230 5345 6789',
    photo_url: 'https://randomuser.me/api/portraits/men/55.jpg',
    initiation_date: '2013-09-22',
    raising_date: '2015-10-18',
  },
  {
    id: '', // Placeholder for another user
    display_name: 'Pierre Lambert',
    profession: 'Enseignant',
    phone_number: '+230 5456 7890',
    photo_url: 'https://randomuser.me/api/portraits/men/64.jpg',
    initiation_date: '2014-06-30',
    raising_date: '2016-07-25',
  },
  {
    id: '', // Placeholder for another user
    display_name: 'Michel Bernard',
    profession: 'Ingénieur',
    phone_number: '+230 5567 8901',
    photo_url: 'https://randomuser.me/api/portraits/men/22.jpg',
    initiation_date: '2015-04-12',
    raising_date: '2017-05-18',
  },
  {
    id: '', // Placeholder for another user
    display_name: 'Jacques Renaud',
    profession: 'Comptable',
    phone_number: '+230 5678 9012',
    photo_url: 'https://randomuser.me/api/portraits/men/36.jpg',
    initiation_date: '2016-02-08',
    raising_date: '2018-03-15',
  },
  {
    id: '', // Placeholder for another user
    display_name: 'André Petit',
    profession: 'Artisan',
    phone_number: '+230 5789 0123',
    photo_url: 'https://randomuser.me/api/portraits/men/48.jpg',
    initiation_date: '2017-11-20',
  },
  {
    id: '', // Placeholder for another user
    display_name: 'Robert Leroy',
    profession: 'Entrepreneur',
    phone_number: '+230 5890 1234',
    photo_url: 'https://randomuser.me/api/portraits/men/53.jpg',
    initiation_date: '2018-08-05',
  },
];

// Sample lodge officers
const officers = [
  { title: 'Vénérable Maître', member_index: 0 },
  { title: 'Premier Surveillant', member_index: 1 },
  { title: 'Deuxième Surveillant', member_index: 2 },
  { title: 'Orateur', member_index: 3 },
  { title: 'Secrétaire', member_index: 4 },
  { title: 'Trésorier', member_index: 5 },
  { title: 'Expert', member_index: 6 },
  { title: 'Maître des Cérémonies', member_index: 7 },
];

// Sample tenue (meeting) data
const tenues = [
  {
    title: 'Tenue au 1er degré',
    tenue_date: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split('T')[0],
    time: '19:00',
    end_time: '22:00',
    location: 'Temple Les Trois Vertus',
    address: '25 Rue de la Fraternité, Pereybere, Île Maurice',
    degree: 1,
    description: 'Tenue régulière avec lecture de planches et travaux rituels.',
    type: 'regular',
  },
  {
    title: 'Tenue au 3ème degré - Élévation',
    tenue_date: new Date(new Date().setDate(new Date().getDate() + 22)).toISOString().split('T')[0],
    time: '19:00',
    end_time: '22:00',
    location: 'Temple La Sagesse',
    address: '10 Avenue de la Lumière, Grand Baie, Île Maurice',
    degree: 3,
    description: 'Élévation du Frère André Petit à la maîtrise.',
    type: 'elevation',
  },
  {
    title: 'Tenue au 2ème degré - Passage',
    tenue_date: new Date(new Date().setDate(new Date().getDate() + 29)).toISOString().split('T')[0],
    time: '19:00',
    end_time: '22:00',
    location: 'Temple Les Trois Vertus',
    address: '25 Rue de la Fraternité, Pereybere, Île Maurice',
    degree: 2,
    description: 'Passage du Frère Robert Leroy au grade de compagnon.',
    type: 'passage',
  },
];

// Sample documents and planches
const documents = [
  {
    title: 'Symbolisme du pavé mosaïque',
    description: 'Étude approfondie du symbolisme du pavé mosaïque dans les loges maçonniques françaises et britanniques.',
    category: 'symbolisme',
    file_type: 'pdf',
    degree: 1,
  },
  {
    title: 'Les voyages initiatiques',
    description: 'Analyse des voyages initiatiques et leur signification dans le rite écossais ancien et accepté.',
    category: 'rituel',
    file_type: 'pdf',
    degree: 1,
  },
  {
    title: 'L\'éthique maçonnique face au monde moderne',
    description: 'Réflexion sur les valeurs maçonniques et leur application dans la société contemporaine.',
    category: 'philosophie',
    file_type: 'pdf',
    degree: 2,
  },
  {
    title: 'Le secret maçonnique : nature et fonction',
    description: 'Analyse de la notion de secret en franc-maçonnerie et son importance initiatique.',
    category: 'tradition',
    file_type: 'pdf',
    degree: 2,
  },
  {
    title: 'Le cabinet de réflexion : origines et symbolisme',
    description: 'Étude historique et symbolique du cabinet de réflexion dans la tradition maçonnique.',
    category: 'symbolisme',
    file_type: 'pdf',
    degree: 3,
  },
];

// Sample news
const news = [
  {
    title: 'Élection du nouveau Vénérable',
    content: "Les élections pour le nouveau collège d'officiers se tiendront lors de la prochaine tenue du 15 juin. Tous les frères sont invités à y participer.",
    published_at: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
  },
  {
    title: 'Rencontre inter-obédientielle',
    content: 'Une rencontre entre plusieurs obédiences aura lieu le mois prochain. Inscrivez-vous auprès du secrétaire avant le 30 mai.',
    published_at: new Date(new Date().setDate(new Date().getDate() - 12)).toISOString(),
  },
];

/**
 * Initialize the Supabase database with sample data
 * This function should be called only in development
 */
export const initSupabaseData = async (userId: string) => {
  console.log('Initializing Supabase data...');
  
  try {
    // 1. Create the lodge
    const { data: lodgeResult, error: lodgeError } = await supabase
      .from('lodges')
      .insert([lodgeData])
      .select('id')
      .single();
    
    if (lodgeError) throw lodgeError;
    console.log('Created lodge:', lodgeResult.id);
    
    const lodgeId = lodgeResult.id;
    
    // 2. Create profiles for the main user
    profiles[0].id = userId;
    
    // Create the profiles
    const { error: profilesError } = await supabase
      .from('profiles')
      .upsert(profiles.map(p => ({
        ...p,
        id: p.id || crypto.randomUUID()
      })));
    
    if (profilesError) throw profilesError;
    console.log('Created profiles');
    
    // 3. Create lodge memberships and officers
    const memberships = [];
    
    for (let i = 0; i < profiles.length; i++) {
      const officer = officers.find(o => o.member_index === i);
      
      memberships.push({
        user_id: profiles[i].id || crypto.randomUUID(),
        lodge_id: lodgeId,
        is_active: true,
        degree: i < 6 ? 3 : i === 6 ? 2 : 1, // First 6 are masters, then companions, then apprentices
        role: i === 0 ? 'admin' : 'member',
        office: officer ? officer.title : null,
        joined_at: new Date(new Date().setFullYear(new Date().getFullYear() - (Math.floor(Math.random() * 5) + 1))).toISOString()
      });
    }
    
    const { error: membershipsError } = await supabase
      .from('lodge_memberships')
      .insert(memberships);
    
    if (membershipsError) throw membershipsError;
    console.log('Created lodge memberships');
    
    // 4. Create tenues (meetings)
    const tenuesWithLodgeId = tenues.map(t => ({
      ...t,
      lodge_id: lodgeId,
      created_by: userId
    }));
    
    const { error: tenuesError } = await supabase
      .from('tenues')
      .insert(tenuesWithLodgeId);
    
    if (tenuesError) throw tenuesError;
    console.log('Created tenues');
    
    // 5. Create documents
    const docsWithLodgeId = documents.map(d => ({
      ...d,
      lodge_id: lodgeId,
      created_by: userId,
      created_at: new Date().toISOString(),
      author_name: profiles[Math.floor(Math.random() * profiles.length)].display_name,
    }));
    
    const { error: docsError } = await supabase
      .from('documents')
      .insert(docsWithLodgeId);
    
    if (docsError) throw docsError;
    console.log('Created documents');
    
    // 6. Create news
    const newsWithLodgeId = news.map(n => ({
      ...n,
      lodge_id: lodgeId,
      author_id: userId,
      author_name: profiles[0].display_name,
      created_at: new Date().toISOString()
    }));
    
    const { error: newsError } = await supabase
      .from('news')
      .insert(newsWithLodgeId);
    
    if (newsError) throw newsError;
    console.log('Created news');
    
    return true;
  } catch (error) {
    console.error('Error initializing data:', error);
    return false;
  }
};

/**
 * Check if the database has been initialized for the user
 */
export const checkDatabaseInitialized = async (userId: string): Promise<boolean> => {
  // Check if the user has any lodge memberships
  const { data, error } = await supabase
    .from('lodge_memberships')
    .select('id')
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error checking initialization:', error);
    return false;
  }
  
  return data && data.length > 0;
};

/**
 * Initialize database if needed
 */
export const initDatabaseIfNeeded = async (userId: string) => {
  const isInitialized = await checkDatabaseInitialized(userId);
  
  if (!isInitialized) {
    console.log('Database not initialized, initializing now...');
    return await initSupabaseData(userId);
  }
  
  console.log('Database already initialized');
  return true;
};


import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Download, User, Calendar, Building } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const PlancheDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock data for demonstration - in a real app this would be fetched based on the ID
  const planche = {
    id: id || '1',
    title: 'Symbolisme du pavé mosaïque',
    content: `
      <p class="mb-4">Le pavé mosaïque est l'un des symboles les plus visibles dans les loges maçonniques. Ce sol formé de carreaux alternativement noirs et blancs est présent dans toutes les loges, quel que soit le rite pratiqué.</p>
      
      <h3 class="text-xl font-bold mb-3">Origine et description</h3>
      
      <p class="mb-4">Le pavé mosaïque, également appelé "tableau de la loge", est directement inspiré du sol du Temple de Salomon. Il est constitué de carreaux alternés blancs et noirs, disposés à la manière d'un damier. Dans les temples maçonniques, il occupe généralement la partie centrale de la loge.</p>
      
      <p class="mb-4">La disposition des carreaux peut varier selon les rites et les obédiences, mais la symbolique reste similaire. Le nombre de carreaux n'est pas fixe et peut avoir sa propre signification symbolique.</p>
      
      <h3 class="text-xl font-bold mb-3">Symbolisme du pavé mosaïque</h3>
      
      <p class="mb-4">Le pavé mosaïque représente la dualité fondamentale de l'existence humaine. Les carreaux blancs et noirs symbolisent les opposés qui régissent notre univers et notre vie :</p>
      
      <ul class="list-disc pl-6 mb-4">
        <li>Le bien et le mal</li>
        <li>La lumière et les ténèbres</li>
        <li>La vie et la mort</li>
        <li>L'esprit et la matière</li>
        <li>Le jour et la nuit</li>
        <li>Le positif et le négatif</li>
      </ul>
      
      <p class="mb-4">Cette dualité nous rappelle que notre existence est faite de contrastes et de complémentarités. Le franc-maçon, dans sa quête de connaissance, apprend à naviguer entre ces opposés pour trouver l'équilibre et l'harmonie.</p>
      
      <h3 class="text-xl font-bold mb-3">Interprétations maçonniques</h3>
      
      <p class="mb-4">En franc-maçonnerie, le pavé mosaïque est interprété de plusieurs façons :</p>
      
      <p class="mb-4"><strong>1. Le chemin initiatique :</strong> Le pavé représente le chemin de l'initié, alternant entre épreuves (carreaux noirs) et réussites (carreaux blancs).</p>
      
      <p class="mb-4"><strong>2. L'unité des contraires :</strong> Il symbolise l'union des contraires, rappelant que les opposés ne s'excluent pas mais se complètent.</p>
      
      <p class="mb-4"><strong>3. Terrain commun :</strong> C'est sur ce pavé que tous les frères se rencontrent, quelles que soient leurs différences, illustrant l'universalité de la fraternité maçonnique.</p>
      
      <h3 class="text-xl font-bold mb-3">Conclusion</h3>
      
      <p class="mb-4">Le pavé mosaïque est un symbole riche qui rappelle au maçon que son parcours n'est pas linéaire et que la dualité fait partie intégrante de notre existence. Il nous enseigne à rechercher l'équilibre entre les opposés et à comprendre que la lumière n'existe pas sans l'obscurité.</p>
      
      <p>En marchant sur ce pavé lors des cérémonies, le franc-maçon est invité à méditer sur sa propre dualité intérieure et à travailler à l'harmonisation des forces contradictoires qui l'habitent, dans sa quête permanente de perfection.</p>
    `,
    degree: 1,
    author: 'Jean Dupont',
    authorName: 'Jean Dupont',
    authorRole: 'Vénérable Maître',
    lodge: 'Les Trois Vertus',
    tags: ['Symbolisme', 'Temple', 'Art Royal'],
    fileURL: '#',
    createdAt: new Date('2023-03-15'),
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
            <Link to="/planches" className="inline-flex items-center text-masonic-blue-700 hover:text-masonic-blue-900">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Retour aux planches</span>
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Planche Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-3"
            >
              <Card className="overflow-hidden">
                <div className="bg-masonic-blue-800 text-white p-6">
                  <div className="flex items-center space-x-2 text-masonic-blue-200 text-sm mb-2">
                    <FileText className="h-4 w-4" />
                    <span>Planche</span>
                    <span>•</span>
                    <span>
                      {planche.degree === 1 ? '1er degré' : 
                       planche.degree === 2 ? '2ème degré' : '3ème degré'}
                    </span>
                  </div>
                  
                  <h1 className="text-2xl font-bold">{planche.title}</h1>
                </div>
                
                <CardContent className="p-6">
                  <div className="prose prose-masonic max-w-none" dangerouslySetInnerHTML={{ __html: planche.content }}></div>
                  
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2">
                      {planche.tags.map((tag, index) => (
                        <span key={index} className="bg-masonic-blue-100 text-masonic-blue-800 text-xs px-2.5 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Author Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-masonic-blue-900 mb-4">Auteur</h2>
                  
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                      <img 
                        src={`https://randomuser.me/api/portraits/men/${parseInt(planche.id) + 30}.jpg`} 
                        alt={planche.authorName} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div>
                      <div className="font-medium text-masonic-blue-900">{planche.authorName}</div>
                      <div className="text-sm text-gray-500">{planche.authorRole}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 text-gray-400 mr-3" />
                      <span className="text-gray-700">{planche.lodge}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                      <span className="text-gray-700">{format(planche.createdAt, 'd MMMM yyyy', { locale: fr })}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Link to={`/freres/${planche.author}`}>
                      <Button variant="outline" className="w-full">
                        <User className="h-4 w-4 mr-2" />
                        Voir le profil
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-masonic-blue-900 mb-4">Actions</h2>
                  
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full flex items-center justify-center">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger (PDF)
                    </Button>
                    
                    <Button variant="outline" className="w-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Partager
                    </Button>
                    
                    <Button variant="outline" className="w-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                      Sauvegarder
                    </Button>
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

export default PlancheDetail;

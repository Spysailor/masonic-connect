
import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, MessageCircle, FileText, Book, BookOpen, Calendar, User, Tag } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const BibliothequeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock data - this would normally come from an API
  const resource = {
    id: id || '1',
    title: 'Les Symboles Maçonniques',
    description: 'Une exploration détaillée des symboles fondamentaux de la Franc-Maçonnerie et leur signification ésotérique à travers les âges.',
    content: `
      <p class="mb-4">La symbolique maçonnique est l'un des aspects les plus fascinants et essentiels de la Franc-Maçonnerie. Les symboles servent de langage universel pour transmettre des vérités profondes et des enseignements moraux.</p>
      
      <h3 class="text-xl font-semibold mb-3 mt-6">L'Équerre et le Compas</h3>
      <p class="mb-4">Probablement le symbole le plus reconnaissable de la Franc-Maçonnerie, l'équerre et le compas représentent l'union des principes matériels et spirituels. L'équerre nous enseigne à équarrir nos actions, tandis que le compas nous invite à circonscrire nos désirs et à garder nos passions dans de justes limites.</p>
      
      <h3 class="text-xl font-semibold mb-3 mt-6">La Lettre G</h3>
      <p class="mb-4">Souvent placée au centre de l'équerre et du compas, la lettre G peut représenter plusieurs concepts : Géométrie, Gnose, ou le Grand Architecte de l'Univers. Elle nous rappelle l'importance de la science et de la connaissance dans notre quête de vérité.</p>
      
      <h3 class="text-xl font-semibold mb-3 mt-6">Les Trois Piliers</h3>
      <p class="mb-4">Les trois piliers de la Sagesse, de la Force et de la Beauté soutiennent symboliquement le Temple. La Sagesse pour concevoir, la Force pour soutenir, et la Beauté pour orner. Ces piliers rappellent également les trois Lumières de la Loge : le Vénérable Maître et les deux Surveillants.</p>
      
      <h3 class="text-xl font-semibold mb-3 mt-6">Le Pavé Mosaïque</h3>
      <p class="mb-4">Le sol du Temple, composé de carreaux noirs et blancs alternés, symbolise la dualité inhérente à l'existence humaine : le bien et le mal, la lumière et l'obscurité, la vie et la mort. Il nous enseigne que ces opposés sont complémentaires et nécessaires à l'harmonie universelle.</p>
    `,
    author: 'Jean Dupont',
    authorRole: 'Vénérable Maître',
    date: new Date('2023-01-15'),
    type: 'book',
    category: 'Symbolisme',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    downloadUrl: '#',
    relatedResources: [
      {
        id: '2',
        title: 'Histoire de la Franc-Maçonnerie au XVIIIe siècle',
        type: 'book',
        category: 'Histoire'
      },
      {
        id: '4',
        title: 'L\'Art Royal et la Géométrie Sacrée',
        type: 'article',
        category: 'Philosophie'
      }
    ]
  };

  const renderTypeIcon = (type: string) => {
    switch (type) {
      case 'book':
        return <Book className="h-5 w-5" />;
      case 'document':
        return <FileText className="h-5 w-5" />;
      case 'article':
        return <MessageCircle className="h-5 w-5" />;
      default:
        return <Book className="h-5 w-5" />;
    }
  };

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
            <Button 
              variant="ghost" 
              className="mb-4 text-gray-600 hover:text-masonic-blue-700" 
              onClick={() => navigate('/bibliotheque')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Retour à la bibliothèque
            </Button>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {resource.imageUrl && (
                <div className="w-full h-64 md:h-80 relative">
                  <img 
                    src={resource.imageUrl} 
                    alt={resource.title} 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <div className="flex items-center mb-2">
                      <span className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium mr-2 bg-black/30 backdrop-blur-sm",
                      )}>
                        <span className="mr-1">{renderTypeIcon(resource.type)}</span>
                        {resource.type === 'book' && 'Livre'}
                        {resource.type === 'document' && 'Document'}
                        {resource.type === 'article' && 'Article'}
                      </span>
                      
                      <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-black/30 backdrop-blur-sm">
                        {resource.category}
                      </span>
                    </div>
                    <h1 className="text-3xl font-bold text-white">{resource.title}</h1>
                  </div>
                </div>
              )}
              
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <img 
                        src={`https://randomuser.me/api/portraits/men/${parseInt(resource.id) + 25}.jpg`}
                        alt={resource.author} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-gray-900 font-medium">{resource.author}</div>
                      <div className="text-gray-500 text-sm">{resource.authorRole}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center md:ml-auto space-x-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {format(resource.date, 'dd MMMM yyyy', { locale: fr })}
                    </div>
                    
                    {resource.downloadUrl && (
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Download className="mr-1 h-4 w-4" />
                        Télécharger
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">{resource.description}</p>
                  
                  <div 
                    className="mt-8 text-gray-800"
                    dangerouslySetInnerHTML={{ __html: resource.content }}
                  />
                </div>
                
                {resource.relatedResources && resource.relatedResources.length > 0 && (
                  <div className="mt-12 pt-6 border-t border-gray-200">
                    <h3 className="text-xl font-semibold mb-4">Ressources liées</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {resource.relatedResources.map(related => (
                        <Link 
                          key={related.id}
                          to={`/bibliotheque/${related.id}`}
                          className="group p-4 border border-gray-200 rounded-lg hover:border-masonic-blue-300 hover:bg-masonic-blue-50/30 transition-colors"
                        >
                          <div className="flex items-center">
                            <div className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center text-white mr-3",
                              related.type === 'book' && "bg-blue-600",
                              related.type === 'document' && "bg-green-600",
                              related.type === 'article' && "bg-purple-600",
                            )}>
                              {renderTypeIcon(related.type)}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 group-hover:text-masonic-blue-700 transition-colors">{related.title}</h4>
                              <span className="text-xs text-gray-500">{related.category}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BibliothequeDetail;

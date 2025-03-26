
import React from 'react';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { Calendar, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface NewsListProps {
  loading: boolean;
  filteredActualites: any[];
  handleEditNews: (id: string) => void;
  handleOpenDeleteDialog: (id: string) => void;
}

const NewsList: React.FC<NewsListProps> = ({ 
  loading, 
  filteredActualites, 
  handleEditNews, 
  handleOpenDeleteDialog 
}) => {
  const { t, i18n } = useTranslation();
  const dateLocale = i18n.language === 'fr' ? fr : enUS;

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-masonic-blue-700"></div>
      </div>
    );
  }

  if (filteredActualites.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">{t('actualites.noResults')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {filteredActualites.map((actualite) => (
        <article key={actualite.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <img 
                  src={actualite.image_url || `https://source.unsplash.com/random/800x600?sig=${actualite.id}`} 
                  alt={actualite.title} 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="flex items-center mb-2">
                {actualite.category && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-masonic-blue-100 text-masonic-blue-800">
                    {actualite.category}
                  </span>
                )}
                <span className="text-gray-500 text-sm ml-2 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {actualite.published_at ? format(new Date(actualite.published_at), 'dd MMMM yyyy', { locale: dateLocale }) : ''}
                </span>
              </div>
              
              <h2 className="text-xl font-bold text-masonic-blue-900 mb-2">
                <Link to={`/actualites/${actualite.id}`} className="hover:text-masonic-blue-700">
                  {actualite.title}
                </Link>
              </h2>
              
              <p className="text-gray-600 mb-4 line-clamp-3">{actualite.content}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                    <img 
                      src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`}
                      alt={actualite.author_name || t('actualites.author')} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">{actualite.author_name || t('actualites.administrator')}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditNews(actualite.id)}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="h-3.5 w-3.5 mr-1" />
                    {t('actualites.edit')}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenDeleteDialog(actualite.id)}
                    className="flex items-center text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                    {t('actualites.delete')}
                  </Button>
                  <Link
                    to={`/actualites/${actualite.id}`}
                    className="text-sm font-medium text-masonic-blue-700 hover:text-masonic-blue-800 ml-2"
                  >
                    {t('actualites.readMore')} →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default NewsList;

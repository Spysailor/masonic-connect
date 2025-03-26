
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '@/utils/formatters';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export interface NewsProps {
  news: {
    id: string;
    title: string;
    content: string;
    date: Date;
    author: string;
    imageUrl: string;
  };
}

const NewsCard: React.FC<NewsProps> = ({ news }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
      <div className="aspect-video overflow-hidden">
        <img 
          src={news.imageUrl} 
          alt={news.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      <CardHeader className="px-5 py-4 pb-1">
        <h3 className="font-semibold text-lg text-masonic-blue-900">{news.title}</h3>
      </CardHeader>
      
      <CardContent className="px-5 py-2 flex-1">
        <div className="flex items-center my-2 text-sm text-gray-500">
          <span>{formatDate(news.date)}</span>
          <span className="mx-2">•</span>
          <span>{news.author}</span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-3">
          {news.content}
        </p>
      </CardContent>
      
      <CardFooter className="px-5 py-3 border-t border-gray-100">
        <Link 
          to={`/actualites/${news.id}`}
          className="text-masonic-blue-700 font-medium text-sm flex items-center"
        >
          Lire la suite
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;

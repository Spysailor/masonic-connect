
export interface Tenue {
  id: string;
  title: string;
  date: Date;
  endTime: string;
  location: string;
  address: string;
  lodge: string;
  degree: number;
  theme: string;
  description: string;
  status: 'confirmed' | 'pending';
}

export const getTenues = (): Tenue[] => {
  return [
    {
      id: '1',
      title: 'Tenue au 1er degré',
      date: new Date('2023-05-15T19:00:00'),
      endTime: '22:00',
      location: 'Temple Les Trois Vertus',
      address: '15 rue de la Paix, 75001 Paris',
      lodge: 'Les Trois Vertus',
      degree: 1,
      theme: 'Travaux symboliques',
      description: 'Tenue régulière avec lecture de planches et travaux rituels.',
      status: 'confirmed',
    },
    {
      id: '2',
      title: 'Tenue au 3ème degré - Élévation',
      date: new Date('2023-05-22T19:00:00'),
      endTime: '22:30',
      location: 'Temple La Sagesse',
      address: '8 avenue des Champs-Élysées, 75008 Paris',
      lodge: 'La Sagesse',
      degree: 3,
      theme: 'Élévation au grade de Maître',
      description: 'Cérémonie d\'élévation au grade de Maître.',
      status: 'pending',
    },
    {
      id: '3',
      title: 'Tenue au 2ème degré - Passage',
      date: new Date('2023-05-29T19:00:00'),
      endTime: '22:00',
      location: 'Temple Les Trois Vertus',
      address: '15 rue de la Paix, 75001 Paris',
      lodge: 'Les Trois Vertus',
      degree: 2,
      theme: 'Passage au grade de Compagnon',
      description: 'Cérémonie de passage au grade de Compagnon.',
      status: 'pending',
    },
    {
      id: '4',
      title: 'Tenue Blanche Ouverte',
      date: new Date('2023-06-05T19:00:00'),
      endTime: '22:00',
      location: 'Temple Les Trois Vertus',
      address: '15 rue de la Paix, 75001 Paris',
      lodge: 'Les Trois Vertus',
      degree: 1,
      theme: 'L\'histoire de la Franc-Maçonnerie',
      description: 'Tenue ouverte au public avec conférence sur l\'histoire de la Franc-Maçonnerie.',
      status: 'pending',
    },
  ];
};

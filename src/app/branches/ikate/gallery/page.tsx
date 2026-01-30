'use client';

import { GalleryPage } from '@/components/UIs/GalleryPage';

const ikateGalleryImages = [
  {
    id: '1',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691611/PI_Deluxe_coyn3r.jpg',
    category: 'rooms' as const,
    alt: 'Parktonian Ikate Deluxe Room',
  },
  {
    id: '2',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691603/PI_Executive_Suite_f0oorc.jpg',
    category: 'rooms' as const,
    alt: 'Parktonian Ikate Executive Suite',
  },
  {
    id: '3',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691601/IMG_20220704_113706_smqueb.jpg',
    category: 'dining' as const,
    alt: 'Parktonian Ikate Dining Area',
  },
  {
    id: '4',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691596/PI_Alcove_el0weu.jpg',
    category: 'rooms' as const,
    alt: 'Parktonian Ikate Alcove Room',
  },
  {
    id: '5',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691530/IMG_20220702_195057_bdewtj.jpg',
    category: 'wellness' as const,
    alt: 'Parktonian Ikate Wellness Facility',
  },
  {
    id: '6',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691530/IMG_20220704_113928_ea83sl.jpg',
    category: 'wellness' as const,
    alt: 'Parktonian Ikate Pool View',
  },
  {
    id: '7',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691523/IMG_20220702_195226_ymzrga.jpg',
    category: 'dining' as const,
    alt: 'Parktonian Ikate Restaurant',
  },
  {
    id: '8',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691499/IMG_20220704_113621_xjobt2.jpg',
    category: 'rooms' as const,
    alt: 'Parktonian Ikate Guest Room',
  },
  {
    id: '9',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691491/IMG_20220704_112202_qafjau.jpg',
    category: 'rooms' as const,
    alt: 'Parktonian Ikate Suite',
  },
  {
    id: '10',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691471/IMG_20220704_113241_sigqzz.jpg',
    category: 'wellness' as const,
    alt: 'Parktonian Ikate Spa',
  },
  {
    id: '11',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691451/IMG_20220704_113143_ekgtx1.jpg',
    category: 'rooms' as const,
    alt: 'Parktonian Ikate Luxury Room',
  },
  {
    id: '12',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691530/IMG_20220702_195057_bdewtj.jpg',
    category: 'wellness' as const,
    alt: 'Parktonian Ikate Wellness Facility',
  },
  {
    id: '13',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691530/IMG_20220704_113928_ea83sl.jpg',
    category: 'wellness' as const,
    alt: 'Parktonian Ikate Pool View',
  },
];

export default function IkateGalleryPage() {
  return (
    <GalleryPage
      branchName="Parktonian Ikate"
      images={ikateGalleryImages}
      backUrl="/branches/ikate"
    />
  );
}

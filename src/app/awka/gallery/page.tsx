'use client';

import { GalleryPage } from '@/components/UIs/GalleryPage';

const awkaGalleryImages = [
  {
    id: '1',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692065/PA_Classic_Alcove_pemy6p.jpg',
    category: 'rooms' as const,
    alt: 'Parktonian Awka Classic Alcove',
  },
  {
    id: '2',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692065/IMG_20220628_051430_adxtst.jpg',
    category: 'dining' as const,
    alt: 'Parktonian Awka Restaurant',
  },
  {
    id: '3',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692060/PA_Deluxe_sqsnbp.jpg',
    category: 'rooms' as const,
    alt: 'Parktonian Awka Deluxe Room',
  },
  {
    id: '4',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692059/PA_Executive_mgldps.jpg',
    category: 'rooms' as const,
    alt: 'Parktonian Awka Executive Suite',
  },
  {
    id: '5',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692041/IMG_20220628_054302_pdgakm.jpg',
    category: 'rooms' as const,
    alt: 'Parktonian Awka Ambassadorial Suite',
  },
  {
    id: '6',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692040/PA_Alcove_lfxo9u.jpg',
    category: 'rooms' as const,
    alt: 'Parktonian Awka Alcove Room',
  },
  {
    id: '7',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692031/IMG_20220628_054754_bzrysx.jpg',
    category: 'wellness' as const,
    alt: 'Parktonian Awka Wellness Center',
  },
  {
    id: '8',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692020/IMG_20220628_050539_svn1oy.jpg',
    category: 'dining' as const,
    alt: 'Parktonian Awka Dining Area',
  },
  {
    id: '9',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692009/Parktonian_Hotel_Awka_xckfw8.jpg',
    category: 'rooms' as const,
    alt: 'Parktonian Awka Presidential Suite',
  },
  {
    id: '10',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692003/IMG_20220628_053215_p508vv.jpg',
    category: 'wellness' as const,
    alt: 'Parktonian Awka Pool Area',
  },
  {
    id: '11',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691986/IMG_20220628_050153_waxhwt.jpg',
    category: 'dining' as const,
    alt: 'Parktonian Awka Bar Lounge',
  },
  {
    id: '12',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691952/DSC_2078_tdwcfh.jpg',
    category: 'rooms' as const,
    alt: 'Parktonian Awka Guest Room',
  },
  {
    id: '13',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691934/DSC_2198_rsjlzj.jpg',
    category: 'wellness' as const,
    alt: 'Parktonian Awka Spa Facilities',
  },
  {
    id: '14',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691934/DSC_2103_myjnqg.jpg',
    category: 'rooms' as const,
    alt: 'Parktonian Awka Luxury Room',
  },
];

export default function AwkaGalleryPage() {
  return (
    <GalleryPage
      branchName="Parktonian Awka"
      images={awkaGalleryImages}
      backUrl="/awka"
    />
  );
}

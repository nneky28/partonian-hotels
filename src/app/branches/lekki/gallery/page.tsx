'use client';

import { GalleryPage } from '@/components/UIs/GalleryPage';

const lekkiGalleryImages = [
  {
    id: '1',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629746/DSC00334_bt55ra.jpg',
    category: 'rooms' as const,
    alt: 'Luxury Hotel Exterior',
  },
  {
    id: '2',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629735/DSC00335_d3z16p.jpg',
    category: 'rooms' as const,
    alt: 'Hotel Entrance',
  },
  {
    id: '3',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629734/DSC00347_jtnszt.jpg',
    category: 'dining' as const,
    alt: 'Restaurant Interior',
  },
  {
    id: '4',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629705/DSC00323_vqbjyw.jpg',
    category: 'wellness' as const,
    alt: 'Swimming Pool Area',
  },
  {
    id: '5',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629704/DSC00341_yv5u3g.jpg',
    category: 'rooms' as const,
    alt: 'Executive Suite',
  },
  {
    id: '6',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629697/DSC00327_pyutml.jpg',
    category: 'rooms' as const,
    alt: 'Presidential Deluxe Room',
  },
  {
    id: '7',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629638/DSC00316_aj0kwz.jpg',
    category: 'rooms' as const,
    alt: 'Classic King Room',
  },
  {
    id: '8',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629638/DSC00307_v8ejxg.jpg',
    category: 'rooms' as const,
    alt: 'Lekki View Suite',
  },
  {
    id: '9',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629620/DSC00255_o0tri1.jpg',
    category: 'dining' as const,
    alt: 'Dining Area',
  },
  {
    id: '10',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629623/DSC00294_x9sku5.jpg',
    category: 'wellness' as const,
    alt: 'Wellness Center',
  },
  {
    id: '11',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629602/DSC00245_zetxwp.jpg',
    category: 'rooms' as const,
    alt: 'Hotel Room View',
  },
  {
    id: '12',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629588/DSC00196_tbitbl.jpg',
    category: 'dining' as const,
    alt: 'Restaurant Dining',
  },
  {
    id: '13',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629540/DSC00232_zhiuz8.jpg',
    category: 'rooms' as const,
    alt: 'Luxury Suite',
  },
  {
    id: '14',
    url: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629522/DSC00236_ktf3pu.jpg',
    category: 'wellness' as const,
    alt: 'Spa and Wellness',
  },
];

export default function LekkiGalleryPage() {
  return (
    <GalleryPage
      branchName="Parktonian Lekki"
      images={lekkiGalleryImages}
      backUrl="/branches/lekki"
    />
  );
}

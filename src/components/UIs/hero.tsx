'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';
import { Header } from './Header';
import { HeroSlider } from './HeroSlider';
import { AboutSection } from './AboutSection';
import { BranchesSection } from './BranchesSection';
import { AmenitiesSection } from './AmenitiesSection';
import { Branch} from '@/types';
import { Footer } from './footer';
import { useRouter } from 'next/navigation';
import { footerSections } from '@/utils/footerSection';
import { getResponsiveSrcSet } from '@/utils/imageUtils';

const heroSlides = [
  {
    backgroundImage: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629071/Parktonian_Hotel_Lekki_apc6xm.jpg',
    srcSet: getResponsiveSrcSet('https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629071/Parktonian_Hotel_Lekki_apc6xm.jpg'),
    title: 'Experience',
    highlightedText: 'Parktonian Hotels',
    description: 'Discover a sanctuary of comfort and sophistication across our premier locations in Lagos and Awka. Unparalleled luxury at every turn.',
  },
  {
    backgroundImage: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1770115018/DSC00323_zgghic.jpg',
    srcSet: getResponsiveSrcSet('https://res.cloudinary.com/djmwqkcw5/image/upload/v1770115018/DSC00323_zgghic.jpg'),
    title: 'Luxury Meets',
    highlightedText: 'Comfort',
    description: 'Immerse yourself in world-class amenities and personalized service. Where every detail matters and excellence is standard.',
  },
  {
    backgroundImage: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629746/DSC00334_bt55ra.jpg',
    srcSet: getResponsiveSrcSet('https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629746/DSC00334_bt55ra.jpg'),
    title: 'Your Ultimate',
    highlightedText: 'Destination',
    description: 'From Lagos to Awka, experience hospitality redefined. Book your stay at any of our prestigious locations today.',
  },
  {
    backgroundImage: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1770115114/DSC00304_txnbii.jpg',
    srcSet: getResponsiveSrcSet('https://res.cloudinary.com/djmwqkcw5/image/upload/v1770115114/DSC00304_txnbii.jpg'),
    title: 'Redefining',
    highlightedText: 'Excellence',
    description: 'Immerse yourself in world-class amenities and personalized service. Where every detail matters and excellence is standard.',
  },
  {
    backgroundImage: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1770115232/IMG_9418_hzmvqh.jpg',
    srcSet: getResponsiveSrcSet('https://res.cloudinary.com/djmwqkcw5/image/upload/v1770115232/IMG_9418_hzmvqh.jpg'),
    title: 'Enjoy Premium',
    highlightedText: 'Delicacies',
    description: 'Savor exquisite dining experiences crafted for perfection. From signature cocktails to international cuisine, indulge in culinary excellence.',
  },
  {
    backgroundImage: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1770115115/DSC00296_lbumm3.jpg',
    srcSet: getResponsiveSrcSet('https://res.cloudinary.com/djmwqkcw5/image/upload/v1770115115/DSC00296_lbumm3.jpg'),
    title: 'Top-notch Gym',
    highlightedText: 'Facilities',
    description: 'Experience unparalleled elegance in the heart of Lagos\' most prestigious district. Parktonian Hotel Lekki stands as a beacon of modern luxury and African hospitality.',
  }
];

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Lekki', href: '/lekki' },
  { label: 'Ikate', href: '/ikate' },
  { label: 'Awka', href: '/awka' },
];

const branches: Branch[] = [
  {
    id: 'lekki',
    name: 'Parktonian Lekki',
    title: 'Parktonian Lekki',
    description: "The heart of Lagos' most vibrant district, offering breathtaking city views and premium amenities for the modern traveler.",
    imageUrl: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629071/Parktonian_Hotel_Lekki_apc6xm.jpg',
    srcSet: getResponsiveSrcSet('https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629071/Parktonian_Hotel_Lekki_apc6xm.jpg'),
  },
  {
    id: 'ikate',
    name: 'Parktonian Ikate',
    title: 'Parktonian Ikate',
    description: 'A serene escape designed for the discerning traveler seeking privacy and bespoke hospitality experiences in the city.',
    imageUrl: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629100/Parktonian_Hotel_Ikate_wegghs.jpg',
    srcSet: getResponsiveSrcSet('https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629100/Parktonian_Hotel_Ikate_wegghs.jpg'),
  },
  {
    id: 'awka',
    name: 'Parktonian Awka',
    title: 'Parktonian Awka',
    description: 'Experience premium comfort in the eastern heartland. Our Awka branch defines local luxury with international standards.',
    imageUrl: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629133/Parktonian_Hotel_Awka_x4zbrm.jpg',
    srcSet: getResponsiveSrcSet('https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629133/Parktonian_Hotel_Awka_x4zbrm.jpg'),
  },
];


const Hero = () => {
  const router = useRouter();

  const handleBookNow = () => {
    console.log('Book now clicked');
  };

  const handleExploreBranch = (id: string) => {
    router.push(`/${id}`);
  };


  return (
    <Box>
      <Header navLinks={navLinks} onBookNow={handleBookNow} />
      
      <HeroSlider slides={heroSlides} autoPlayInterval={5000} />

      <AboutSection onBookRoom={handleBookNow} />

      <BranchesSection
        branches={branches}
        onExploreBranch={handleExploreBranch}
      />

      <AmenitiesSection />

      <Footer
        sections={footerSections}

      />
    </Box>
  );
};

export default Hero;
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

const heroSlides = [
  {
    backgroundImage: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629071/Parktonian_Hotel_Lekki_apc6xm.jpg',
    title: 'Experience',
    highlightedText: 'Parktonian Hotels',
    subtitle: 'Welcome to Excellence',
    description: 'Discover a sanctuary of comfort and sophistication across our premier locations in Lagos and Awka. Unparalleled luxury at every turn.',
  },
  {
    backgroundImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd1R3sUvo9FFitt40ipj8oma5rH0w8T8Djw0c72jwSVgTzE5390kn_29xmNSuHcWY0nbetSoh6jQFjmbPAoxIUsbzqouHYh1iqDJJCrtWj3b212cG-7d71tKwfcd9d5SgdPaeLnKog0R4KydXJBbP4SA9PRxM0EgTt-ieDWoEjBUXPWWQSEeSFodwMt3EKNVLDFy8XeV7Mud8SvnQ20qLccDOiZhruEkLGtoIzPT-52v5VyUa2MMUZAfM52ePuDgSsqa81Iwfce-Q',
    title: 'Luxury Meets',
    highlightedText: 'Comfort',
    subtitle: 'Premium Experience',
    description: 'Immerse yourself in world-class amenities and personalized service. Where every detail matters and excellence is standard.',
  },
  {
    backgroundImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_4vMiLYUo-cNmfUNT2z3LthOtRe08X-EXd2gZRgsQqvfz4BwUejiLukO8Yi8JUj9RHSWuZ88IOAkrvXaA4PX2-FZVBnOG_Jk1ETr2hO1GzmG-EqamW6KAWHLSW36aGQJinYSrxIeIKkPlBPOqv9LcwVAvXhDXMy4DJ_mSlGBoSxkOYgbz1b2evHlMiflnNVidymt_jAK1g7h0Ug-WvhQ8dsSOwwcNa2qDTaIABWtgJVNWbzGWp12uBev3GuEHZckKn_ET-b9rT_M',
    title: 'Your Ultimate',
    highlightedText: 'Destination',
    subtitle: 'Exceptional Hospitality',
    description: 'From Lagos to Awka, experience hospitality redefined. Book your stay at any of our prestigious locations today.',
  },
];

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Lekki', href: '/branches/lekki' },
  { label: 'Ikate', href: '/branches/ikate' },
  { label: 'Awka', href: '/branches/awka' },
];

const branches: Branch[] = [
  {
    id: 'lekki',
    name: 'Parktonian Lekki',
    title: 'Parktonian Lekki',
    description: "The heart of Lagos' most vibrant district, offering breathtaking city views and premium amenities for the modern traveler.",
    imageUrl: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629071/Parktonian_Hotel_Lekki_apc6xm.jpg',
  },
  {
    id: 'ikate',
    name: 'Parktonian Ikate',
    title: 'Parktonian Ikate',
    description: 'A serene escape designed for the discerning traveler seeking privacy and bespoke hospitality experiences in the city.',
    imageUrl: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629100/Parktonian_Hotel_Ikate_wegghs.jpg',
  },
  {
    id: 'awka',
    name: 'Parktonian Awka',
    title: 'Parktonian Awka',
    description: 'Experience premium comfort in the eastern heartland. Our Awka branch defines local luxury with international standards.',
    imageUrl: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629133/Parktonian_Hotel_Awka_x4zbrm.jpg',
  },
];


const Hero = () => {
  const router = useRouter();

  const handleBookNow = () => {
    console.log('Book now clicked');
  };

  const handleExploreBranch = (id: string) => {
    router.push(`/branches/${id}`);
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
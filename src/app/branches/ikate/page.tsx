'use client';

import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Header } from '@/components/UIs/Header';
import { BranchPageHero } from '@/components/UIs/BranchPageHero';
import { BranchInfoSection } from '@/components/UIs/BranchInfoSection';
import { RoomsSection } from '@/components/UIs/RoomsSection';
import { Footer } from '@/components/UIs/footer';
import { BookingModal } from '@/components/UIs/BookingModal';
import { MdPool, MdWifi, MdFitnessCenter, MdLocalParking, MdTheaters, MdShoppingBag, MdSpa, MdKingBed, MdVisibility, MdBalcony, MdBreakfastDining, MdLocalBar } from 'react-icons/md';
import { footerSections } from '@/utils/footerSection';
import { BranchHeroSlider } from '@/components/UIs/BranchHeroSlider';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Lekki', href: '/branches/lekki' },
  { label: 'Ikate', href: '/branches/ikate' },
  { label: 'Awka', href: '/branches/awka' },
];

const photos = {
  main: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691611/PI_Deluxe_coyn3r.jpg',
  lounge: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691603/PI_Executive_Suite_f0oorc.jpg',
  dining: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691601/IMG_20220704_113706_smqueb.jpg',
  pool: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691596/PI_Alcove_el0weu.jpg',
};

const rooms = [
  {
    id: 'deluxe-room',
    name: 'Deluxe Room',
    price: '₦80,000',
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691611/PI_Deluxe_coyn3r.jpg',
    badge: { text: 'Best Value', color: 'primary' as const },
    description: 'Comfortable room with modern amenities. Rate with breakfast: ₦95,000',
    amenities: [
      { icon: MdKingBed, label: 'King Bed' },
      { icon: MdWifi, label: 'Free WiFi' },
      { icon: MdLocalBar, label: 'Mini Bar' },
    ],
  },
  {
    id: 'alcove-room',
    name: 'Alcove Room',
    price: '₦90,000',
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691596/PI_Alcove_el0weu.jpg',
    description: 'Spacious alcove room with sitting area. Rate with breakfast: ₦105,000',
    amenities: [
      { icon: MdKingBed, label: 'King Bed' },
      { icon: MdVisibility, label: 'City View' },
      { icon: MdWifi, label: 'High-Speed WiFi' },
    ],
  },
  {
    id: 'executive-room',
    name: 'Executive Room',
    price: '₦180,000',
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691603/PI_Executive_Suite_f0oorc.jpg',
    badge: { text: 'Premium', color: 'gold' as const },
    description: 'Premium executive room with enhanced amenities. Rate with breakfast: ₦195,000',
    amenities: [
      { icon: MdBalcony, label: 'Balcony' },
      { icon: MdBreakfastDining, label: 'Breakfast' },
      { icon: MdPool, label: 'Pool Access' },
    ],
  },
];

const heroSlides = [
  {
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691611/PI_Deluxe_coyn3r.jpg',
    title: 'Ikate Luxury',
    subtitle: 'Serene Elegance',
    description: 'A tranquil retreat in Lagos\' most exclusive neighborhood, designed for those who seek privacy and bespoke hospitality.',
  },
  {
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691603/PI_Executive_Suite_f0oorc.jpg',
    title: 'Contemporary Design',
    subtitle: 'Modern Comfort',
    description: 'Experience contemporary luxury with rooftop infinity pool and premium spa services crafted for your ultimate relaxation.',
  },
  {
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691530/IMG_20220704_113928_ea83sl.jpg',
    title: 'Rooftop Paradise',
    subtitle: 'Sky-High Luxury',
    description: 'Unwind at our stunning rooftop pool with panoramic city views and exclusive cabana service.',
  },
];

export default function IkateBranchPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookRoom = (roomId: string) => {
    console.log('Booking room:', roomId);
    setIsBookingModalOpen(true);
  };

  return (
    <Box bg="luxuryBlack" minH="100vh">
      <Header navLinks={navLinks} onBookNow={() => setIsBookingModalOpen(true)} />

      <Box as="main" flex={1}>
        <BranchHeroSlider
          slides={heroSlides}
          galleryUrl="/branches/ikate/gallery"
          onBookNow={() => setIsBookingModalOpen(true)}
        />

        <BranchInfoSection
          subtitle="Serene Elegance"
          title="Ikate Luxury<br/>Experience"
          description={[
            "A serene escape designed for the discerning traveler seeking privacy and bespoke hospitality experiences in the heart of Lagos' most exclusive neighborhood.",
            "Experience contemporary luxury with our rooftop infinity pool, premium spa services, and personalized concierge. Every moment at Parktonian Ikate is crafted for your ultimate comfort.",
          ]}
          stats={[
            { value: '40+', label: 'Premium<br/>Rooms' },
            { value: '100%', label: 'Guest<br/>Satisfaction' },
          ]}
          amenities={[
            { icon: MdPool, label: 'Rooftop Pool' },
            { icon: MdWifi, label: 'High-Speed Wi-Fi' },
            { icon: MdFitnessCenter, label: 'Modern Gym' },
            { icon: MdLocalParking, label: 'Valet Parking' },
          ]}
          attractions={[
            { icon: MdTheaters, name: 'Genesis Cinemas', distance: '3 MIN DRIVE' },
            { icon: MdShoppingBag, name: 'Circle Mall', distance: '5 MIN DRIVE' },
            { icon: MdSpa, name: 'Wellness Spa', distance: '7 MIN DRIVE' },
          ]}
          onBookBranch={() => setIsBookingModalOpen(true)}
        />

        <RoomsSection rooms={rooms} onBookRoom={handleBookRoom} onToggleFavorite={(id) => console.log('Favorite:', id)} />
      </Box>

      <Footer sections={footerSections} />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        branchName="Ikate Luxury"
      />
    </Box>
  );
}

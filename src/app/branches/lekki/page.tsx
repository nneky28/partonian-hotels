'use client';

import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Header } from '@/components/UIs/Header';
import { BranchHeroSlider } from '@/components/UIs/BranchHeroSlider';
import { BranchInfoSection } from '@/components/UIs/BranchInfoSection';
import { RoomsSection } from '@/components/UIs/RoomsSection';
import { Footer } from '@/components/UIs/footer';
import { BookingModal } from '@/components/UIs/BookingModal';
import { MdPool, MdWifi, MdFitnessCenter, MdLocalParking, MdPalette, MdBeachAccess, MdShoppingBag, MdKingBed, MdVisibility, MdWork, MdLocalBar, MdSoupKitchen, MdBalcony, MdBreakfastDining } from 'react-icons/md';
import { footerSections } from '@/utils/footerSection';
import { FaConciergeBell } from "react-icons/fa";


const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Lekki', href: '/branches/lekki' },
  { label: 'Ikate', href: '/branches/ikate' },
  { label: 'Awka', href: '/branches/awka' },
];

const photos = {
  main: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629746/DSC00334_bt55ra.jpg',
  lounge: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629735/DSC00335_d3z16p.jpg',
  dining: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629734/DSC00347_jtnszt.jpg',
  pool: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629705/DSC00323_vqbjyw.jpg',
};

const rooms = [
  {
    id: 'deluxe-room',
    name: 'Deluxe Room',
    price: '₦120,000',
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629704/DSC00341_yv5u3g.jpg',
    badge: { text: 'Popular', color: 'primary' as const },
    description: 'Comfortable and elegant room with modern amenities, perfect for both business and leisure travelers. Rate with breakfast: ₦135,000',
    amenities: [
      { icon: MdKingBed, label: 'King Bed' },
      { icon: MdWifi, label: 'Fast WiFi' },
      { icon: MdLocalBar, label: 'Mini Bar' },
    ],
  },
  {
    id: 'alcove-room',
    name: 'Alcove Room',
    price: '₦140,000',
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629697/DSC00327_pyutml.jpg',
    description: 'Spacious alcove room featuring separate sitting area. Rate with breakfast: ₦155,000',
    amenities: [
      { icon: MdKingBed, label: 'King Bed' },
      { icon: MdVisibility, label: 'City View' },
      { icon: MdWifi, label: 'Ultra Fast Wifi' },
    ],
  },
  {
    id: 'royal-alcove',
    name: 'Royal Alcove',
    price: '₦150,000',
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629638/DSC00316_aj0kwz.jpg',
    badge: { text: 'Bestseller', color: 'primary' as const },
    description: 'Premium alcove suite with luxurious furnishings. Rate with breakfast: ₦165,000',
    amenities: [
      { icon: MdKingBed, label: 'King Bed' },
      { icon: MdWork, label: 'Work Desk' },
      { icon: MdBreakfastDining, label: 'Breakfast' },
    ],
  },
  {
    id: 'double-room',
    name: 'Double Room',
    price: '₦250,000',
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629638/DSC00307_v8ejxg.jpg',
    description: 'Spacious double room perfect for families or groups. Rate with breakfast: ₦265,000',
    amenities: [
      { icon: MdKingBed, label: 'Twin Beds' },
      { icon: MdBalcony, label: 'Balcony' },
      { icon: MdPool, label: 'Pool Access' },
    ],
  },
  {
    id: 'executive-suite',
    name: 'Executive Suite',
    price: '₦250,000',
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629620/DSC00255_o0tri1.jpg',
    badge: { text: 'Ultra Luxury', color: 'gold' as const },
    description: 'Ultimate luxury suite with separate living area and premium amenities. Rate with breakfast: ₦265,000',
    amenities: [
      { icon: MdSoupKitchen, label: 'Kitchenette' },
      { icon: FaConciergeBell, label: 'Concierge' },
      { icon: MdPool, label: 'Pool Access' },
    ],
  },
];

const heroSlides = [
  {
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629746/DSC00334_bt55ra.jpg',
    title: 'Lekki Phase 1',
    subtitle: 'Luxury Redefined',
    description: 'Experience unparalleled elegance in the heart of Lagos\' most prestigious district. Where modern luxury meets African hospitality.',
  },
  {
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629735/DSC00335_d3z16p.jpg',
    title: 'Premium Comfort',
    subtitle: 'Exclusive Location',
    description: 'Nestled in Lekki Phase 1, our hotel offers breathtaking views and world-class amenities for the discerning traveler.',
  },
  {
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629705/DSC00323_vqbjyw.jpg',
    title: 'Exquisite Dining',
    subtitle: 'Culinary Excellence',
    description: 'From signature cocktails to international cuisine, indulge in a dining experience crafted for perfection.',
  },
];

export default function LekkiBranchPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookRoom = (roomId: string) => {
    console.log('Booking room:', roomId);
    setIsBookingModalOpen(true);
  };

  const handleToggleFavorite = (roomId: string) => {
    console.log('Toggle favorite:', roomId);
  };

  return (
    <Box bg="luxuryBlack" minH="100vh">
      <Header navLinks={navLinks} onBookNow={() => setIsBookingModalOpen(true)} />

      <Box as="main" flex={1}>
        <BranchHeroSlider
          slides={heroSlides}
          galleryUrl="/branches/lekki/gallery"
          onBookNow={() => setIsBookingModalOpen(true)}
          autoPlayInterval={6000}
        />

        <BranchInfoSection
          subtitle="Exclusivity in Lagos"
          title="The Iconic Parktonian <br/>Hotel Lekki Phase 1"
          description={[
            "Nestled in the heart of Lagos' most prestigious residential district, Parktonian Hotel Lekki stands as a beacon of modern luxury and African hospitality. Our establishment is designed for the discerning traveler who seeks both comfort and connection.",
            "From our signature sunset lounge to the meticulously curated international buffet, every detail has been refined to provide an unforgettable stay. Whether you're here for business in the peninsula or leisure by the coast, we offer a sanctuary of calm amidst the vibrant energy of Lekki.",
          ]}
          stats={[
            { value: '50+', label: 'Luxury<br/>Suites' },
            { value: '24/7', label: 'Concierge<br/>Service' },
          ]}
          amenities={[
            { icon: MdPool, label: 'Oasis Pool' },
            { icon: MdWifi, label: 'Fast Wi-Fi' },
            { icon: MdFitnessCenter, label: 'Fitness Club' },
            { icon: MdLocalParking, label: 'Secure Park' },
          ]}
          attractions={[
            { icon: MdPalette, name: 'Nike Art Gallery', distance: '5 MIN DRIVE' },
            { icon: MdBeachAccess, name: 'Elegushi Beach', distance: '8 MIN DRIVE' },
            { icon: MdShoppingBag, name: 'The Palms Mall', distance: '10 MIN DRIVE' },
          ]}
          onBookBranch={() => setIsBookingModalOpen(true)}
        />

        <RoomsSection
          rooms={rooms}
          onBookRoom={handleBookRoom}
          onToggleFavorite={handleToggleFavorite}
        />
      </Box>

      <Footer sections={footerSections} />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        branchName="Lekki Phase 1"
      />
    </Box>
  );
}

'use client';

import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Header } from '@/components/UIs/Header';
import { BranchPageHero } from '@/components/UIs/BranchPageHero';
import { BranchInfoSection } from '@/components/UIs/BranchInfoSection';
import { RoomsSection } from '@/components/UIs/RoomsSection';
import { Footer } from '@/components/UIs/footer';
import { BookingModal } from '@/components/UIs/BookingModal';
import { MdPool, MdWifi, MdFitnessCenter, MdLocalParking, MdChurch, MdSchool, MdLocalHospital, MdKingBed, MdBreakfastDining, MdLocalBar, MdVisibility, MdSoupKitchen, MdWork, MdBalcony } from 'react-icons/md';
import { FaConciergeBell } from 'react-icons/fa';
import { footerSections } from '@/utils/footerSection';
import { BranchHeroSlider } from '@/components/UIs/BranchHeroSlider';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Lekki', href: '/branches/lekki' },
  { label: 'Ikate', href: '/branches/ikate' },
  { label: 'Awka', href: '/branches/awka' },
];

const photos = {
  main: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692009/Parktonian_Hotel_Awka_xckfw8.jpg',
  lounge: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692060/PA_Deluxe_sqsnbp.jpg',
  dining: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692059/PA_Executive_mgldps.jpg',
  pool: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692040/PA_Alcove_lfxo9u.jpg',
};

const rooms = [
  {
    id: 'deluxe',
    name: 'Deluxe',
    price: '₦70,000',
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692060/PA_Deluxe_sqsnbp.jpg',
    badge: { text: 'Best Value', color: 'primary' as const },
    description: 'Comfortable deluxe room with modern amenities. Rate with breakfast: ₦80,000',
    amenities: [
      { icon: MdKingBed, label: 'King Bed' },
      { icon: MdWifi, label: 'Free WiFi' },
      { icon: MdLocalBar, label: 'Mini Bar' },
    ],
  },
  {
    id: 'alcove',
    name: 'Alcove',
    price: '₦70,000',
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692040/PA_Alcove_lfxo9u.jpg',
    description: 'Spacious alcove room with sitting area. Rate with breakfast: ₦80,000',
    amenities: [
      { icon: MdKingBed, label: 'King Bed' },
      { icon: MdWifi, label: 'High-Speed WiFi' },
      { icon: MdBreakfastDining, label: 'Breakfast Option' },
    ],
  },
  {
    id: 'royal-alcove',
    name: 'Royal Alcove',
    price: '₦75,000',
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692065/PA_Classic_Alcove_pemy6p.jpg',
    badge: { text: 'Popular', color: 'primary' as const },
    description: 'Premium royal alcove suite. Rate with breakfast: ₦85,000',
    amenities: [
      { icon: MdKingBed, label: 'King Bed' },
      { icon: MdVisibility, label: 'City View' },
      { icon: MdPool, label: 'Pool Access' },
    ],
  },
  {
    id: 'executive-suite',
    name: 'Executive Suite',
    price: '₦150,000',
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692059/PA_Executive_mgldps.jpg',
    description: 'Spacious executive suite with premium amenities. Rate with breakfast: ₦160,000',
    amenities: [
      { icon: MdSoupKitchen, label: 'Kitchenette' },
      { icon: MdWork, label: 'Work Desk' },
      { icon: MdBreakfastDining, label: 'Breakfast' },
    ],
  },
  {
    id: 'ambassadorial-suite',
    name: 'Ambassadorial Suite',
    price: '₦160,000',
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692041/IMG_20220628_054302_pdgakm.jpg',
    badge: { text: 'Luxury', color: 'gold' as const },
    description: 'Luxury ambassadorial suite with exclusive amenities. Rate with breakfast: ₦170,000',
    amenities: [
      { icon: FaConciergeBell, label: 'Concierge' },
      { icon: MdBalcony, label: 'Private Balcony' },
      { icon: MdPool, label: 'Pool Access' },
    ],
  },
  {
    id: 'presidential-suite',
    name: 'Presidential Suite',
    price: '₦210,000',
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692009/Parktonian_Hotel_Awka_xckfw8.jpg',
    badge: { text: 'Ultimate Luxury', color: 'gold' as const },
    description: 'The ultimate presidential suite with all premium amenities. Rate with breakfast: ₦220,000',
    amenities: [
      { icon: MdSoupKitchen, label: 'Full Kitchen' },
      { icon: FaConciergeBell, label: 'Butler Service' },
      { icon: MdPool, label: 'Private Pool' },
    ],
  },
];

const heroSlides = [
  {
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692009/Parktonian_Hotel_Awka_xckfw8.jpg',
    title: 'Awka Heights',
    subtitle: 'Eastern Excellence',
    description: 'Experience premium comfort in the eastern heartland, where traditional hospitality meets international luxury standards.',
  },
  {
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692059/PA_Executive_mgldps.jpg',
    title: 'Cultural Elegance',
    subtitle: 'Local Heritage',
    description: 'Discover the perfect blend of modern amenities and authentic eastern Nigerian hospitality in Anambra\'s capital.',
  },
  {
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692065/IMG_20220628_051430_adxtst.jpg',
    title: 'Culinary Journey',
    subtitle: 'Authentic Flavors',
    description: 'Savor authentic local delicacies and international cuisine in our executive restaurant overlooking the city.',
  },
];

export default function AwkaBranchPage() {
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
          galleryUrl="/branches/awka/gallery"
          onBookNow={() => setIsBookingModalOpen(true)}
        />

        <BranchInfoSection
          subtitle="Eastern Excellence"
          title="Awka Heights<br/>Premium"
          description={[
            "Experience premium comfort in the eastern heartland. Our Awka branch defines local luxury with international standards, blending traditional hospitality with modern amenities.",
            "From our wellness pool to our executive restaurant serving authentic local and international cuisine, every aspect is designed to make your stay memorable in Anambra's capital city.",
          ]}
          stats={[
            { value: '35+', label: 'Comfort<br/>Rooms' },
            { value: '5★', label: 'Premium<br/>Rating' },
          ]}
          amenities={[
            { icon: MdPool, label: 'Garden Pool' },
            { icon: MdWifi, label: 'Fast Internet' },
            { icon: MdFitnessCenter, label: 'Fitness Center' },
            { icon: MdLocalParking, label: 'Free Parking' },
          ]}
          attractions={[
            { icon: MdChurch, name: "St. Patrick's Cathedral", distance: '5 MIN DRIVE' },
            { icon: MdSchool, name: 'UNIZIK', distance: '8 MIN DRIVE' },
            { icon: MdLocalHospital, name: 'Teaching Hospital', distance: '10 MIN DRIVE' },
          ]}
          onBookBranch={() => setIsBookingModalOpen(true)}
        />

        <RoomsSection rooms={rooms} onBookRoom={handleBookRoom} onToggleFavorite={(id) => console.log('Favorite:', id)} />
      </Box>

      <Footer sections={footerSections} />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        branchName="Awka Heights"
      />
    </Box>
  );
}

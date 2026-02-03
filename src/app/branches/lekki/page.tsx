'use client';

import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Header } from '@/components/UIs/Header';
import { BranchHeroSlider } from '@/components/UIs/BranchHeroSlider';
import { BranchInfoSection } from '@/components/UIs/BranchInfoSection';
import { RoomsSection } from '@/components/UIs/RoomsSection';
import { Footer } from '@/components/UIs/footer';
import { BookingModal } from '@/components/UIs/BookingModal';
import { MdPool, MdWifi, MdPalette, MdBeachAccess, MdShoppingBag, MdKingBed, MdVisibility, MdWork, MdLocalBar, MdBalcony, MdBed, MdSquare, MdFitnessCenter } from 'react-icons/md';
import { footerSections } from '@/utils/footerSection';
import { getResponsiveSrcSet } from '@/utils/imageUtils';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Lekki', href: '/branches/lekki' },
  { label: 'Ikate', href: '/branches/ikate' },
  { label: 'Awka', href: '/branches/awka' },
];


const rooms = [
  {
    id: 'deluxe-room',
    name: 'Deluxe Room',
    price: '₦120,000',
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629588/DSC00196_tbitbl.jpg',
    srcSet: getResponsiveSrcSet('https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629588/DSC00196_tbitbl.jpg'),
    badge: { text: 'Popular', color: 'primary' as const },
    description: 'Comfortable and elegant room with modern amenities, perfect for both business and leisure travelers. Rate with breakfast: ₦135,000',
    amenities: [
      { icon: MdKingBed, label: 'King Bed' },
      { icon: MdWifi, label: 'Fast WiFi' },
      { icon: MdLocalBar, label: 'Work Desk' },
    ],
  },
  {
    id: 'alcove-room',
    name: 'Alcove Room',
    price: '₦140,000',
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629602/DSC00245_zetxwp.jpg',
    srcSet: getResponsiveSrcSet('https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629602/DSC00245_zetxwp.jpg'),
    description: 'Spacious alcove room featuring separate sitting area. Rate with breakfast: ₦155,000',
    amenities: [
      { icon: MdKingBed, label: 'King Bed' },
      { icon: MdVisibility, label: 'City View' },
      { icon: MdWork, label: 'Work Desk' },
    ],
  },
  {
    id: 'royal-alcove',
    name: 'Royal Alcove',
    price: '₦150,000',
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629705/DSC00323_vqbjyw.jpg',
    srcSet: getResponsiveSrcSet('https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629705/DSC00323_vqbjyw.jpg'),
    badge: { text: 'Bestseller', color: 'primary' as const },
    description: 'Premium alcove suite with luxurious furnishings. Rate with breakfast: ₦165,000',
    amenities: [
      { icon: MdKingBed, label: 'King Bed' },
      { icon: MdWork, label: 'Work Desk' },
      { icon: MdPool, label: 'Pool Access' },
    ],
  },
  {
    id: 'double-room',
    name: 'Double Room',
    price: '₦250,000',
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629522/DSC00236_ktf3pu.jpg',
    srcSet: getResponsiveSrcSet('https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629522/DSC00236_ktf3pu.jpg'),
    description: 'Spacious double room perfect for families or groups. Rate with breakfast: ₦265,000',
    amenities: [
      { icon: MdBed, label: 'Twin Beds' },
      { icon: MdBalcony, label: 'Balcony' },
      { icon: MdPool, label: 'Pool Access' },
    ],
  },
  {
    id: 'executive-suite',
    name: 'Executive Suite',
    price: '₦250,000',
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629540/DSC00232_zhiuz8.jpg',
    srcSet: getResponsiveSrcSet('https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629540/DSC00232_zhiuz8.jpg'),
    badge: { text: 'Ultra Luxury', color: 'gold' as const },
    description: 'Ultimate luxury suite with separate living area and premium amenities. Rate with breakfast: ₦265,000',
    amenities: [
      { icon: MdKingBed, label: 'King Bed' },
      { icon: MdVisibility, label: 'City View' },
      { icon: MdBalcony, label: 'Private Balcony' },
    ],
  },
];

const heroSlides = [
  {
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629746/DSC00334_bt55ra.jpg',
    srcSet: getResponsiveSrcSet('https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629746/DSC00334_bt55ra.jpg'),
    title: 'Lekki Phase 1',
    subtitle: 'Luxury Redefined',
    description: 'Experience unparalleled elegance in the heart of Lagos\' most prestigious district. Where modern luxury meets African hospitality.',
  },
  {
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629735/DSC00335_d3z16p.jpg',
    srcSet: getResponsiveSrcSet('https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629735/DSC00335_d3z16p.jpg'),
    title: 'Premium Comfort',
    subtitle: 'Exclusive Location',
    description: 'Nestled in Lekki Phase 1, our hotel offers breathtaking views and world-class amenities for the discerning traveler.',
  },
  {
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629705/DSC00323_vqbjyw.jpg',
    srcSet: getResponsiveSrcSet('https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629705/DSC00323_vqbjyw.jpg'),
    title: 'Exquisite Dining',
    subtitle: 'Culinary Excellence',
    description: 'From signature cocktails to international cuisine, indulge in a dining experience crafted for perfection.',
  },
  {
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629638/DSC00307_v8ejxg.jpg',
    srcSet: getResponsiveSrcSet('https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629638/DSC00307_v8ejxg.jpg'),
  },
  {
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629634/DSC00296_gmgsxu.jpg',
    srcSet: getResponsiveSrcSet('https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629634/DSC00296_gmgsxu.jpg'),
  },
  {
    image: 'https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629638/DSC00316_aj0kwz.jpg',
    srcSet: getResponsiveSrcSet('https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629638/DSC00316_aj0kwz.jpg'),
  }
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
          subtitle="Luxury Redefined"
          title="The Iconic Parktonian <br/>Hotel Lekki Phase 1"
          description={[
            "Experience unparalleled elegance in the heart of Lagos' most prestigious district. Parktonian Hotel Lekki stands as a beacon of modern luxury and African hospitality.",
            "Nestled in Lekki Phase 1, Parktonian Hotel Lekki offers breathtaking views and world-class amenities for discerning guests. Our establishment is designed for those who desire comfort, luxury and connection.",
            "From our exclusive indoor lounge, to the serene pool side, to the meticulously curated international buffet, every detail has been refined to provide an unforgettable stay. Our luxurious rooms are designed to delight your senses and give you maximum comfort during your stay. ",
            "Whether you're here for business in the peninsula or leisure by the coast, we offer a sanctuary of calm amidst the vibrant energy of Lekki.  The iconic Parktonian Hotel in Lekki Phase 1 is one of the top destinations in Lagos for individuals of class.",
            'Visit us today and indulge in a wholesome experience crafted for perfection.'

          ]}
          stats={[
            { value: '50+', label: 'Luxury<br/>Suites' },
            { value: '24/7', label: 'Concierge<br/>Service' },
          ]}
          amenities={[
            {icon: MdBed, label: 'Luxurious Rooms'},
            { icon: MdLocalBar, label: 'Executive Lounge' },
            { icon: MdPool, label: 'Swimming Pool' },
            { icon: MdFitnessCenter, label: 'Elite Gym' },
          ]}
          attractions={[
            { icon: MdPalette, name: 'Nike Art Gallery', distance: '5 MIN DRIVE' },
            { icon: MdBeachAccess, name: 'Elegushi Beach', distance: '8 MIN DRIVE' },
            { icon: MdShoppingBag, name: 'The Palms Mall', distance: '10 MIN DRIVE' },
            { icon: MdSquare, name: 'Lekki-Ikoyi Bridge', distance: '15 MIN DRIVE' },
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

export const dynamic = 'force-static';

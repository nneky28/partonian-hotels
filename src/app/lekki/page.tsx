'use client';

import { useMemo, useState } from 'react';
import { Box, Text, Spinner, VStack } from '@chakra-ui/react';
import { Header } from '@/components/UIs/Header';
import { BranchHeroSlider } from '@/components/UIs/BranchHeroSlider';
import { BranchInfoSection } from '@/components/UIs/BranchInfoSection';
import { RoomsSection } from '@/components/UIs/RoomsSection';
import { Footer } from '@/components/UIs/footer';
import { BookingModal } from '@/components/UIs/BookingModal';
import { MdPool, MdPalette, MdBeachAccess, MdShoppingBag, MdLocalBar,MdBed, MdSquare, MdFitnessCenter } from 'react-icons/md';
import { footerSections } from '@/utils/footerSection';
import { getResponsiveSrcSet } from '@/utils/imageUtils';
import { useBranchContent } from '@/hooks/useBranchContent';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Lekki', href: '/lekki' },
  { label: 'Ikate', href: '/ikate' },
  { label: 'Awka', href: '/awka' },
];

const defaultAttractions = [
  { icon: MdPalette, name: 'Nike Art Gallery', distance: '5 MIN DRIVE' },
  { icon: MdBeachAccess, name: 'Elegushi Beach', distance: '8 MIN DRIVE' },
  { icon: MdShoppingBag, name: 'The Palms Mall', distance: '10 MIN DRIVE' },
  { icon: MdSquare, name: 'Lekki-Ikoyi Bridge', distance: '15 MIN DRIVE' },
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
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const { content: remoteContent, isLoading } = useBranchContent('lekki');



  const attractions = useMemo(() => {
    if (!remoteContent.attractions?.length) {
      return defaultAttractions;
    }

    return remoteContent.attractions.map((item: any, index: number) => {
      const fallback = defaultAttractions[index % defaultAttractions.length];
      return {
        icon: fallback.icon,
        name: item.name || fallback.name,
        distance: item.distance || fallback.distance,
      };
    });
  }, [remoteContent.attractions]);

  const handleBookRoom = (room?: any) => {
    setSelectedRoom(room);
    setIsBookingModalOpen(true);
  };



  return (
    <Box bg="luxuryBlack" minH="100vh">
      <Header navLinks={navLinks} onBookNow={() => setIsBookingModalOpen(true)} />

      <Box as="main" flex={1}>
        <BranchHeroSlider
          slides={heroSlides}
          galleryUrl="/lekki/gallery"
          onBookNow={() => setIsBookingModalOpen(true)}
          autoPlayInterval={6000}
        />

        <BranchInfoSection
          subtitle="Luxury Redefined"
          title="Parktonian Hotel Lekki"
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
          attractions={attractions}
          onBookBranch={() => setIsBookingModalOpen(true)}
        />

        {isLoading ? (
          <VStack py={20} spacing={4}>
            <Spinner size="lg" color="primaryRed" />
   
          </VStack>
        ) : remoteContent.rooms.length === 0 ? (
          <VStack py={20} spacing={4}>
            <Text color="white" fontSize="lg">No rooms available at the moment</Text>
          </VStack>
        ) : (
          <RoomsSection
            rooms={remoteContent.rooms as any}
            onBookRoom={handleBookRoom}
            onToggleFavorite={(id) => console.log("Favorite:")}
          />
        )}
      </Box>

      <Footer sections={footerSections} />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setSelectedRoom(null);
        }}
        branchName="Parktonian Hotel Lekki"
        selectedRoom={selectedRoom}
        availableRooms={remoteContent.rooms}
      />
    </Box>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Box, Text, Spinner, VStack } from "@chakra-ui/react";
import { Header } from "@/components/UIs/Header";
import { BranchHeroSlider } from "@/components/UIs/BranchHeroSlider";
import { BranchInfoSection } from "@/components/UIs/BranchInfoSection";
import { RoomsSection } from "@/components/UIs/RoomsSection";
import { Footer } from "@/components/UIs/footer";
import { BookingModal } from "@/components/UIs/BookingModal";
import {
  MdPool,
  MdLocalParking,
  MdKingBed,
  MdVisibility,
  MdWork,
  MdBalcony,
  MdHome,
  MdShoppingBag,
  MdChurch,
  MdLocalActivity,
  MdDirectionsCar,
  MdDesk,
  MdFitnessCenter,
} from "react-icons/md";
import { footerSections } from "@/utils/footerSection";
import { getResponsiveSrcSet } from "@/utils/imageUtils";
import { useBranchContent } from "@/hooks/useBranchContent";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Lekki", href: "/lekki" },
  { label: "Ikate", href: "/ikate" },
  { label: "Awka", href: "/awka" },
];

const defaultAttractions = [
  { icon: MdChurch, name: "Ekwueme Square", distance: "5 MIN DRIVE" },
  { icon: MdShoppingBag, name: "Awka City Stadium", distance: "8 MIN DRIVE" },
  { icon: MdLocalActivity, name: "Nnamdi Azikiwe University", distance: "15 MIN DRIVE" },
  { icon: MdDirectionsCar, name: "Awka Secretariat", distance: "10 MIN DRIVE" },
];

const heroSlides = [
    {
    image: "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692041/IMG_20220628_054302_pdgakm.jpg",
    srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692041/IMG_20220628_054302_pdgakm.jpg"),
  },
    {
    image: "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692059/PA_Executive_mgldps.jpg",
    srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692059/PA_Executive_mgldps.jpg"),
  },
  {
    image: "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692031/IMG_20220628_054754_bzrysx.jpg",
    srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692031/IMG_20220628_054754_bzrysx.jpg"),
    title: "Hotel Awka",
    subtitle: "Eastern Excellence",
    description:
      "Premium comfort in the heart of Anambra. Where local hospitality meets international standards.",
  },
  {
    image: "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691986/IMG_20220628_050153_waxhwt.jpg",
    srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691986/IMG_20220628_050153_waxhwt.jpg"),
    title: "Refined Comfort",
    subtitle: "Modern Amenities",
    description:
      "Experience the perfect blend of traditional warmth and contemporary luxury in every corner.",
  },
  {
    image: "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692065/PA_Classic_Alcove_pemy6p.jpg",
    srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692065/PA_Classic_Alcove_pemy6p.jpg"),
    title: "Premium Hospitality",
    description:
      "From business meetings to leisure stays, we provide an oasis of calm in Awka's bustling capital.",
  },

  {
    image: "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691934/DSC_2198_rsjlzj.jpg",
    srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691934/DSC_2198_rsjlzj.jpg"),
  },

];

export default function AwkaBranchPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const { content: remoteContent, isLoading } = useBranchContent("awka");

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
          galleryUrl="/awka/gallery"
          onBookNow={() => setIsBookingModalOpen(true)}
        />

        <BranchInfoSection
          subtitle="Eastern Excellence"
          title="Parktonian Hotel Awka"
          description={[
            "Experience premium comfort in the eastern heartland, where traditional hospitality meets international luxury standards.",
            "Located in the heart of Awka, Anambra State's capital, Parktonian Hotel Awka stands as a beacon of excellence and hospitality in the Southeast. Discover the perfect blend of modern amenities and authentic Eastern Nigerian hospitality.",
            "Enjoy our luxurious rooms, meet up with friends in our executive lounge, or hangout by the pool side. Savor authentic local delicacies and international cuisine in our exclusive restaurant. Also don’t forget to hit the gym.",
            "Every moment at Parktonian Hotel Awka is designed to make your stay memorable in Anambra's capital city. Visit us today and experience comfort, hospitality and excellence."
          ]}
          stats={[
            { value: "60+", label: "Luxury<br/>Rooms" },
            { value: "24/7", label: "Guest<br/>Support" },
          ]}
          amenities={[
            { icon: MdHome, label: "Luxurious Rooms" },
            { icon:MdFitnessCenter, label: "Fitness Center" },
            { icon: MdPool, label: "Swimming Pool" },
            { icon: MdLocalParking, label: "Secure Parking" },
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
        branchName="Parktonian Hotel Awka"
        selectedRoom={selectedRoom}
        availableRooms={remoteContent.rooms}
      />
    </Box>
  );
}

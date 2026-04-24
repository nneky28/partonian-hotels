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

  MdLocalParking,

  MdBalcony,
  MdHome,
  MdRoomService,
  MdTheaters,
  MdShoppingBag,
  MdBeachAccess,
  MdChurch,

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
  { icon: MdTheaters, name: "Genesis Cinemas", distance: "3 MIN DRIVE" },
  { icon: MdShoppingBag, name: "Circle Mall", distance: "5 MIN DRIVE" },
  { icon: MdBeachAccess, name: "Elegushi Beach", distance: "17 MIN DRIVE" },
  { icon: MdChurch, name: "The Rock Cathedral", distance: "10 MIN DRIVE" },
];

const heroSlides = [
    {
    image:
      "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691581/Parktonian_Hotel_Ikate_oytb43.jpg",
    srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691581/Parktonian_Hotel_Ikate_oytb43.jpg"),
  },
  {
    image: "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691523/IMG_20220702_195226_ymzrga.jpg",
    srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691523/IMG_20220702_195226_ymzrga.jpg"),
  },

  {
    image:
      "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691611/PI_Deluxe_coyn3r.jpg",
    srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691611/PI_Deluxe_coyn3r.jpg"),
    title: "Parktonian Ikate",
    description:
      "A tranquil retreat in Lagos' most exclusive neighborhood, designed for those who seek privacy and bespoke hospitality.",
  },
  {
    image:
      "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691603/PI_Executive_Suite_f0oorc.jpg",
    srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691603/PI_Executive_Suite_f0oorc.jpg"),
    title: "Contemporary Design",
    description:
      "Experience contemporary luxury with rooftop infinity pool and premium spa services crafted for your ultimate relaxation.",
  },
  {
    image:
      "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691596/PI_Alcove_el0weu.jpg",
    srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691596/PI_Alcove_el0weu.jpg"),
    title: "Rooftop Paradise",
    description:
      "Unwind at our stunning rooftop pool with panoramic city views and exclusive cabana service.",
  },
  {
    image:
      "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691601/IMG_20220704_113706_smqueb.jpg",
        srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691601/IMG_20220704_113706_smqueb.jpg"),
  },
];

export default function IkateBranchPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const { content: remoteContent, isLoading } = useBranchContent("ikate");

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
      <Header
        navLinks={navLinks}
        onBookNow={() => setIsBookingModalOpen(true)}
      />

      <Box as="main" flex={1}>
        <BranchHeroSlider
          slides={heroSlides}
          galleryUrl="/ikate/gallery"
          onBookNow={() => setIsBookingModalOpen(true)}
        />

        <BranchInfoSection
          subtitle="Serene Elegance"
          title="Parktonian Hotel Ikate"
          description={[
            "A tranquil retreat in the heart of Lagos' most exclusive neighborhood, designed for those who seek privacy and bespoke hospitality.",
            "Parktonian Hotel Ikate is located along the Lekki-Epe Expressway by the prominent Chisco Busstop. It is a favourite destination for individuals who desire a serene environment to relax and refresh.",
            "Our exclusive lounge is a great place to enjoy private moments with special friends. Indulge in an exquisite dining experience, and enjoy our luxurious rooms designed to give you maximum comfort during your stay.",
            "Every moment at Parktonian Ikate is crafted for exclusivity and ultimate comfort. Visit us today for a luxurious experience.",
          ]}
          stats={[
            { value: "40+", label: "Premium<br/>Rooms" },
            { value: "100%", label: "Guest<br/>Satisfaction" },
          ]}
          amenities={[
            { icon: MdHome, label: "Luxurious Rooms" },
            { icon: MdBalcony, label: "Executive Lounge" },
            { icon: MdRoomService, label: "Bespoke Service" },
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
        branchName="Parktonian Hotel Ikate"
        selectedRoom={selectedRoom}
        availableRooms={remoteContent.rooms}
      />
    </Box>
  );
}

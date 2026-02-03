"use client";

import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { Header } from "@/components/UIs/Header";
import { BranchInfoSection } from "@/components/UIs/BranchInfoSection";
import { RoomsSection } from "@/components/UIs/RoomsSection";
import { Footer } from "@/components/UIs/footer";
import { BookingModal } from "@/components/UIs/BookingModal";
import {
  MdPool,
  MdWifi,
  MdLocalParking,
  MdTheaters,
  MdShoppingBag,
  MdKingBed,
  MdVisibility,
  MdBalcony,
  MdBreakfastDining,
  MdLocalBar,
  MdHome,
  MdRoomService,
  MdBeachAccess,
  MdChurch,
} from "react-icons/md";
import { footerSections } from "@/utils/footerSection";
import { BranchHeroSlider } from "@/components/UIs/BranchHeroSlider";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Lekki", href: "/branches/lekki" },
  { label: "Ikate", href: "/branches/ikate" },
  { label: "Awka", href: "/branches/awka" },
];

const rooms = [
  {
    id: "deluxe-room",
    name: "Deluxe Room",
    price: "₦80,000",
    image:
      "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691611/PI_Deluxe_coyn3r.jpg",
    badge: { text: "Best Value", color: "primary" as const },
    description:
      "Comfortable room with modern amenities. Rate with breakfast: ₦95,000",
    amenities: [
      { icon: MdKingBed, label: "King Bed" },
      { icon: MdWifi, label: "Free WiFi" },
      { icon: MdLocalBar, label: "Work Desk" },
    ],
  },
  {
    id: "alcove-room",
    name: "Alcove Room",
    price: "₦90,000",
    image:
      "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691596/PI_Alcove_el0weu.jpg",
    description:
      "Spacious alcove room with sitting area. Rate with breakfast: ₦105,000",
    amenities: [
      { icon: MdKingBed, label: "King Bed" },
      { icon: MdVisibility, label: "City View" },
      { icon: MdWifi, label: "High-Speed WiFi" },
    ],
  },
  {
    id: "executive-room",
    name: "Executive Room",
    price: "₦180,000",
    image:
      "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691603/PI_Executive_Suite_f0oorc.jpg",
    badge: { text: "Premium", color: "gold" as const },
    description:
      "Premium executive room with enhanced amenities. Rate with breakfast: ₦195,000",
    amenities: [
      { icon: MdBalcony, label: "Balcony" },
      { icon: MdBreakfastDining, label: "Breakfast" },
      { icon: MdPool, label: "Conceirge" },
    ],
  },
];

const heroSlides = [
  {
    image:
      "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691451/IMG_20220704_113143_ekgtx1.jpg",
  },
  {
    image:
      "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691581/Parktonian_Hotel_Ikate_oytb43.jpg",
  },

  {
    image:
      "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691611/PI_Deluxe_coyn3r.jpg",
    title: "Parktonian Ikate",
    description:
      "A tranquil retreat in Lagos' most exclusive neighborhood, designed for those who seek privacy and bespoke hospitality.",
  },
  {
    image:
      "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691603/PI_Executive_Suite_f0oorc.jpg",
    title: "Contemporary Design",
    description:
      "Experience contemporary luxury with rooftop infinity pool and premium spa services crafted for your ultimate relaxation.",
  },
  {
    image:
      "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691596/PI_Alcove_el0weu.jpg",
    title: "Rooftop Paradise",
    description:
      "Unwind at our stunning rooftop pool with panoramic city views and exclusive cabana service.",
  },
  {
    image:
      "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691601/IMG_20220704_113706_smqueb.jpg",
  },
];

export default function IkateBranchPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookRoom = (roomId: string) => {
    console.log("Booking room:", roomId);
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
          galleryUrl="/branches/ikate/gallery"
          onBookNow={() => setIsBookingModalOpen(true)}
        />

        <BranchInfoSection
          subtitle="Serene Elegance"
          title="The Exclusive Parktonian <br/> Hotel Ikate"
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
          attractions={[
            {
              icon: MdTheaters,
              name: "Genesis Cinemas",
              distance: "3 MIN DRIVE",
            },
            {
              icon: MdShoppingBag,
              name: "Circle Mall",
              distance: "5 MIN DRIVE",
            },
            {
              icon: MdBeachAccess,
              name: "Elegushi Beach",
              distance: "17 MIN DRIVE",
            },
            {
              icon: MdChurch,
              name: "The Rock Cathedral",
              distance: "10 MIN DRIVE",
            },
          ]}
          onBookBranch={() => setIsBookingModalOpen(true)}
        />

        <RoomsSection
          rooms={rooms}
          onBookRoom={handleBookRoom}
          onToggleFavorite={(id) => console.log("Favorite:", id)}
        />
      </Box>

      <Footer sections={footerSections} />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        branchName="Parktonian Ikate"
      />
    </Box>
  );
}

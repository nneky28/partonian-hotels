"use client";

import { useState } from "react";
import { Box } from "@chakra-ui/react";
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

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Lekki", href: "/branches/lekki" },
  { label: "Ikate", href: "/branches/ikate" },
  { label: "Awka", href: "/branches/awka" },
];

const rooms = [
  {
    id: "deluxe",
    name: "Deluxe",
    price: "₦70,000",
    image: "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692060/PA_Deluxe_sqsnbp.jpg",
    srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692060/PA_Deluxe_sqsnbp.jpg"),
    badge: { text: "Best Value", color: "primary" as const },
    description: "Comfortable deluxe room with modern amenities.",
    amenities: [
      { icon: MdKingBed, label: "King Bed" },
      { icon: MdDesk, label: "Work Desk" },
      { icon: MdPool, label: "Pool Access" },
    ],
  },
  {
    id: "alcove",
    name: "Alcove",
    price: "₦70,000",
    image: "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692040/PA_Alcove_lfxo9u.jpg",
    srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692040/PA_Alcove_lfxo9u.jpg"),
    description: "Spacious alcove room with sitting area.",
    amenities: [
      { icon: MdKingBed, label: "King Bed" },
      { icon: MdPool, label: "Pool Access" },
      { icon: MdDesk, label: "Work Desk" },
    ],
  },
  {
    id: "royal-alcove",
    name: "Royal Alcove",
    price: "₦75,000",
    image: "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692065/PA_Classic_Alcove_pemy6p.jpg",
    srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692065/PA_Classic_Alcove_pemy6p.jpg"),
    badge: { text: "Popular", color: "primary" as const },
    description: "Premium royal alcove suite.",
    amenities: [
      { icon: MdKingBed, label: "King Bed" },
      { icon: MdVisibility, label: "City View" },
      { icon: MdPool, label: "Pool Access" },
    ],
  },
  {
    id: "executive-suite",
    name: "Executive Suite",
    price: "₦150,000",
    image: "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692059/PA_Executive_mgldps.jpg",
    srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692059/PA_Executive_mgldps.jpg"),
    description: "Spacious executive suite with premium amenities.",
    amenities: [
      { icon: MdKingBed, label: "King Bed" },
      { icon: MdWork, label: "Work Desk" },
      { icon: MdBalcony, label: "Balcony" },
    ],
  },
  {
    id: "ambassadorial-suite",
    name: "Ambassadorial Suite",
    price: "₦160,000",
    image: "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692041/IMG_20220628_054302_pdgakm.jpg",
    srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692041/IMG_20220628_054302_pdgakm.jpg"),
    badge: { text: "Luxury", color: "gold" as const },
    description: "Luxury ambassadorial suite with exclusive amenities.",
    amenities: [
      { icon: MdKingBed, label: "King Bed" },
      { icon: MdBalcony, label: "Private Balcony" },
      { icon: MdPool, label: "Pool Access" },
    ],
  },
  {
    id: "presidential-suite",
    name: "Presidential Suite",
    price: "₦210,000",
    image: "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692009/Parktonian_Hotel_Awka_xckfw8.jpg",
    srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692009/Parktonian_Hotel_Awka_xckfw8.jpg"),
    badge: { text: "Ultimate Luxury", color: "gold" as const },
    description: "The ultimate presidential suite with all premium amenities.",
    amenities: [
      { icon: MdKingBed, label: "King Bed" },
      { icon: MdVisibility, label: "Panoramic View" },
      { icon: MdBalcony, label: "Private Balcony" },
    ],
  },
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

  const handleBookRoom = (roomId: string) => {
    console.log("Booking room:", roomId);
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
          title="The Grand Parktonian  <br/> Hotel Awka"
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
          attractions={[
            { icon: MdChurch, name: "Ekwueme Square", distance: "5 MIN DRIVE" },
            { icon: MdShoppingBag, name: "Eke Awka Market", distance: "8 MIN DRIVE" },
            { icon: MdLocalActivity, name: "UNIZIK", distance: "15 MIN DRIVE" },
            { icon: MdDirectionsCar, name: "Awka Secretariat", distance: "10 MIN DRIVE" },
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
        branchName="Parktonian Hotel Awka"
      />
    </Box>
  );
}

export const dynamic = "force-static";

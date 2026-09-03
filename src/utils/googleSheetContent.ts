import { getResponsiveSrcSet } from "./imageUtils";

export interface ContentAttraction {
  name: string;
  distance: string;
}

export interface FooterContent {
  copyright?: string;
  designText?: string;
  designUrl?: string;
}

export interface Room {
  id: string;
  name: string;
  price: string;
  image: string;
  srcSet: string;
  badge?: {
    text: string;
    color: 'primary' | 'gold';
  };
  description: string;
  amenities: Array<{ label: string }>;
}

export interface BranchContent {
  rooms: Room[];
  attractions: ContentAttraction[];
  footer: FooterContent;
}

const DEFAULT_BRANCH_CONTENT: Record<string, BranchContent> = {
  lekki: {
    rooms: [
      {
        id: "deluxe-room",
        name: "Deluxe Room",
        price: "₦120,000",
        image: "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629588/DSC00196_tbitbl.jpg",
        srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629588/DSC00196_tbitbl.jpg"),
        badge: { text: "Popular", color: "primary" },
        description: "Comfortable and elegant room with modern amenities, perfect for both business and leisure travelers. Rate with breakfast: ₦135,000",
        amenities: [
          { label: "King Bed" },
          { label: "Fast WiFi" },
          { label: "Work Desk" },
        ],
      },
      {
        id: "alcove-room",
        name: "Alcove Room",
        price: "₦140,000",
        image: "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629602/DSC00245_zetxwp.jpg",
        srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629602/DSC00245_zetxwp.jpg"),
        description: "Spacious alcove room featuring separate sitting area. Rate with breakfast: ₦155,000",
        amenities: [
          { label: "King Bed" },
          { label: "City View" },
          { label: "Work Desk" },
        ],
      },
      {
        id: "royal-alcove",
        name: "Royal Alcove",
        price: "₦150,000",
        image: "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629705/DSC00323_vqbjyw.jpg",
        srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629705/DSC00323_vqbjyw.jpg"),
        badge: { text: "Bestseller", color: "primary" },
        description: "Premium alcove suite with luxurious furnishings. Rate with breakfast: ₦165,000",
        amenities: [
          { label: "King Bed" },
          { label: "Work Desk" },
          { label: "Pool Access" },
        ],
      },
      {
        id: "double-room",
        name: "Double Room",
        price: "₦250,000",
        image: "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629522/DSC00236_ktf3pu.jpg",
        srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629522/DSC00236_ktf3pu.jpg"),
        description: "Spacious double room perfect for families or groups. Rate with breakfast: ₦265,000",
        amenities: [
          { label: "Twin Beds" },
          { label: "Balcony" },
          { label: "Pool Access" },
        ],
      },
      {
        id: "executive-suite",
        name: "Executive Suite",
        price: "₦250,000",
        image: "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629540/DSC00232_zhiuz8.jpg",
        srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769629540/DSC00232_zhiuz8.jpg"),
        badge: { text: "Ultra Luxury", color: "gold" },
        description: "Ultimate luxury suite with separate living area and premium amenities. Rate with breakfast: ₦265,000",
        amenities: [
          { label: "King Bed" },
          { label: "City View" },
          { label: "Private Balcony" },
        ],
      },
    ],
    attractions: [
      { name: "Nike Art Gallery", distance: "5 MIN DRIVE" },
      { name: "Elegushi Beach", distance: "8 MIN DRIVE" },
      { name: "The Palms Mall", distance: "10 MIN DRIVE" },
      { name: "Lekki-Ikoyi Bridge", distance: "15 MIN DRIVE" },
    ],
    footer: {},
  },
  ikate: {
    rooms: [
      {
        id: "deluxe",
        name: "Deluxe",
        price: "₦100,000",
        image: "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769690851/PI_Deluxe_fupxws.jpg",
        srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769690851/PI_Deluxe_fupxws.jpg"),
        badge: { text: "Best Value", color: "primary" },
        description: "Comfortable room with modern amenities. Rate with breakfast: ₦95,000",
        amenities: [
          { label: "King Bed" },
          { label: "Free WiFi" },
          { label: "Work Desk" },
        ],
      },
      {
        id: "alcove",
        name: "Alcove",
        price: "₦90,000",
        image: "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691596/PI_Alcove_el0weu.jpg",
        srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691596/PI_Alcove_el0weu.jpg"),
        description: "Spacious alcove room with sitting area. Rate with breakfast: ₦105,000",
        amenities: [
          { label: "King Bed" },
          { label: "City View" },
          { label: "High-Speed WiFi" },
        ],
      },
      {
        id: "executive",
        name: "Executive",
        price: "₦180,000",
        image: "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691603/PI_Executive_Suite_f0oorc.jpg",
        srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769691603/PI_Executive_Suite_f0oorc.jpg"),
        badge: { text: "Premium", color: "gold" },
        description: "Premium executive room with enhanced amenities. Rate with breakfast: ₦195,000",
        amenities: [
          { label: "Balcony" },
          { label: "Breakfast" },
          { label: "Concierge" },
        ],
      },
    ],
    attractions: [
      { name: "Genesis Cinemas", distance: "3 MIN DRIVE" },
      { name: "Circle Mall", distance: "5 MIN DRIVE" },
      { name: "Elegushi Beach", distance: "17 MIN DRIVE" },
      { name: "The Rock Cathedral", distance: "10 MIN DRIVE" },
    ],
    footer: {},
  },
  awka: {
    rooms: [
      {
        id: "deluxe",
        name: "Deluxe",
        price: "₦70,000",
        image: "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692060/PA_Deluxe_sqsnbp.jpg",
        srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692060/PA_Deluxe_sqsnbp.jpg"),
        badge: { text: "Best Value", color: "primary" },
        description: "Comfortable deluxe room with modern amenities. Rate with breakfast: ₦80,000",
        amenities: [
          { label: "King Bed" },
          { label: "Work Desk" },
          { label: "Pool Access" },
        ],
      },
      {
        id: "alcove",
        name: "Alcove",
        price: "₦70,000",
        image: "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692040/PA_Alcove_lfxo9u.jpg",
        srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692040/PA_Alcove_lfxo9u.jpg"),
        description: "Spacious alcove room with sitting area. Rate with breakfast: ₦80,000",
        amenities: [
          { label: "King Bed" },
          { label: "Pool Access" },
          { label: "Work Desk" },
        ],
      },
      {
        id: "royal-alcove",
        name: "Royal Alcove",
        price: "₦75,000",
        image: "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692065/PA_Classic_Alcove_pemy6p.jpg",
        srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692065/PA_Classic_Alcove_pemy6p.jpg"),
        badge: { text: "Popular", color: "primary" },
        description: "Premium royal alcove suite. Rate with breakfast: ₦85,000",
        amenities: [
          { label: "King Bed" },
          { label: "City View" },
          { label: "Pool Access" },
        ],
      },
      {
        id: "executive-suite",
        name: "Executive Suite",
        price: "₦150,000",
        image: "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692059/PA_Executive_mgldps.jpg",
        srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692059/PA_Executive_mgldps.jpg"),
        description: "Spacious executive suite with premium amenities. Rate with breakfast: ₦160,000",
        amenities: [
          { label: "King Bed" },
          { label: "Work Desk" },
          { label: "Balcony" },
        ],
      },
      {
        id: "ambassadorial-suite",
        name: "Ambassadorial Suite",
        price: "₦160,000",
        image: "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692041/IMG_20220628_054302_pdgakm.jpg",
        srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692041/IMG_20220628_054302_pdgakm.jpg"),
        badge: { text: "Luxury", color: "gold" },
        description: "Luxury ambassadorial suite with exclusive amenities. Rate with breakfast: ₦170,000",
        amenities: [
          { label: "King Bed" },
          { label: "Private Balcony" },
          { label: "Pool Access" },
        ],
      },
      {
        id: "presidential-suite",
        name: "Presidential Suite",
        price: "₦210,000",
        image: "https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692009/Parktonian_Hotel_Awka_xckfw8.jpg",
        srcSet: getResponsiveSrcSet("https://res.cloudinary.com/djmwqkcw5/image/upload/v1769692009/Parktonian_Hotel_Awka_xckfw8.jpg"),
        badge: { text: "Ultimate Luxury", color: "gold" },
        description: "The ultimate presidential suite with all premium amenities. Rate with breakfast: ₦220,000",
        amenities: [
          { label: "King Bed" },
          { label: "Panoramic View" },
          { label: "Private Balcony" },
        ],
      },
    ],
    attractions: [
      { name: "Ekwueme Square", distance: "5 MIN DRIVE" },
      { name: "Eke Awka Market", distance: "8 MIN DRIVE" },
      { name: "UNIZIK", distance: "15 MIN DRIVE" },
      { name: "Awka Secretariat", distance: "10 MIN DRIVE" },
    ],
    footer: {},
  },
};

function getFallbackContent(branch: string): BranchContent {
  const normalizedBranch = branch.toLowerCase().trim();
  const fallback = DEFAULT_BRANCH_CONTENT[normalizedBranch];
  if (fallback) {
    return fallback;
  }
  return { rooms: [], attractions: [], footer: {} };
}

export async function getBranchContentFromGoogleSheet(branch: string): Promise<BranchContent> {
  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const fallback = getFallbackContent(branch);

  if (!appsScriptUrl) {
    return fallback;
  }

  try {
    const url = `${appsScriptUrl}?branch=${encodeURIComponent(branch)}`;
    
    // Add timeout of 10 seconds
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(url, { 
      cache: "no-store",
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      }
    });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.error("[getBranchContentFromGoogleSheet] Response not ok:", response.statusText);
      return fallback;
    }

    const data: Partial<BranchContent> = await response.json();
    
    const rooms = data.rooms && data.rooms.length > 0 ? data.rooms : fallback.rooms;
    const attractions = data.attractions && data.attractions.length > 0 ? data.attractions : fallback.attractions;
    const footer = data.footer && Object.keys(data.footer).length > 0 ? data.footer : fallback.footer;

    return {
      rooms,
      attractions,
      footer,
    };
  } catch (error) {
    console.error("[getBranchContentFromGoogleSheet] Error fetching remote content:", error instanceof Error ? error.message : String(error));
    return fallback;
  }
}

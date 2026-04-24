import { IconType } from 'react-icons';
import {
  MdKingBed,
  MdWifi,
  MdWork,
  MdLocalBar,
  MdPool,
  MdBalcony,
  MdBed,
  MdVisibility,
  MdRoomService,
  MdFreeBreakfast,
  MdLocalParking,
  MdFitnessCenter,
} from 'react-icons/md';

const amenityIconMap: Record<string, IconType> = {
  'king bed': MdKingBed,
  'twin beds': MdBed,
  'work desk': MdWork,
  'free wifi': MdWifi,
  'high-speed wifi': MdWifi,
  'fast wifi': MdWifi,
  'wifi': MdWifi,
  'pool access': MdPool,
  'city view': MdVisibility,
  'panoramic view': MdVisibility,
  'balcony': MdBalcony,
  'private balcony': MdBalcony,
  'concierge': MdRoomService,
  'breakfast': MdFreeBreakfast,
  'local bar': MdLocalBar,
  'parking': MdLocalParking,
  'secure parking': MdLocalParking,
  'fitness center': MdFitnessCenter,
  'gym': MdFitnessCenter,
};

export function enrichAmenitiesWithIcons(
  amenities: Array<{ label: string }>
): Array<{ icon: IconType; label: string }> {
  return amenities.map((amenity) => ({
    icon: amenityIconMap[amenity.label.toLowerCase()] || MdKingBed, // Default to bed icon
    label: amenity.label,
  }));
}

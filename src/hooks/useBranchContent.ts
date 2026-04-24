"use client";

import { useQuery } from "@tanstack/react-query";
import type { BranchContent } from "@/utils/googleSheetContent";
import { enrichAmenitiesWithIcons } from "@/utils/amenityIconMapper";

const emptyContent: BranchContent = {
  rooms: [],
  attractions: [],
  footer: {},
};

async function fetchBranchContent(branch: string): Promise<BranchContent> {
  const response = await fetch(`/api/content/?branch=${encodeURIComponent(branch)}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch branch content: ${response.statusText}`);
  }

  const data: BranchContent = await response.json();
  
  // Enrich amenities with icons
  const enrichedRooms = (data.rooms ?? []).map(room => ({
    ...room,
    amenities: enrichAmenitiesWithIcons(room.amenities),
  }));
  
  return {
    rooms: enrichedRooms,
    attractions: data.attractions ?? [],
    footer: data.footer ?? {},
  };
}

export function useBranchContent(branch: string) {
  const { data: content = emptyContent, isLoading, error } = useQuery({
    queryKey: ["branchContent", branch],
    queryFn: () => fetchBranchContent(branch),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });

  return { content, isLoading, error };
}

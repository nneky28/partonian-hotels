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

const DEFAULT_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwFF0k1jERrdJJuEgdrYKRP-CH4JHFCxqxXtaj2M7NIDmRlNhJYfKUJq5UW2fpWGyh7/exec";

const EMPTY_CONTENT: BranchContent = {
  rooms: [],
  attractions: [],
  footer: {},
};

export async function getBranchContentFromGoogleSheet(branch: string): Promise<BranchContent> {
  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL || DEFAULT_APPS_SCRIPT_URL;

  try {
    const url = `${appsScriptUrl}?branch=${encodeURIComponent(branch)}`;

    // Add timeout of 10 seconds
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error("[getBranchContentFromGoogleSheet] Response not ok:", response.statusText);
      return EMPTY_CONTENT;
    }

    const data: Partial<BranchContent> = await response.json();

    const rooms = (data.rooms ?? []).map((room) => ({
      ...room,
      srcSet: room.image ? getResponsiveSrcSet(room.image) : room.srcSet || "",
    }));
    const attractions = data.attractions ?? [];
    const footer = data.footer ?? {};

    return {
      rooms,
      attractions,
      footer,
    };
  } catch (error) {
    console.error(
      "[getBranchContentFromGoogleSheet] Error fetching remote content:",
      error instanceof Error ? error.message : String(error)
    );
    return EMPTY_CONTENT;
  }
}


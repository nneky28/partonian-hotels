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

export async function getBranchContentFromGoogleSheet(branch: string): Promise<BranchContent> {
  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

  console.log("[getBranchContentFromGoogleSheet] URL:", appsScriptUrl);
  console.log("[getBranchContentFromGoogleSheet] Branch:", branch);

  if (!appsScriptUrl) {
    console.error("[getBranchContentFromGoogleSheet] GOOGLE_APPS_SCRIPT_URL is not set");
    return { rooms: [], attractions: [], footer: {} };
  }

  try {
    const url = `${appsScriptUrl}?branch=${encodeURIComponent(branch)}`;
    console.log("[getBranchContentFromGoogleSheet] Fetching:", url);
    
    // Add timeout of 30 seconds
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    
    const response = await fetch(url, { 
      cache: "no-store",
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      }
    });
    clearTimeout(timeoutId);
    
    console.log("[getBranchContentFromGoogleSheet] Response status:", response.status);
    
    if (!response.ok) {
      console.error("[getBranchContentFromGoogleSheet] Response not ok:", response.statusText);
      return { rooms: [], attractions: [], footer: {} };
    }

    const data: BranchContent = await response.json();
    console.log("[getBranchContentFromGoogleSheet] Data received - Rooms:", data.rooms?.length, "Attractions:", data.attractions?.length);
    
    return {
      rooms: data.rooms ?? [],
      attractions: data.attractions ?? [],
      footer: data.footer ?? {},
    };
  } catch (error) {
    console.error("[getBranchContentFromGoogleSheet] Error:", error instanceof Error ? error.message : String(error));
    return { rooms: [], attractions: [], footer: {} };
  }
}

export interface Branch {
  id: string;
  name: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface Amenity {
  icon: string;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  description: Array<{label:string, tab:string}>
  // links: Array<{ label: string; href: string }>;
}

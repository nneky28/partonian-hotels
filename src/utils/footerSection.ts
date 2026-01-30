import { FooterSection } from '@/types';

export const footerSections: FooterSection[] = [
  {
    title: 'Our Branches',
    links: [
      { label: 'Lekki Phase 1', href: '/branches/lekki' },
      { label: 'Ikate Residence', href: '/branches/ikate' },
      { label: 'Awka Heights', href: '/branches/awka' },
    ],
  },
  {
    title: 'Experience',
    links: [
      { label: 'Fine Dining', href: '#dining' },
      { label: 'Wellness Spa', href: '#spa' },
      { label: 'Concierge', href: '#concierge' },
    ],
  },
];

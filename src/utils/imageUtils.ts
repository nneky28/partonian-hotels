/**
 * Generate responsive Cloudinary image URLs
 * @param url - Original Cloudinary URL
 * @param width - Target width for the image
 * @returns Transformed Cloudinary URL
 */
export const getCloudinaryUrl = (url: string, width?: number) => {
  if (!url.includes('cloudinary.com')) return url;
  
  const transformation = width 
    ? `w_${width},c_limit,q_auto,f_auto`
    : 'w_auto,c_limit,q_auto,f_auto';
  
  return url.replace('/upload/', `/upload/${transformation}/`);
};

/**
 * Generate srcSet for responsive images
 * @param url - Original Cloudinary URL
 * @returns srcSet string with multiple sizes
 */
export const getResponsiveSrcSet = (url: string) => {
  if (!url.includes('cloudinary.com')) return url;
  
  const sizes = [400, 800, 1200, 1600, 2000];
  
  return sizes
    .map(size => `${getCloudinaryUrl(url, size)} ${size}w`)
    .join(', ');
};

/**
 * Generate sizes attribute based on breakpoints
 */
export const getImageSizes = (type: 'hero' | 'room' | 'branch' | 'slider' | 'logo' = 'hero') => {
  const sizesMap = {
    hero: '100vw',
    room: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    branch: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    slider: '100vw',
    logo: '(max-width: 768px) 80px, 150px',
  };
  
  return sizesMap[type];
};

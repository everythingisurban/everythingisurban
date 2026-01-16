import type { GalleryItem } from '../../types';

// Automatically import all gallery item files
const modules = import.meta.glob<{ data: GalleryItem }>('./*.ts', { eager: true });

// Extract and export gallery items array
export const galleryItems: GalleryItem[] = Object.entries(modules)
  .filter(([path]) => !path.includes('index.ts')) // Exclude this index file
  .map(([_, module]) => module.data)
  .filter((item): item is GalleryItem => item !== undefined);

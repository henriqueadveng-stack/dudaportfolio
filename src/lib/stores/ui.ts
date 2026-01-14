import { writable } from 'svelte/store';

// Menu mobile state
export const mobileMenuOpen = writable(false);

// Video modal state
export const videoModal = writable<{
  open: boolean;
  src: string;
  title: string;
  youtubeId?: string;
}>({
  open: false,
  src: '',
  title: '',
  youtubeId: undefined,
});

// Lightbox state
export const lightbox = writable<{
  open: boolean;
  images: Array<{ src: string; alt: string }>;
  currentIndex: number;
}>({
  open: false,
  images: [],
  currentIndex: 0,
});

// Header scroll state
export const headerScrolled = writable(false);

// Actions
export function openVideoModal(src: string, title: string, youtubeId?: string) {
  videoModal.set({ open: true, src, title, youtubeId });
  document.body.style.overflow = 'hidden';
}

export function closeVideoModal() {
  videoModal.set({ open: false, src: '', title: '', youtubeId: undefined });
  document.body.style.overflow = '';
}

export function openLightbox(images: Array<{ src: string; alt: string }>, startIndex = 0) {
  lightbox.set({ open: true, images, currentIndex: startIndex });
  document.body.style.overflow = 'hidden';
}

export function closeLightbox() {
  lightbox.set({ open: false, images: [], currentIndex: 0 });
  document.body.style.overflow = '';
}

export function nextImage() {
  lightbox.update((state) => ({
    ...state,
    currentIndex: (state.currentIndex + 1) % state.images.length,
  }));
}

export function prevImage() {
  lightbox.update((state) => ({
    ...state,
    currentIndex: state.currentIndex === 0 ? state.images.length - 1 : state.currentIndex - 1,
  }));
}

export function toggleMobileMenu() {
  mobileMenuOpen.update((open) => {
    const newState = !open;
    document.body.style.overflow = newState ? 'hidden' : '';
    return newState;
  });
}

export function closeMobileMenu() {
  mobileMenuOpen.set(false);
  document.body.style.overflow = '';
}

// Site preview modal state
import type { Site } from '$lib/data/sites';

export const sitePreview = writable<{
  open: boolean;
  site: Site | null;
  sites: Site[];
  currentIndex: number;
  device: 'desktop' | 'tablet' | 'mobile';
}>({
  open: false,
  site: null,
  sites: [],
  currentIndex: 0,
  device: 'desktop',
});

export function openSitePreview(site: Site, allSites: Site[], index: number) {
  sitePreview.set({ open: true, site, sites: allSites, currentIndex: index, device: 'desktop' });
  document.body.style.overflow = 'hidden';
}

export function closeSitePreview() {
  sitePreview.set({ open: false, site: null, sites: [], currentIndex: 0, device: 'desktop' });
  document.body.style.overflow = '';
}

export function setPreviewDevice(device: 'desktop' | 'tablet' | 'mobile') {
  sitePreview.update((state) => ({ ...state, device }));
}

export function nextSite() {
  sitePreview.update((state) => {
    const newIndex = (state.currentIndex + 1) % state.sites.length;
    return { ...state, currentIndex: newIndex, site: state.sites[newIndex] };
  });
}

export function prevSite() {
  sitePreview.update((state) => {
    const newIndex = state.currentIndex === 0 ? state.sites.length - 1 : state.currentIndex - 1;
    return { ...state, currentIndex: newIndex, site: state.sites[newIndex] };
  });
}

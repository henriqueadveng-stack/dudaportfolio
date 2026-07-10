export interface Video {
  id: string;
  src: string;
  thumbnail?: string;
  title: string;
  description?: string;
  category: 'captados' | 'editados' | 'longos';
  youtubeId?: string; // For YouTube hosted videos
}

// Captados e Editados - vídeos produzidos do zero pela DUDA
export const videosCaptados: Video[] = [
  {
    id: 'reels-institucional-chamativo',
    src: '',
    youtubeId: 'Vrvk6fMnJIU',
    thumbnail: 'https://img.youtube.com/vi/Vrvk6fMnJIU/maxresdefault.jpg',
    title: 'Institucional - Chamativo',
    description: 'Reels institucional estilo chamativo',
    category: 'captados',
  },
  {
    id: 'reels-banda-institucional',
    src: '/portfolio/videos/Reels - Banda - Institucional.mp4',
    thumbnail: '/portfolio/videos/thumbnails/banda-institucional.jpg',
    title: 'Banda - Institucional',
    description: 'Vídeo institucional para banda',
    category: 'captados',
  },
  {
    id: 'reels-duda-institucional',
    src: '',
    youtubeId: 'uCyXFkwL8e0',
    thumbnail: 'https://img.youtube.com/vi/uCyXFkwL8e0/maxresdefault.jpg',
    title: 'DUDA - Institucional',
    description: 'Vídeo institucional DUDA Design Studio',
    category: 'captados',
  },
  {
    id: 'reels-loja-suco-institucional',
    src: '',
    youtubeId: 'ZV-_w-pA2Sk',
    thumbnail: 'https://img.youtube.com/vi/ZV-_w-pA2Sk/maxresdefault.jpg',
    title: 'Loja de Suco - Institucional',
    description: 'Vídeo institucional para loja de sucos',
    category: 'captados',
  },
  {
    id: 'reels-short-McRnxZ0r2rg',
    src: '',
    youtubeId: 'McRnxZ0r2rg',
    thumbnail: 'https://img.youtube.com/vi/McRnxZ0r2rg/maxresdefault.jpg',
    title: 'Short - Captado e Editado',
    description: 'Short captado e editado pela DUDA',
    category: 'captados',
  },
  {
    id: 'reels-short-EZlOEPMgh2g',
    src: '',
    youtubeId: 'EZlOEPMgh2g',
    thumbnail: 'https://img.youtube.com/vi/EZlOEPMgh2g/maxresdefault.jpg',
    title: 'Short - Captado e Editado',
    description: 'Short captado e editado pela DUDA',
    category: 'captados',
  },
  {
    id: 'reels-short-56SFi7AEmA0',
    src: '',
    youtubeId: '56SFi7AEmA0',
    thumbnail: 'https://img.youtube.com/vi/56SFi7AEmA0/maxresdefault.jpg',
    title: 'Short - Captado e Editado',
    description: 'Short captado e editado pela DUDA',
    category: 'captados',
  },
];

// Editados - vídeos apenas editados pela DUDA
export const videosEditados: Video[] = [
  {
    id: 'wallita-atma-null-lyric',
    src: '',
    youtubeId: 'OqDDSTlLU7Q',
    thumbnail: 'https://img.youtube.com/vi/OqDDSTlLU7Q/maxresdefault.jpg',
    title: 'wallita – atma Null [Lyric Video]',
    description: 'Lyric video para wallita',
    category: 'editados',
  },
  {
    id: 'enjoy-the-sickness-visualizer',
    src: '',
    youtubeId: 'L_jeGZMItcc',
    thumbnail: 'https://img.youtube.com/vi/L_jeGZMItcc/maxresdefault.jpg',
    title: 'Enjoy The Sickness – Hang Them All (Visualizer)',
    description: 'Visualizer para Enjoy The Sickness',
    category: 'editados',
  },
  {
    id: 'reels-bandas-divulgacao',
    src: '',
    youtubeId: 'zz7jdkI7Wao',
    thumbnail: 'https://img.youtube.com/vi/zz7jdkI7Wao/maxresdefault.jpg',
    title: 'Bandas - Divulgação',
    description: 'Reels de divulgação para bandas',
    category: 'editados',
  },
  {
    id: 'reels-loja-roupas-meme',
    src: '',
    youtubeId: '9eFcbVbS4oQ',
    thumbnail: 'https://img.youtube.com/vi/9eFcbVbS4oQ/maxresdefault.jpg',
    title: 'Loja de Roupas - Meme',
    description: 'Reels estilo meme para loja de roupas',
    category: 'editados',
  },
  {
    id: 'reels-duda-meme',
    src: '',
    youtubeId: 'Oru8cZmyk7A',
    thumbnail: 'https://img.youtube.com/vi/Oru8cZmyk7A/maxresdefault.jpg',
    title: 'DUDA - Meme',
    description: 'Reels estilo meme DUDA',
    category: 'editados',
  },
  {
    id: 'reels-banda-meme',
    src: '',
    youtubeId: 'HkSvuUW91U4',
    thumbnail: 'https://img.youtube.com/vi/HkSvuUW91U4/maxresdefault.jpg',
    title: 'Banda - Meme',
    description: 'Reels estilo meme para banda',
    category: 'editados',
  },
  {
    id: 'rh-motion-institucional',
    src: '',
    youtubeId: 'LC7XJ1SnKT4',
    thumbnail: 'https://img.youtube.com/vi/LC7XJ1SnKT4/maxresdefault.jpg',
    title: 'RH Motion - Institucional',
    description: 'Vídeo institucional RH Motion',
    category: 'editados',
  },
  {
    id: 'video-clipe-4PoEB4fZyz8',
    src: '',
    youtubeId: '4PoEB4fZyz8',
    thumbnail: 'https://img.youtube.com/vi/4PoEB4fZyz8/maxresdefault.jpg',
    title: 'Vídeo Clipe',
    description: 'Vídeo clipe editado pela DUDA',
    category: 'editados',
  },
  {
    id: 'reels-short-56SFi7AEmA0-editados',
    src: '',
    youtubeId: '56SFi7AEmA0',
    thumbnail: 'https://img.youtube.com/vi/56SFi7AEmA0/maxresdefault.jpg',
    title: 'Short - Editado',
    description: 'Short editado pela DUDA',
    category: 'editados',
  },
];

// Vídeos Longos
export const videosLongos: Video[] = [
  {
    id: 'video-longo-Vi6gWsFviA',
    src: '',
    youtubeId: '-Vi6gWsFviA',
    thumbnail: 'https://img.youtube.com/vi/-Vi6gWsFviA/maxresdefault.jpg',
    title: 'Video Longo',
    description: 'Video longo editado pela DUDA',
    category: 'longos',
  },
  {
    id: 'video-longo-ICJOLzJA_Yw',
    src: '',
    youtubeId: 'ICJOLzJA_Yw',
    thumbnail: 'https://img.youtube.com/vi/ICJOLzJA_Yw/maxresdefault.jpg',
    title: 'Video Longo',
    description: 'Video longo editado pela DUDA',
    category: 'longos',
  },
];

export const videos: Video[] = [...videosCaptados, ...videosEditados, ...videosLongos];

export interface Video {
  id: string;
  src: string;
  thumbnail?: string;
  title: string;
  description?: string;
  category: 'captados' | 'editados';
  youtubeId?: string; // For YouTube hosted videos
}

// Captados e Editados - vídeos produzidos do zero pela DUDA
export const videosCaptados: Video[] = [
  {
    id: 'reels-duda-institucional',
    src: '/portfolio/videos/Reels - DUDA - Institucional.mp4',
    title: 'DUDA - Institucional',
    description: 'Vídeo institucional DUDA Design Studio',
    category: 'captados',
  },
  {
    id: 'reels-banda-institucional',
    src: '/portfolio/videos/Reels - Banda - Institucional.mp4',
    title: 'Banda - Institucional',
    description: 'Vídeo institucional para banda',
    category: 'captados',
  },
  {
    id: 'reels-loja-suco-institucional',
    src: '/portfolio/videos/Reels - Loja de Suco - Institucional.mp4',
    title: 'Loja de Suco - Institucional',
    description: 'Vídeo institucional para loja de sucos',
    category: 'captados',
  },
];

// Editados - vídeos apenas editados pela DUDA
export const videosEditados: Video[] = [
  {
    id: 'clipe-banda-lyric',
    src: '', // YouTube hosted
    youtubeId: 'OqDDSTlLU7Q',
    thumbnail: 'https://img.youtube.com/vi/OqDDSTlLU7Q/maxresdefault.jpg',
    title: 'Banda - Lyric Video',
    description: 'Clipe com letra para banda',
    category: 'editados',
  },
  {
    id: 'clipe-banda-motion',
    src: '', // YouTube hosted
    youtubeId: 'L_jeGZMItcc',
    thumbnail: 'https://img.youtube.com/vi/L_jeGZMItcc/maxresdefault.jpg',
    title: 'Banda - Motion',
    description: 'Clipe com motion graphics',
    category: 'editados',
  },
  {
    id: 'reels-banda-meme',
    src: '/portfolio/videos/Reels - Banda - Meme.mp4',
    title: 'Banda - Meme',
    description: 'Reels estilo meme para banda',
    category: 'editados',
  },
  {
    id: 'reels-bandas-divulgacao',
    src: '/portfolio/videos/Reels - Bandas - Divulgação.mp4',
    title: 'Bandas - Divulgação',
    description: 'Reels de divulgação para bandas',
    category: 'editados',
  },
  {
    id: 'reels-duda-meme',
    src: '/portfolio/videos/Reels - DUDA - Meme.mp4',
    title: 'DUDA - Meme',
    description: 'Reels estilo meme DUDA',
    category: 'editados',
  },
  {
    id: 'reels-loja-roupas-meme',
    src: '/portfolio/videos/Reels - Loja de Roupas - Meme.mp4',
    title: 'Loja de Roupas - Meme',
    description: 'Reels estilo meme para loja de roupas',
    category: 'editados',
  },
];

// Todos os vídeos combinados
export const videos: Video[] = [...videosCaptados, ...videosEditados];

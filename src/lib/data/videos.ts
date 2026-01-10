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
];

// Todos os vídeos combinados
export const videos: Video[] = [...videosCaptados, ...videosEditados];

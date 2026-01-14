export interface Site {
  id: string;
  title: string;
  description?: string;
  url: string;
  client?: string;
  category: 'landing-page' | 'ecommerce' | 'institucional' | 'portfolio' | 'outros';
  technologies?: string[];
  featured?: boolean;
  year?: number;
}

export const sites: Site[] = [
  {
    id: 'apeh-saude',
    title: 'APEH Saúde',
    description: 'Site institucional para clínica de saúde com agendamento online.',
    url: 'https://www.apehsaude.com.br/',
    client: 'APEH Saúde',
    category: 'institucional',
    featured: true,
  },
  {
    id: 'polaris-dev',
    title: 'Polaris Dev',
    description: 'Portfólio de desenvolvimento de software com design moderno.',
    url: 'https://polaris.dev.br/',
    client: 'Polaris',
    category: 'portfolio',
    featured: true,
  },
  {
    id: 'duda-design-studio',
    title: 'Duda Design Studio',
    description: 'Portfólio profissional de design e edição de vídeos.',
    url: 'https://dudadesignstudio.vercel.app/',
    client: 'Duda Design Studio',
    category: 'portfolio',
    featured: true,
  },
  {
    id: 'wallita',
    title: 'Wallita',
    description: 'Landing page moderna e minimalista.',
    url: 'https://wallita.vercel.app/',
    client: 'Wallita',
    category: 'landing-page',
    featured: true,
  },
];

<script lang="ts">
  import { sites } from '$lib/data/sites';
  import SiteCard from '$lib/components/SiteCard.svelte';
  import ServiceCard from '$lib/components/ServiceCard.svelte';
  import AnimateOnScroll from '$lib/components/AnimateOnScroll.svelte';

  const services = [
    {
      icon: 'globe',
      title: 'Landing Pages',
      description: 'Páginas de alta conversão para capturar leads e vendas.',
    },
    {
      icon: 'shop',
      title: 'E-commerce',
      description: 'Lojas virtuais completas com carrinho e checkout.',
    },
    {
      icon: 'building',
      title: 'Sites Institucionais',
      description: 'Presença online profissional para sua empresa.',
    },
    {
      icon: 'palette',
      title: 'Portfólios',
      description: 'Mostre seu trabalho de forma elegante e impactante.',
    },
    {
      icon: 'responsive',
      title: 'Design Responsivo',
      description: 'Sites que funcionam perfeitamente em qualquer dispositivo.',
    },
    {
      icon: 'sparkles',
      title: 'Personalizado',
      description: 'Soluções sob medida para suas necessidades específicas.',
    },
  ];
</script>

<svelte:head>
  <title>Portfólio de Sites | Duda Design Studio</title>
  <meta name="description" content="Confira nossos projetos de sites: landing pages, e-commerce, sites institucionais e portfólios." />
</svelte:head>

<!-- Hero Section -->
<section class="pt-20 sm:pt-28 md:pt-36 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6">
  <div class="container mx-auto max-w-6xl text-center">
    <!-- Title -->
    <AnimateOnScroll animation="fade-down">
      <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-liber mb-4 sm:mb-6">
        <span class="text-duda-verde">Sites</span>
      </h1>
      <p class="text-duda-cinza-claro text-sm sm:text-base md:text-lg max-w-xl mx-auto">
        Criamos sites modernos, responsivos e otimizados para conversão
      </p>
    </AnimateOnScroll>
  </div>
</section>

<!-- Sites Grid -->
<section class="py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6">
  <div class="container mx-auto max-w-6xl">
    {#if sites.length > 0}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {#each sites as site, i}
          <AnimateOnScroll animation="fade-up" delay={Math.min((i % 3) * 100, 300)}>
            <SiteCard {site} allSites={sites} index={i} />
          </AnimateOnScroll>
        {/each}
      </div>
    {:else}
      <!-- Empty State -->
      <AnimateOnScroll animation="fade-up">
        <div class="glass-strong p-8 sm:p-12 text-center max-w-2xl mx-auto">
          <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-duda-verde/10 rounded-2xl flex items-center justify-center">
            <svg class="w-8 h-8 sm:w-10 sm:h-10 text-duda-verde" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <h2 class="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Em breve novos projetos!
          </h2>
          <p class="text-duda-cinza-claro text-sm sm:text-base mb-6">
            Estamos preparando nosso portfólio de sites. Entre em contato para conhecer nossos trabalhos!
          </p>
          <a
            href="https://wa.me/5545999445919"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary inline-flex items-center gap-2 px-6 py-3"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Falar sobre meu projeto
          </a>
        </div>
      </AnimateOnScroll>
    {/if}
  </div>
</section>

<!-- Services Section -->
<section class="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-transparent via-duda-cinza/20 to-transparent">
  <div class="container mx-auto max-w-6xl">
    <AnimateOnScroll animation="fade-up">
      <div class="text-center mb-8 sm:mb-12">
        <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4">
          O que <span class="text-duda-verde">desenvolvemos</span>
        </h2>
        <p class="text-duda-cinza-claro text-sm sm:text-base max-w-xl mx-auto px-4">
          Soluções web completas para sua presença digital
        </p>
      </div>
    </AnimateOnScroll>

    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
      {#each services as service, i}
        <AnimateOnScroll animation="fade-up" delay={Math.min(i * 50, 200)}>
          <ServiceCard {...service} />
        </AnimateOnScroll>
      {/each}
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="py-12 sm:py-16 md:py-24 px-4 sm:px-6">
  <div class="container mx-auto max-w-4xl">
    <AnimateOnScroll animation="scale-in">
      <div class="glass-strong p-6 sm:p-8 md:p-12 text-center">
        <h2 class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4">
          Precisa de um site profissional?
        </h2>
        <p class="text-duda-cinza-claro text-sm sm:text-base mb-6 sm:mb-8 max-w-lg mx-auto">
          Vamos criar juntos um site que representa sua marca e converte visitantes em clientes.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href="https://wa.me/5545999445919"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto text-sm sm:text-base"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chamar no WhatsApp
          </a>
          <a
            href="https://www.instagram.com/designstudioduda/"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto text-sm sm:text-base"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Ver Instagram
          </a>
        </div>
      </div>
    </AnimateOnScroll>
  </div>
</section>

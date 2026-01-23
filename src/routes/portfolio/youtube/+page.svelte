<script lang="ts">
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import { openLightbox } from '$lib/stores/ui';
  import Lightbox from '$lib/components/Lightbox.svelte';
  import AnimateOnScroll from '$lib/components/AnimateOnScroll.svelte';

  // Assets - Capas de Canal (aspect 6:1)
  const capas = [
    { src: '/thumbs/capas/capa_1.png', alt: 'Capa Roberto Plank' },
    { src: '/thumbs/capas/capa_2.jpg', alt: 'Capa Enjoy the Sickness' },
    { src: '/thumbs/capas/capa_3.jpg', alt: 'Capa Wallita' },
    { src: '/thumbs/capas/capa_4.png', alt: 'Capa de Canal 4' },
    { src: '/thumbs/capas/capa_5.png', alt: 'Capa de Canal 5' },
  ];

  // Assets - Thumbnails (aspect 16:9)
  const thumbs = [
    { src: '/thumbs/thumbs/thumb_1.png', alt: 'Thumbnail Doenças Silenciosas' },
    { src: '/thumbs/thumbs/thumb_2.png', alt: 'Thumbnail Dor Crônica' },
    { src: '/thumbs/thumbs/thumb_3.png', alt: 'Thumbnail Artroplastia' },
    { src: '/thumbs/thumbs/thumb_4.png', alt: 'Thumbnail Pierce the Veil' },
    { src: '/thumbs/thumbs/thumb_5.png', alt: 'Thumbnail Blefaroplastia' },
    { src: '/thumbs/thumbs/thumb_6.png', alt: 'Thumbnail 6' },
    { src: '/thumbs/thumbs/thumb_7.png', alt: 'Thumbnail 7' },
  ];

  // YouTube Tabs
  const tabs = ['HOME', 'VIDEOS', 'SHORTS', 'PLAYLISTS', 'COMMUNITY'];
  let activeTab = $state('HOME');

  // Embla Carousel - Capas
  let capasEmblaApi = $state<any>(null);
  let currentCapaIndex = $state(0);

  function onCapasInit(event: CustomEvent) {
    capasEmblaApi = event.detail;
    capasEmblaApi.on('select', () => {
      currentCapaIndex = capasEmblaApi.selectedScrollSnap();
    });
  }

  const capasOptions = {
    loop: true,
    align: 'center' as const,
    skipSnaps: false,
  };

  // Embla Carousel - Thumbs
  let thumbsEmblaApi = $state<any>(null);
  let currentThumbIndex = $state(0);

  function onThumbsInit(event: CustomEvent) {
    thumbsEmblaApi = event.detail;
    thumbsEmblaApi.on('select', () => {
      currentThumbIndex = thumbsEmblaApi.selectedScrollSnap();
    });
  }

  const thumbsOptions = {
    loop: true,
    align: 'center' as const,
    slidesToScroll: 1,
    containScroll: false,
  };

  // Navigation functions
  function prevCapa() {
    capasEmblaApi?.scrollPrev();
  }

  function nextCapa() {
    capasEmblaApi?.scrollNext();
  }

  function goToCapa(index: number) {
    capasEmblaApi?.scrollTo(index);
  }

  function prevThumb() {
    thumbsEmblaApi?.scrollPrev();
  }

  function nextThumb() {
    thumbsEmblaApi?.scrollNext();
  }

  // Lightbox handlers
  function openCapaLightbox(index: number) {
    openLightbox(capas, index);
  }

  function openThumbLightbox(index: number) {
    openLightbox(thumbs, index);
  }

  // Calculate thumb position relative to center for visual effects
  function getThumbPosition(index: number): 'center' | 'adjacent' | 'far' {
    const diff = index - currentThumbIndex;
    const total = thumbs.length;

    let normalizedDiff = diff;
    if (diff > total / 2) normalizedDiff = diff - total;
    if (diff < -total / 2) normalizedDiff = diff + total;

    if (normalizedDiff === 0) return 'center';
    if (Math.abs(normalizedDiff) === 1) return 'adjacent';
    return 'far';
  }
</script>

<svelte:head>
  <title>Thumbs e Capas YouTube | DUDA Design Studio</title>
  <meta name="description" content="Portfólio de thumbnails e capas de canal para YouTube. Design profissional que aumenta cliques e engajamento." />
</svelte:head>

<!-- Hero Section -->
<section class="pt-20 sm:pt-28 md:pt-36 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6">
  <div class="container mx-auto max-w-6xl text-center">
    <!-- Title Image -->
    <AnimateOnScroll animation="fade-down">
      <img
        src="/marca/TITULO_YOUTUBE.png"
        alt="Portfólio YouTube"
        class="h-16 sm:h-20 md:h-28 lg:h-32 w-auto mx-auto mb-4 sm:mb-6"
      />
    </AnimateOnScroll>
  </div>
</section>

<main class="min-h-screen pb-16">

  <!-- YouTube Mockup Container -->
  <section class="container mx-auto px-2 sm:px-4 lg:px-6 mb-16">
    <AnimateOnScroll animation="fade-up">
      <div class="youtube-mockup bg-[#f5f5f5] rounded-xl overflow-hidden shadow-2xl max-w-6xl mx-auto">

        <!-- YouTube Header -->
        <div class="bg-[#f5f5f5] px-4 py-2 flex items-center justify-between border-b border-gray-300">
          <!-- YouTube Logo -->
          <div class="flex items-center gap-1">
            <svg class="w-8 h-8 text-red-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
            <span class="text-xl font-semibold text-gray-900 hidden sm:inline">YouTube</span>
            <span class="text-[10px] text-gray-500 align-super hidden sm:inline">BR</span>
          </div>

          <!-- Search Bar -->
          <div class="flex-1 max-w-md mx-4 hidden sm:block">
            <div class="flex">
              <input
                type="text"
                placeholder="Search"
                class="flex-1 px-4 py-1.5 border border-gray-300 rounded-l-full text-sm text-gray-700 bg-[#f5f5f5] focus:outline-none focus:border-blue-500"
                disabled
              />
              <button class="px-5 py-1.5 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200" aria-label="Buscar">
                <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Sign In -->
          <button class="flex items-center gap-2 px-3 py-1.5 border border-blue-500 text-blue-500 rounded-full text-sm font-medium hover:bg-blue-50">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span class="hidden sm:inline">Sign in</span>
          </button>
        </div>

        <!-- Banner/Capa Carousel -->
        <div class="relative w-full group" style="aspect-ratio: 6.2/1;">
          <div
            class="embla h-full overflow-hidden"
            use:emblaCarouselSvelte={{ options: capasOptions }}
            onemblaInit={onCapasInit}
          >
            <div class="embla__container flex h-full">
              {#each capas as capa, i}
                <div class="embla__slide flex-[0_0_100%] min-w-0 h-full">
                  <button
                    onclick={() => openCapaLightbox(i)}
                    class="w-full h-full block relative cursor-pointer"
                    aria-label="Ver {capa.alt} em tamanho maior"
                  >
                    <img
                      src={capa.src}
                      alt={capa.alt}
                      class="w-full h-full object-cover"
                      loading={i === 0 ? 'eager' : 'lazy'}
                    />
                    <!-- Hover overlay -->
                    <div class="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                      <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                        <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
              {/each}
            </div>
          </div>

          <!-- Banner Navigation Arrows - Always visible on mobile, hover on desktop -->
          <button
            onclick={prevCapa}
            class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300 flex items-center justify-center opacity-70 sm:opacity-0 sm:group-hover:opacity-100"
            aria-label="Capa anterior"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onclick={nextCapa}
            class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300 flex items-center justify-center opacity-70 sm:opacity-0 sm:group-hover:opacity-100"
            aria-label="Próxima capa"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Dots Indicator -->
          <div class="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
            {#each capas as _, i}
              <button
                onclick={() => goToCapa(i)}
                class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 {i === currentCapaIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'}"
                aria-label="Ir para capa {i + 1}"
              ></button>
            {/each}
          </div>
        </div>

        <!-- Channel Info Section -->
        <div class="bg-[#f5f5f5] px-4 sm:px-6 py-4 sm:py-6">
          <div class="flex items-start gap-4 sm:gap-6">
            <!-- Avatar -->
            <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                src="/marca/Verde.png"
                alt="DUDA Design Studio"
                class="w-12 h-12 sm:w-14 sm:h-14 object-contain"
              />
            </div>

            <!-- Channel Info -->
            <div class="flex-1 min-w-0">
              <h2 class="text-lg sm:text-xl font-semibold text-gray-900">Meu portfólio</h2>
              <p class="text-xs sm:text-sm text-gray-600">@DUDA DESIGN STUDIO · 1.74K subscribers · 108 videos</p>
              <p class="text-xs sm:text-sm text-gray-500 mt-1 hidden sm:block">Welcome to my channel</p>
            </div>

            <!-- Subscribe Button -->
            <button class="flex-shrink-0 px-4 sm:px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        <!-- YouTube Tabs -->
        <div class="bg-[#f5f5f5] border-b border-gray-300">
          <div class="flex items-center gap-1 px-4 sm:px-6 overflow-x-auto hide-scrollbar">
            {#each tabs as tab}
              <button
                onclick={() => activeTab = tab}
                class="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-[1px] {activeTab === tab ? 'text-gray-900 border-gray-900' : 'text-gray-600 border-transparent hover:text-gray-900'}"
              >
                {tab}
              </button>
            {/each}
            <button class="p-3 text-gray-600 hover:text-gray-900 ml-auto" aria-label="Buscar no canal">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Thumbnails Section -->
        <div id="thumbs" class="bg-[#ebebeb] px-4 sm:px-6 py-6">
          <!-- Section Header -->
          <div class="flex items-center gap-2 sm:gap-3 mb-4">
            <h3 class="text-sm sm:text-base font-semibold text-gray-900">PORTFÓLIO DE THUMBS</h3>
            <span class="hidden sm:inline text-xs sm:text-sm text-gray-500">- passe para o lado para ver mais :)</span>
            <button class="flex items-center gap-1 ml-auto text-xs sm:text-sm text-gray-700 hover:text-gray-900">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Play all
            </button>
          </div>

          <!-- Thumbnails Carousel -->
          <div class="relative">
            <div
              class="embla-thumbs overflow-hidden py-4"
              use:emblaCarouselSvelte={{ options: thumbsOptions }}
              onemblaInit={onThumbsInit}
            >
              <div class="embla__container flex items-center">
                {#each thumbs as thumb, i}
                  {@const position = getThumbPosition(i)}
                  <div
                    class="embla__slide flex-[0_0_70%] sm:flex-[0_0_45%] lg:flex-[0_0_33.333%] min-w-0 px-2 transition-all duration-500 ease-out thumb-slide"
                    class:thumb-center={position === 'center'}
                    class:thumb-adjacent={position === 'adjacent'}
                    class:thumb-far={position === 'far'}
                  >
                    <button
                      onclick={() => openThumbLightbox(i)}
                      class="w-full block relative group cursor-pointer overflow-hidden rounded-xl transition-all duration-300 {position === 'center' ? 'thumb-center-shadow' : ''}"
                      aria-label="Ver {thumb.alt} em tamanho maior"
                    >
                      <div class="aspect-video relative bg-gray-200 rounded-xl overflow-hidden">
                        <img
                          src={thumb.src}
                          alt={thumb.alt}
                          class="w-full h-full object-cover transition-transform duration-500 {position === 'center' ? 'group-hover:scale-105' : ''}"
                          loading="lazy"
                        />
                        <!-- Hover overlay -->
                        {#if position === 'center'}
                          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div class="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                            </div>
                          </div>
                        {/if}
                      </div>
                    </button>
                  </div>
                {/each}
              </div>
            </div>

            <!-- Navigation Arrows - Visible on all sizes -->
            <button
              onclick={prevThumb}
              class="absolute left-1 sm:-left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/90 sm:bg-white shadow-lg text-gray-700 hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
              aria-label="Thumbnail anterior"
            >
              <svg class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onclick={nextThumb}
              class="absolute right-1 sm:-right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/90 sm:bg-white shadow-lg text-gray-700 hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
              aria-label="Próximo thumbnail"
            >
              <svg class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  </section>

  <!-- CTA Section -->
  <section class="container mx-auto px-4 sm:px-6 lg:px-8">
    <AnimateOnScroll animation="fade-up">
      <div class="glass-strong p-8 md:p-12 text-center max-w-3xl mx-auto">
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4">
          Precisa de thumbnails profissionais?
        </h2>
        <p class="text-duda-cinza-claro mb-8 max-w-xl mx-auto">
          Thumbnails e capas que destacam seu conteúdo e aumentam o engajamento do seu canal no YouTube.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5545999445919?text=Olá! Gostaria de um orçamento para thumbnails/capas de YouTube."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
          <a
            href="https://www.instagram.com/designstudioduda/"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Instagram
          </a>
        </div>
      </div>
    </AnimateOnScroll>
  </section>
</main>

<!-- Lightbox Component -->
<Lightbox />

<style>
  /* YouTube Mockup Container */
  .youtube-mockup {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }

  /* Embla Base Styles */
  .embla {
    --slide-spacing: 0;
  }

  .embla__container {
    backface-visibility: hidden;
    touch-action: pan-y pinch-zoom;
  }

  .embla__slide {
    backface-visibility: hidden;
  }

  /* Thumbs carousel perspective effect */
  .embla-thumbs {
    perspective: 1000px;
  }

  .embla-thumbs .embla__container {
    perspective: 1000px;
  }

  /* Thumb slide states */
  .thumb-slide {
    transform-style: preserve-3d;
  }

  .thumb-center {
    transform: scale(1.08);
    z-index: 10;
    opacity: 1;
  }

  .thumb-center-shadow {
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.3);
  }

  .thumb-center-shadow:hover {
    box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.4);
  }

  .thumb-adjacent {
    transform: scale(0.95);
    opacity: 0.7;
    z-index: 5;
  }

  .thumb-far {
    transform: scale(0.9);
    opacity: 0.4;
    z-index: 1;
  }

  /* Hide scrollbar for tabs */
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  /* Mobile adjustments */
  @media (max-width: 640px) {
    .thumb-adjacent,
    .thumb-far {
      opacity: 0.5;
    }
  }
</style>

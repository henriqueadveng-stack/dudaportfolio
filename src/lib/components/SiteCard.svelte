<script lang="ts">
  import type { Site } from '$lib/data/sites';
  import { openSitePreview } from '$lib/stores/ui';

  interface Props {
    site: Site;
    allSites: Site[];
    index: number;
  }

  let { site, allSites, index }: Props = $props();
  let iframeLoaded = $state(false);
  let containerEl: HTMLDivElement | null = $state(null);
  let containerWidth = $state(280); // Default width

  function handleClick() {
    openSitePreview(site, allSites, index);
  }

  function handleIframeLoad() {
    iframeLoaded = true;
  }

  const categoryLabels: Record<Site['category'], string> = {
    'landing-page': 'Landing Page',
    'ecommerce': 'E-commerce',
    'institucional': 'Institucional',
    'portfolio': 'Portfólio',
    'outros': 'Outros',
  };

  // Iframe dimensions for card preview (16:10 aspect ratio)
  const iframeWidth = 1440;
  const iframeHeight = 900;

  // Calculate scale based on container width
  let scale = $derived(containerWidth / iframeWidth);

  $effect(() => {
    if (!containerEl) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        containerWidth = entry.contentRect.width;
      }
    });

    observer.observe(containerEl);
    containerWidth = containerEl.clientWidth;

    return () => observer.disconnect();
  });
</script>

<button
  class="group relative w-full glass card-hover cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,230,152,0.2)]"
  onclick={handleClick}
  aria-label="Ver preview de {site.title}"
>
  <!-- Laptop Frame -->
  <div class="p-3 sm:p-4">
    <!-- Screen Bezel -->
    <div class="relative bg-duda-cinza-medio/30 rounded-lg p-1.5 sm:p-2 transition-all duration-300 group-hover:bg-duda-cinza-medio/40">
      <!-- Screen -->
      <div
        class="relative aspect-[16/10] rounded-md overflow-hidden bg-duda-cinza"
        bind:this={containerEl}
      >
        <!-- Loading Placeholder -->
        {#if !iframeLoaded}
          <div class="absolute inset-0 bg-gradient-to-br from-duda-cinza via-duda-cinza-medio/20 to-duda-escuro flex flex-col items-center justify-center z-10">
            <svg class="w-8 h-8 text-duda-verde/40 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
        {/if}

        <!-- Live iframe preview -->
        <iframe
          src={site.url}
          title="Preview de {site.title}"
          class="absolute top-0 left-0 border-0 bg-white origin-top-left pointer-events-none"
          style="width: {iframeWidth}px; height: {iframeHeight}px; transform: scale({scale});"
          onload={handleIframeLoad}
          sandbox="allow-scripts allow-same-origin"
          loading="lazy"
          tabindex="-1"
        ></iframe>

        <!-- Screen Glow Overlay on Hover -->
        <div class="absolute inset-0 border-2 border-transparent group-hover:border-duda-verde/40 rounded-md transition-all duration-300 z-20"></div>

        <!-- Expand Icon Overlay -->
        <div class="absolute inset-0 bg-duda-escuro/0 group-hover:bg-duda-escuro/50 transition-all duration-300 flex items-center justify-center z-20">
          <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-duda-verde/20 backdrop-blur-sm border border-duda-verde/50 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-[0_0_20px_rgba(0,230,152,0.3)]">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-duda-verde" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Laptop Base (Keyboard hint) -->
      <div class="h-1.5 sm:h-2 mt-1.5 sm:mt-2 bg-duda-cinza-medio/20 rounded-full mx-auto w-1/4"></div>
    </div>
  </div>

  <!-- Category Badge -->
  {#if site.category}
    <div class="absolute top-5 sm:top-6 left-5 sm:left-6 z-30">
      <span class="px-2 py-1 text-[10px] sm:text-xs font-medium bg-duda-escuro/80 backdrop-blur-sm rounded-full text-duda-verde border border-duda-verde/20">
        {categoryLabels[site.category]}
      </span>
    </div>
  {/if}

  <!-- Info Section -->
  <div class="px-3 sm:px-4 pb-3 sm:pb-4">
    <h3 class="font-semibold text-white text-sm sm:text-base truncate group-hover:text-duda-verde transition-colors duration-300">
      {site.title}
    </h3>
    {#if site.description}
      <p class="text-duda-cinza-claro text-xs sm:text-sm mt-1 line-clamp-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
        {site.description}
      </p>
    {/if}
    {#if site.technologies && site.technologies.length > 0}
      <div class="flex flex-wrap gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {#each site.technologies.slice(0, 3) as tech}
          <span class="text-[10px] px-1.5 py-0.5 bg-duda-verde/10 text-duda-verde rounded">
            {tech}
          </span>
        {/each}
      </div>
    {/if}
  </div>
</button>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>

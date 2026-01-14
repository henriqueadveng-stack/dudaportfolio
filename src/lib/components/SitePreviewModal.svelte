<script lang="ts">
  import { sitePreview, closeSitePreview, setPreviewDevice, nextSite, prevSite } from '$lib/stores/ui';
  import { fade, scale } from 'svelte/transition';
  import { untrack } from 'svelte';

  let iframeLoaded = $state(false);
  let iframeKey = $state(0);

  // Device dimensions for realistic frames with iframe sizing
  // Scaled to fit within modal (max ~500px height for preview area)
  const deviceSizes = {
    desktop: {
      iframeWidth: 1440,
      iframeHeight: 900,
      scale: 0.5,
      frameClass: 'laptop-frame'
    },
    tablet: {
      iframeWidth: 768,
      iframeHeight: 1024,
      scale: 0.4,
      frameClass: 'tablet-frame'
    },
    mobile: {
      iframeWidth: 375,
      iframeHeight: 812,
      scale: 0.55,
      frameClass: 'mobile-frame'
    },
  };

  function handleKeydown(e: KeyboardEvent) {
    if (!$sitePreview.open) return;
    if (e.key === 'Escape') closeSitePreview();
    if (e.key === 'ArrowRight') nextSite();
    if (e.key === 'ArrowLeft') prevSite();
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      closeSitePreview();
    }
  }

  function visitSite() {
    if ($sitePreview.site?.url) {
      window.open($sitePreview.site.url, '_blank', 'noopener,noreferrer');
    }
  }

  // Track previous values to detect actual changes
  let prevSiteId: string | null = null;
  let prevDevice: string | null = null;

  // Reset iframe state when site or device changes
  $effect(() => {
    const currentSiteId = $sitePreview.site?.id ?? null;
    const currentDevice = $sitePreview.device;
    const isOpen = $sitePreview.open;

    // Use untrack for state updates to prevent infinite loop
    untrack(() => {
      if (isOpen && (currentSiteId !== prevSiteId || currentDevice !== prevDevice)) {
        iframeLoaded = false;
        iframeKey++;
        prevSiteId = currentSiteId;
        prevDevice = currentDevice;
      }
      if (!isOpen) {
        prevSiteId = null;
        prevDevice = null;
      }
    });
  });

  function handleIframeLoad() {
    iframeLoaded = true;
  }

  const categoryLabels: Record<string, string> = {
    'landing-page': 'Landing Page',
    'ecommerce': 'E-commerce',
    'institucional': 'Institucional',
    'portfolio': 'Portfólio',
    'outros': 'Outros',
  };

  // Calculate scaled dimensions
  function getScaledHeight(device: 'desktop' | 'tablet' | 'mobile') {
    const config = deviceSizes[device];
    return config.iframeHeight * config.scale;
  }

  function getScaledWidth(device: 'desktop' | 'tablet' | 'mobile') {
    const config = deviceSizes[device];
    return config.iframeWidth * config.scale;
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if $sitePreview.open && $sitePreview.site}
  <!-- Backdrop -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-duda-escuro/95 backdrop-blur-xl"
    transition:fade={{ duration: 200 }}
    onclick={handleBackdropClick}
    onkeydown={(e) => e.key === 'Escape' && closeSitePreview()}
    role="dialog"
    aria-modal="true"
    aria-label="Preview do site {$sitePreview.site.title}"
    tabindex="-1"
  >
    <!-- Modal Container -->
    <div
      class="relative w-full max-w-6xl max-h-[90vh] flex flex-col"
      transition:scale={{ duration: 300, start: 0.95 }}
    >
      <!-- Header -->
      <div class="flex items-center justify-between mb-4 px-2">
        <!-- Site Info -->
        <div class="flex items-center gap-3">
          <h2 class="text-xl sm:text-2xl font-semibold text-white">
            {$sitePreview.site.title}
          </h2>
          {#if $sitePreview.site.category}
            <span class="px-2 py-1 text-xs font-medium bg-duda-verde/20 text-duda-verde rounded-full border border-duda-verde/30">
              {categoryLabels[$sitePreview.site.category] || $sitePreview.site.category}
            </span>
          {/if}
        </div>

        <!-- Device Selector -->
        <div class="hidden sm:flex items-center gap-1 bg-duda-cinza/50 rounded-lg p-1">
          <button
            class="p-2 rounded-md transition-all duration-200 {$sitePreview.device === 'desktop' ? 'bg-duda-verde text-duda-escuro' : 'text-duda-cinza-claro hover:text-white hover:bg-duda-cinza'}"
            onclick={() => setPreviewDevice('desktop')}
            aria-label="Ver versão desktop"
            title="Desktop"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
            </svg>
          </button>
          <button
            class="p-2 rounded-md transition-all duration-200 {$sitePreview.device === 'tablet' ? 'bg-duda-verde text-duda-escuro' : 'text-duda-cinza-claro hover:text-white hover:bg-duda-cinza'}"
            onclick={() => setPreviewDevice('tablet')}
            aria-label="Ver versão tablet"
            title="Tablet"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 002.25-2.25v-15a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 4.5v15a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </button>
          <button
            class="p-2 rounded-md transition-all duration-200 {$sitePreview.device === 'mobile' ? 'bg-duda-verde text-duda-escuro' : 'text-duda-cinza-claro hover:text-white hover:bg-duda-cinza'}"
            onclick={() => setPreviewDevice('mobile')}
            aria-label="Ver versão mobile"
            title="Mobile"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
          </button>
        </div>

        <!-- Close Button -->
        <button
          class="p-2 rounded-full bg-duda-cinza/50 hover:bg-duda-cinza text-white transition-colors"
          onclick={closeSitePreview}
          aria-label="Fechar preview"
        >
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Preview Area -->
      <div class="flex-1 flex items-center justify-center relative overflow-visible py-4">
        <!-- Navigation Arrows -->
        {#if $sitePreview.sites.length > 1}
          <button
            class="absolute left-2 z-10 p-3 rounded-full bg-duda-escuro/80 hover:bg-duda-verde/20 text-white hover:text-duda-verde transition-all duration-200 backdrop-blur-sm"
            onclick={prevSite}
            aria-label="Site anterior"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            class="absolute right-2 z-10 p-3 rounded-full bg-duda-escuro/80 hover:bg-duda-verde/20 text-white hover:text-duda-verde transition-all duration-200 backdrop-blur-sm"
            onclick={nextSite}
            aria-label="Próximo site"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        {/if}

        <!-- Device Frame -->
        <div class="flex justify-center transition-all duration-500">
          <!-- Frame Container -->
          <div class="{deviceSizes[$sitePreview.device].frameClass}">
            {#if $sitePreview.device === 'desktop'}
              <!-- Laptop Frame -->
              <div class="bg-gradient-to-b from-duda-cinza-medio to-duda-cinza rounded-t-xl p-2 pb-0" style="width: {getScaledWidth('desktop') + 16}px;">
                <!-- Camera dot -->
                <div class="w-2 h-2 rounded-full bg-duda-cinza/50 mx-auto mb-2"></div>
                <!-- Screen -->
                <div
                  class="relative bg-duda-cinza rounded-t-lg overflow-hidden"
                  style="width: {getScaledWidth('desktop')}px; height: {getScaledHeight('desktop')}px;"
                >
                  <!-- Loading State -->
                  {#if !iframeLoaded}
                    <div class="absolute inset-0 bg-duda-cinza flex items-center justify-center z-10">
                      <div class="text-center">
                        <svg class="w-12 h-12 text-duda-verde/50 animate-spin mx-auto mb-3" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p class="text-duda-cinza-claro text-sm">Carregando site...</p>
                      </div>
                    </div>
                  {/if}
                  <!-- Live iframe -->
                  <div
                    class="origin-top-left"
                    style="width: {deviceSizes.desktop.iframeWidth}px; height: {deviceSizes.desktop.iframeHeight}px; transform: scale({deviceSizes.desktop.scale});"
                  >
                    {#key iframeKey}
                      <iframe
                        src={$sitePreview.site.url}
                        title={$sitePreview.site.title}
                        class="w-full h-full border-0 bg-white"
                        onload={handleIframeLoad}
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                      ></iframe>
                    {/key}
                  </div>
                </div>
              </div>
              <!-- Laptop Base -->
              <div class="bg-gradient-to-b from-duda-cinza to-duda-cinza-medio h-3 rounded-b-lg" style="width: {getScaledWidth('desktop') + 16}px;"></div>
              <div class="bg-duda-cinza-medio/50 h-1 mx-auto rounded-b-full" style="width: {(getScaledWidth('desktop') + 16) / 4}px;"></div>

            {:else if $sitePreview.device === 'tablet'}
              <!-- Tablet Frame -->
              <div class="bg-gradient-to-b from-duda-cinza-medio to-duda-cinza rounded-[2rem] p-3" style="width: {getScaledWidth('tablet') + 24}px;">
                <!-- Camera -->
                <div class="w-2 h-2 rounded-full bg-duda-cinza/50 mx-auto mb-2"></div>
                <!-- Screen -->
                <div
                  class="relative bg-duda-cinza rounded-xl overflow-hidden"
                  style="width: {getScaledWidth('tablet')}px; height: {getScaledHeight('tablet')}px;"
                >
                  <!-- Loading State -->
                  {#if !iframeLoaded}
                    <div class="absolute inset-0 bg-duda-cinza flex items-center justify-center z-10">
                      <svg class="w-8 h-8 text-duda-verde/50 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  {/if}
                  <!-- Live iframe -->
                  <div
                    class="origin-top-left"
                    style="width: {deviceSizes.tablet.iframeWidth}px; height: {deviceSizes.tablet.iframeHeight}px; transform: scale({deviceSizes.tablet.scale});"
                  >
                    {#key iframeKey}
                      <iframe
                        src={$sitePreview.site.url}
                        title={$sitePreview.site.title}
                        class="w-full h-full border-0 bg-white"
                        onload={handleIframeLoad}
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                      ></iframe>
                    {/key}
                  </div>
                </div>
                <!-- Home button -->
                <div class="w-8 h-8 rounded-full border-2 border-duda-cinza/30 mx-auto mt-2"></div>
              </div>

            {:else}
              <!-- Mobile Frame -->
              <div class="bg-gradient-to-b from-duda-cinza-medio to-duda-cinza rounded-[2rem] p-2" style="width: {getScaledWidth('mobile') + 16}px;">
                <!-- Dynamic Island / Notch -->
                <div class="w-16 h-5 bg-duda-escuro rounded-full mx-auto mb-1.5"></div>
                <!-- Screen -->
                <div
                  class="relative bg-duda-cinza rounded-[1rem] overflow-hidden"
                  style="width: {getScaledWidth('mobile')}px; height: {getScaledHeight('mobile')}px;"
                >
                  <!-- Loading State -->
                  {#if !iframeLoaded}
                    <div class="absolute inset-0 bg-duda-cinza flex items-center justify-center z-10">
                      <svg class="w-8 h-8 text-duda-verde/50 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  {/if}
                  <!-- Live iframe -->
                  <div
                    class="origin-top-left"
                    style="width: {deviceSizes.mobile.iframeWidth}px; height: {deviceSizes.mobile.iframeHeight}px; transform: scale({deviceSizes.mobile.scale});"
                  >
                    {#key iframeKey}
                      <iframe
                        src={$sitePreview.site.url}
                        title={$sitePreview.site.title}
                        class="w-full h-full border-0 bg-white"
                        onload={handleIframeLoad}
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                      ></iframe>
                    {/key}
                  </div>
                </div>
                <!-- Home indicator -->
                <div class="w-20 h-1 bg-white/30 rounded-full mx-auto mt-2"></div>
              </div>
            {/if}
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
        <!-- Description -->
        <div class="text-center sm:text-left flex-1">
          {#if $sitePreview.site.description}
            <p class="text-duda-cinza-claro text-sm">
              {$sitePreview.site.description}
            </p>
          {/if}
          {#if $sitePreview.site.technologies && $sitePreview.site.technologies.length > 0}
            <div class="flex flex-wrap gap-1 mt-2 justify-center sm:justify-start">
              {#each $sitePreview.site.technologies as tech}
                <span class="text-xs px-2 py-0.5 bg-duda-verde/10 text-duda-verde rounded-full">
                  {tech}
                </span>
              {/each}
            </div>
          {/if}
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-3">
          <!-- Counter -->
          {#if $sitePreview.sites.length > 1}
            <span class="text-duda-cinza-claro text-sm">
              {$sitePreview.currentIndex + 1} / {$sitePreview.sites.length}
            </span>
          {/if}
          <!-- Visit Button -->
          <button
            class="btn-primary px-6 py-2.5 flex items-center gap-2"
            onclick={visitSite}
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Visitar Site
          </button>
        </div>
      </div>

      <!-- Dots Indicator (Mobile) -->
      {#if $sitePreview.sites.length > 1}
        <div class="flex justify-center gap-2 mt-4 sm:hidden">
          {#each $sitePreview.sites as _, i}
            <button
              class="w-2 h-2 rounded-full transition-all duration-200 {i === $sitePreview.currentIndex ? 'bg-duda-verde w-6' : 'bg-duda-cinza-medio'}"
              onclick={() => {
                sitePreview.update(state => ({
                  ...state,
                  currentIndex: i,
                  site: state.sites[i]
                }));
              }}
              aria-label="Ir para site {i + 1}"
            ></button>
          {/each}
        </div>
      {/if}
    </div>
  </div>
{/if}

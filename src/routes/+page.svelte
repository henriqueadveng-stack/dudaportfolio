<script lang="ts">
  import { onMount } from 'svelte';

  let logoLoaded = $state(false);
  let iconsVisible = $state(false);

  onMount(() => {
    setTimeout(() => logoLoaded = true, 200);
    setTimeout(() => iconsVisible = true, 700);
  });
</script>

<svelte:head>
  <title>DUDA Design Studio | Bora sair da mesmice</title>
  <meta name="description" content="Uma dupla focada em transformar a comunicação visual e textual. Edição de vídeos e design para social media." />
</svelte:head>

<!-- Full Screen Centered Content -->
<section class="h-full flex flex-col items-center justify-center px-4">
  <!-- Logo - centered in screen -->
  <div
    class="flex-1 flex items-center justify-center transition-all duration-1000 ease-out"
    class:opacity-0={!logoLoaded}
    class:scale-90={!logoLoaded}
    class:opacity-100={logoLoaded}
    class:scale-100={logoLoaded}
  >
    <img
      src="/marca/Logo Verde.png"
      alt="DUDA Design Studio"
      class="w-44 sm:w-56 md:w-64 lg:w-72 h-auto"
    />
  </div>

  <!-- Icon Navigation - fixed at bottom -->
  <div
    class="pb-12 sm:pb-16 transition-all duration-700 ease-out"
    class:opacity-0={!iconsVisible}
    class:translate-y-4={!iconsVisible}
    class:opacity-100={iconsVisible}
    class:translate-y-0={iconsVisible}
  >
    <div class="flex items-center justify-center gap-8 sm:gap-12 md:gap-16">
      <!-- Portfolio Videos -->
      <a
        href="/portfolio/videos"
        class="group flex flex-col items-center gap-2 transition-transform duration-300 hover:scale-110"
      >
        <div class="w-10 h-10 sm:w-12 sm:h-12 bg-duda-verde/10 rounded-xl flex items-center justify-center group-hover:bg-duda-verde/20 transition-colors duration-300 backdrop-blur-sm">
          <svg class="w-5 h-5 sm:w-6 sm:h-6 text-duda-verde" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <span class="text-xs text-duda-cinza-claro group-hover:text-duda-verde transition-colors duration-300">Vídeos</span>
      </a>

      <!-- Portfolio Design -->
      <a
        href="/portfolio/design"
        class="group flex flex-col items-center gap-2 transition-transform duration-300 hover:scale-110"
      >
        <div class="w-10 h-10 sm:w-12 sm:h-12 bg-duda-verde/10 rounded-xl flex items-center justify-center group-hover:bg-duda-verde/20 transition-colors duration-300 backdrop-blur-sm">
          <svg class="w-5 h-5 sm:w-6 sm:h-6 text-duda-verde" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <span class="text-xs text-duda-cinza-claro group-hover:text-duda-verde transition-colors duration-300">Design</span>
      </a>

      <!-- WhatsApp Contact -->
      <a
        href="https://wa.me/5545999445919"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex flex-col items-center gap-2 transition-transform duration-300 hover:scale-110"
      >
        <div class="w-10 h-10 sm:w-12 sm:h-12 bg-duda-verde/10 rounded-xl flex items-center justify-center group-hover:bg-duda-verde/20 transition-colors duration-300 backdrop-blur-sm">
          <svg class="w-5 h-5 sm:w-6 sm:h-6 text-duda-verde" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
        <span class="text-xs text-duda-cinza-claro group-hover:text-duda-verde transition-colors duration-300">WhatsApp</span>
      </a>

      <!-- Instagram -->
      <a
        href="https://www.instagram.com/designstudioduda/"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex flex-col items-center gap-2 transition-transform duration-300 hover:scale-110"
      >
        <div class="w-10 h-10 sm:w-12 sm:h-12 bg-duda-verde/10 rounded-xl flex items-center justify-center group-hover:bg-duda-verde/20 transition-colors duration-300 backdrop-blur-sm">
          <svg class="w-5 h-5 sm:w-6 sm:h-6 text-duda-verde" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </div>
        <span class="text-xs text-duda-cinza-claro group-hover:text-duda-verde transition-colors duration-300">Instagram</span>
      </a>
    </div>
  </div>
</section>

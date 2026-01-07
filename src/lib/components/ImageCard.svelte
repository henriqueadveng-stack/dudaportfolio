<script lang="ts">
  import { openLightbox } from '$lib/stores/ui';
  import type { Design } from '$lib/data/designs';

  interface Props {
    design: Design;
    allDesigns: Design[];
    index: number;
  }

  let { design, allDesigns, index }: Props = $props();

  let loaded = $state(false);

  function handleClick() {
    const images = allDesigns.map((d) => ({ src: d.src, alt: d.alt }));
    openLightbox(images, index);
  }
</script>

<button
  class="group relative aspect-square w-full overflow-hidden rounded-xl glass card-hover cursor-pointer touch-target active:scale-[0.98] transition-transform"
  onclick={handleClick}
  aria-label="Ver {design.alt}"
>
  <!-- Loading Placeholder -->
  {#if !loaded}
    <div class="absolute inset-0 bg-duda-cinza animate-pulse"></div>
  {/if}

  <!-- Image -->
  <img
    src={design.src}
    alt={design.alt}
    class="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-active:scale-105"
    class:opacity-0={!loaded}
    class:opacity-100={loaded}
    loading="lazy"
    decoding="async"
    onload={() => loaded = true}
  />

  <!-- Overlay -->
  <div
    class="absolute inset-0 bg-duda-escuro/0 group-hover:bg-duda-escuro/40 group-active:bg-duda-escuro/40 transition-all duration-300 flex items-center justify-center"
  >
    <!-- Expand Icon -->
    <div
      class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-duda-verde/20 backdrop-blur-sm border border-duda-verde/50 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 group-active:opacity-100 group-active:scale-100 transition-all duration-300"
    >
      <svg
        class="w-4 h-4 sm:w-5 sm:h-5 text-duda-verde"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
        />
      </svg>
    </div>
  </div>

  <!-- Title on hover -->
  {#if design.title}
    <div class="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-duda-escuro to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300">
      <p class="text-white text-xs sm:text-sm font-medium truncate">{design.title}</p>
    </div>
  {/if}
</button>

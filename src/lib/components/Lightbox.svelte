<script lang="ts">
  import { lightbox, closeLightbox, nextImage, prevImage } from '$lib/stores/ui';
  import { fade, scale } from 'svelte/transition';

  let touchStartX = 0;
  let touchEndX = 0;

  function handleKeydown(e: KeyboardEvent) {
    if (!$lightbox.open) return;

    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowRight':
        nextImage();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
    }
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      closeLightbox();
    }
  }

  function handleTouchStart(e: TouchEvent) {
    touchStartX = e.changedTouches[0].screenX;
  }

  function handleTouchEnd(e: TouchEvent) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }

  function handleSwipe() {
    const threshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
  }

  const currentImage = $derived($lightbox.images[$lightbox.currentIndex]);
</script>

<svelte:window onkeydown={handleKeydown} />

{#if $lightbox.open}
  <!-- svelte-ignore a11y_interactive_supports_focus -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    class="fixed inset-0 z-[100] flex items-center justify-center"
    transition:fade={{ duration: 200 }}
    onclick={handleBackdropClick}
    ontouchstart={handleTouchStart}
    ontouchend={handleTouchEnd}
    role="dialog"
    aria-modal="true"
    aria-label="Visualização de imagem"
  >
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/95"></div>

    <!-- Close Button -->
    <button
      onclick={closeLightbox}
      class="absolute top-4 right-4 z-20 w-12 h-12 flex items-center justify-center text-white/80 hover:text-white transition-colors duration-200 group"
      aria-label="Fechar galeria"
    >
      <svg
        class="w-8 h-8 transition-transform duration-200 group-hover:scale-110"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Navigation Arrows -->
    {#if $lightbox.images.length > 1}
      <button
        onclick={(e) => { e.stopPropagation(); prevImage(); }}
        class="absolute left-4 z-20 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200"
        aria-label="Imagem anterior"
      >
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onclick={(e) => { e.stopPropagation(); nextImage(); }}
        class="absolute right-4 z-20 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200"
        aria-label="Próxima imagem"
      >
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    {/if}

    <!-- Image Container -->
    {#key $lightbox.currentIndex}
      <div
        class="relative z-10 max-w-[90vw] max-h-[85vh] flex items-center justify-center"
        transition:scale={{ duration: 200, start: 0.95 }}
      >
        {#if currentImage}
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            class="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          />
        {/if}
      </div>
    {/key}

    <!-- Counter -->
    {#if $lightbox.images.length > 1}
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/60 font-sans text-sm">
        {$lightbox.currentIndex + 1} / {$lightbox.images.length}
      </div>
    {/if}

    <!-- Dots Indicator -->
    {#if $lightbox.images.length > 1 && $lightbox.images.length <= 10}
      <div class="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {#each $lightbox.images as _, i}
          <button
            onclick={(e) => { e.stopPropagation(); lightbox.update(s => ({ ...s, currentIndex: i })); }}
            class="w-2 h-2 rounded-full transition-all duration-200 {i === $lightbox.currentIndex ? 'bg-duda-verde scale-125' : 'bg-white/30'}"
            aria-label="Ir para imagem {i + 1}"
          ></button>
        {/each}
      </div>
    {/if}
  </div>
{/if}

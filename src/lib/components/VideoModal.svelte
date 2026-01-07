<script lang="ts">
  import { videoModal, closeVideoModal } from '$lib/stores/ui';
  import { fade, scale } from 'svelte/transition';

  let videoElement = $state<HTMLVideoElement | null>(null);

  // Check if current video is YouTube
  const isYouTube = $derived(!!$videoModal.youtubeId);

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && $videoModal.open) {
      closeVideoModal();
    }
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      closeVideoModal();
    }
  }

  $effect(() => {
    if ($videoModal.open && videoElement && !isYouTube) {
      videoElement.play();
    }
  });
</script>

<svelte:window onkeydown={handleKeydown} />

{#if $videoModal.open}
  <!-- svelte-ignore a11y_interactive_supports_focus -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
    transition:fade={{ duration: 200 }}
    onclick={handleBackdropClick}
    role="dialog"
    aria-modal="true"
    aria-label={$videoModal.title}
  >
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/90 backdrop-blur-md"></div>

    <!-- Video Container -->
    <div
      class="relative w-full max-w-5xl max-h-[90vh] z-10"
      transition:scale={{ duration: 300, start: 0.9 }}
    >
      <!-- Close Button -->
      <button
        onclick={closeVideoModal}
        class="absolute -top-12 right-0 sm:top-0 sm:-right-12 w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors duration-200 group"
        aria-label="Fechar vídeo"
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

      <!-- Video -->
      {#if isYouTube}
        <!-- YouTube Embed -->
        <div class="relative w-full aspect-video rounded-xl shadow-2xl overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/{$videoModal.youtubeId}?autoplay=1&rel=0"
            title={$videoModal.title}
            class="absolute inset-0 w-full h-full"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      {:else}
        <!-- Local Video -->
        <video
          bind:this={videoElement}
          src={$videoModal.src}
          class="w-full h-auto max-h-[80vh] rounded-xl shadow-2xl"
          controls
          autoplay
          playsinline
        >
          <track kind="captions" />
        </video>
      {/if}

      <!-- Title -->
      {#if $videoModal.title}
        <p class="mt-4 text-center text-white/80 font-sans">{$videoModal.title}</p>
      {/if}
    </div>
  </div>
{/if}

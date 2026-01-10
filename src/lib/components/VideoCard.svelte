<script lang="ts">
  import { openVideoModal } from '$lib/stores/ui';
  import type { Video } from '$lib/data/videos';

  interface Props {
    video: Video;
  }

  let { video }: Props = $props();

  let isHovered = $state(false);

  // Check if this is a YouTube-hosted video
  const isYouTube = !!video.youtubeId;

  function handleClick() {
    openVideoModal(video.src, video.title, video.youtubeId);
  }

  function handleMouseEnter() {
    isHovered = true;
  }

  function handleMouseLeave() {
    isHovered = false;
  }
</script>

<button
  class="group relative aspect-[9/16] w-full overflow-hidden rounded-xl glass card-hover cursor-pointer touch-target active:scale-[0.98] transition-transform"
  onclick={handleClick}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  aria-label="Assistir {video.title}"
>
  <!-- Video Preview - shows first frame as thumbnail, plays on hover (muted) -->
  {#if isYouTube}
    <!-- YouTube thumbnail -->
    <img
      src={video.thumbnail}
      alt={video.title}
      class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  {:else}
    <!-- Local video preview -->
    <video
      src={video.src}
      class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      muted
      playsinline
      preload="metadata"
      disablepictureinpicture
    >
      <track kind="captions" />
    </video>
  {/if}

  <!-- Overlay -->
  <div
    class="absolute inset-0 bg-gradient-to-t from-duda-escuro via-duda-escuro/40 to-transparent transition-opacity duration-300 {isHovered ? 'opacity-40' : 'opacity-70'}"
  ></div>

  <!-- Play Button -->
  <div class="absolute inset-0 flex items-center justify-center">
    <div
      class="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-duda-verde/20 backdrop-blur-sm border-2 border-duda-verde/50 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-duda-verde/30 group-hover:border-duda-verde group-hover:shadow-[0_0_30px_rgba(0,230,152,0.4)]"
    >
      <svg
        class="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-duda-verde ml-0.5"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  </div>

  <!-- Title -->
  <div class="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
    <h3 class="font-sans font-semibold text-white text-xs sm:text-sm md:text-base truncate leading-tight">
      {video.title}
    </h3>
    {#if video.description}
      <p class="text-duda-cinza-claro text-[10px] sm:text-xs md:text-sm mt-1 truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {video.description}
      </p>
    {/if}
  </div>

  <!-- Category Badge -->
  {#if video.category}
    <div class="absolute top-2 left-2 sm:top-3 sm:left-3">
      <span class="px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-medium bg-duda-escuro/80 backdrop-blur-sm rounded-full text-duda-verde border border-duda-verde/20">
        {video.category}
      </span>
    </div>
  {/if}
</button>

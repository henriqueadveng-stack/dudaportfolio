<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    count?: number;
    interactive?: boolean;
    intensity?: 'low' | 'medium' | 'high';
  }

  let { count = 10, interactive = true, intensity = 'medium' }: Props = $props();

  interface Bubble {
    id: number;
    size: number;
    x: number;
    y: number;
    delay: number;
    duration: number;
    opacity: number;
    blur: number;
  }

  let bubbles = $state<Bubble[]>([]);
  let mouseX = $state(0);
  let mouseY = $state(0);
  let containerRef: HTMLDivElement;

  const intensityMap = {
    low: 5,
    medium: 10,
    high: 20,
  };

  onMount(() => {
    // Generate bubbles on mount
    bubbles = Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 150 + 50,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 8 + 6,
      opacity: Math.random() * 0.3 + 0.1,
      blur: Math.random() * 30 + 20,
    }));

    if (interactive) {
      const handleMouseMove = (e: MouseEvent) => {
        if (containerRef) {
          const rect = containerRef.getBoundingClientRect();
          mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
          mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        }
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  });

  const getParallaxOffset = (index: number) => {
    if (!interactive) return { x: 0, y: 0 };
    const factor = (index % 3 + 1) * intensityMap[intensity];
    return {
      x: mouseX * factor,
      y: mouseY * factor,
    };
  };
</script>

<div
  bind:this={containerRef}
  class="fixed inset-0 overflow-hidden pointer-events-none -z-10"
  aria-hidden="true"
>
  {#each bubbles as bubble (bubble.id)}
    {@const offset = getParallaxOffset(bubble.id)}
    <div
      class="absolute rounded-full will-change-transform"
      style="
        width: {bubble.size}px;
        height: {bubble.size}px;
        left: {bubble.x}%;
        top: {bubble.y}%;
        opacity: {bubble.opacity};
        filter: blur({bubble.blur}px);
        background: radial-gradient(circle at 30% 30%, rgba(0, 230, 152, 0.6), rgba(0, 230, 152, 0.1));
        animation: float {bubble.duration}s ease-in-out infinite;
        animation-delay: {bubble.delay}s;
        transform: translate({offset.x}px, {offset.y}px);
        transition: transform 0.3s ease-out;
      "
    ></div>
  {/each}
</div>

<style>
  @keyframes float {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-30px) rotate(3deg);
    }
  }
</style>

<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    interactive?: boolean;
  }

  let { interactive = true }: Props = $props();

  let mouseX = $state(0);
  let mouseY = $state(0);
  let containerRef: HTMLDivElement;

  onMount(() => {
    if (interactive) {
      const handleMouseMove = (e: MouseEvent) => {
        if (containerRef) {
          const rect = containerRef.getBoundingClientRect();
          mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
          mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
        }
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  });
</script>

<div
  bind:this={containerRef}
  class="fixed inset-0 overflow-hidden pointer-events-none -z-10"
  aria-hidden="true"
>
  <!-- Base background image -->
  <div
    class="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 transition-transform duration-700 ease-out"
    style="
      background-image: url('/marca/fundo.png');
      transform: translate({mouseX * 0.3}px, {mouseY * 0.3}px) scale(1.1);
    "
  ></div>

  <!-- Animated wave overlay 1 -->
  <div
    class="absolute inset-0 opacity-30 transition-transform duration-500 ease-out"
    style="
      background: radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0, 230, 152, 0.15), transparent);
      transform: translate({mouseX * 0.5}px, {mouseY * 0.5}px);
      animation: wave1 8s ease-in-out infinite;
    "
  ></div>

  <!-- Animated wave overlay 2 -->
  <div
    class="absolute inset-0 opacity-20 transition-transform duration-500 ease-out"
    style="
      background: radial-gradient(ellipse 60% 40% at 30% 70%, rgba(0, 230, 152, 0.2), transparent);
      transform: translate({mouseX * 0.7}px, {mouseY * 0.7}px);
      animation: wave2 12s ease-in-out infinite;
    "
  ></div>

  <!-- Animated wave overlay 3 -->
  <div
    class="absolute inset-0 opacity-15 transition-transform duration-500 ease-out"
    style="
      background: radial-gradient(ellipse 70% 45% at 70% 60%, rgba(0, 230, 152, 0.15), transparent);
      transform: translate({mouseX * 0.4}px, {mouseY * 0.4}px);
      animation: wave3 10s ease-in-out infinite;
    "
  ></div>

  <!-- Subtle vignette -->
  <div class="absolute inset-0 bg-radial-gradient pointer-events-none"></div>
</div>

<style>
  @keyframes wave1 {
    0%, 100% {
      transform: translateY(0) scaleY(1);
    }
    50% {
      transform: translateY(-20px) scaleY(1.05);
    }
  }

  @keyframes wave2 {
    0%, 100% {
      transform: translateX(0) translateY(0);
    }
    33% {
      transform: translateX(15px) translateY(-10px);
    }
    66% {
      transform: translateX(-10px) translateY(5px);
    }
  }

  @keyframes wave3 {
    0%, 100% {
      transform: translateX(0) scaleX(1);
    }
    50% {
      transform: translateX(-20px) scaleX(1.02);
    }
  }

  .bg-radial-gradient {
    background: radial-gradient(ellipse at center, transparent 0%, rgba(30, 33, 29, 0.4) 100%);
  }
</style>

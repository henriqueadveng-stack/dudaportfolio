<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    animation?: 'fade-up' | 'fade-down' | 'scale-in' | 'slide-in-right' | 'slide-in-left';
    delay?: number;
    threshold?: number;
    once?: boolean;
    class?: string;
    children: import('svelte').Snippet;
  }

  let {
    animation = 'fade-up',
    delay = 0,
    threshold = 0.1,
    once = true,
    class: className = '',
    children
  }: Props = $props();

  let visible = $state(false);
  let element: HTMLDivElement;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            visible = true;
          }, delay);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          visible = false;
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  });

  const animationClasses: Record<string, string> = {
    'fade-up': 'translate-y-8 opacity-0',
    'fade-down': '-translate-y-8 opacity-0',
    'scale-in': 'scale-90 opacity-0',
    'slide-in-right': 'translate-x-8 opacity-0',
    'slide-in-left': '-translate-x-8 opacity-0',
  };

  const visibleClasses = 'translate-y-0 translate-x-0 scale-100 opacity-100';
</script>

<div
  bind:this={element}
  class="transition-all duration-700 ease-out {className}"
  class:translate-y-8={!visible && animation === 'fade-up'}
  class:-translate-y-8={!visible && animation === 'fade-down'}
  class:scale-90={!visible && animation === 'scale-in'}
  class:translate-x-8={!visible && animation === 'slide-in-right'}
  class:-translate-x-8={!visible && animation === 'slide-in-left'}
  class:opacity-0={!visible}
  class:translate-y-0={visible}
  class:translate-x-0={visible}
  class:scale-100={visible}
  class:opacity-100={visible}
>
  {@render children()}
</div>

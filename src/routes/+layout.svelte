<script lang="ts">
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import AnimatedBackground from '$lib/components/AnimatedBackground.svelte';
  import VideoModal from '$lib/components/VideoModal.svelte';
  import Lightbox from '$lib/components/Lightbox.svelte';
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';

  let { children } = $props();

  // Check if we're on pages that should show footer
  const showFooter = $derived($page.url.pathname.startsWith('/portfolio'));

  // Check if page should have no scroll
  const noScroll = $derived(
    $page.url.pathname === '/' || $page.url.pathname === '/contato'
  );
</script>

<svelte:head>
  <link rel="icon" href="/marca/Verde.png" />
</svelte:head>

<!-- Background Effects -->
<AnimatedBackground interactive={true} />

<!-- Header -->
<Header />

<!-- Main Content with page transitions -->
{#key $page.url.pathname}
  <main
    class="flex flex-col"
    class:min-h-screen={!noScroll}
    class:h-screen={noScroll}
    class:overflow-hidden={noScroll}
    in:fade={{ duration: 300, delay: 150 }}
    out:fade={{ duration: 150 }}
  >
    {@render children()}
  </main>
{/key}

<!-- Footer - only on portfolio pages -->
{#if showFooter}
  <Footer />
{/if}

<!-- Modals -->
<VideoModal />
<Lightbox />

<script lang="ts">
  import { page } from '$app/stores';
  import { mobileMenuOpen, headerScrolled, toggleMobileMenu, closeMobileMenu } from '$lib/stores/ui';
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';

  let dropdownOpen = $state(false);
  let scrollY = $state(0);

  onMount(() => {
    const handleScroll = () => {
      scrollY = window.scrollY;
      headerScrolled.set(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function handleNavClick() {
    closeMobileMenu();
    dropdownOpen = false;
  }

  const isActive = (path: string) => $page.url.pathname === path;
  const isPortfolioActive = () => $page.url.pathname.startsWith('/portfolio');
</script>

<header
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {$headerScrolled ? 'bg-duda-escuro/80 backdrop-blur-xl shadow-lg shadow-duda-verde/5' : ''}"
>
  <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16 sm:h-20">
      <!-- Logo -->
      <a
        href="/"
        class="relative z-10 flex-shrink-0 transition-transform duration-300 hover:scale-105"
        onclick={handleNavClick}
      >
        <img
          src="/marca/Verde.png"
          alt="DUDA Design Studio"
          class="w-10 h-10 sm:w-12 sm:h-12 object-contain"
        />
      </a>

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center gap-8">
        <a
          href="/"
          class="font-medium transition-colors duration-300 link-underline py-2"
          class:text-duda-verde={isActive('/')}
          class:text-white={!isActive('/')}
        >
          Início
        </a>

        <!-- Portfolio Dropdown -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
          class="relative"
          onmouseenter={() => dropdownOpen = true}
          onmouseleave={() => dropdownOpen = false}
        >
          <button
            class="font-medium transition-colors duration-300 link-underline py-2 flex items-center gap-1"
            class:text-duda-verde={isPortfolioActive()}
            class:text-white={!isPortfolioActive()}
          >
            Portfólio
            <svg
              class="w-4 h-4 transition-transform duration-300"
              class:rotate-180={dropdownOpen}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {#if dropdownOpen}
            <!-- Invisible bridge to prevent gap -->
            <div class="absolute top-full left-0 right-0 h-4"></div>
            <div
              class="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 w-48 glass-strong p-2"
              transition:fly={{ y: -10, duration: 200 }}
            >
              <a
                href="/portfolio/videos"
                class="block px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-duda-verde/10 hover:text-duda-verde"
                class:text-duda-verde={isActive('/portfolio/videos')}
                onclick={handleNavClick}
              >
                Edição de Vídeos
              </a>
              <a
                href="/portfolio/design"
                class="block px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-duda-verde/10 hover:text-duda-verde"
                class:text-duda-verde={isActive('/portfolio/design')}
                onclick={handleNavClick}
              >
                Design & Social Media
              </a>
            </div>
          {/if}
        </div>

        <a
          href="/contato"
          class="font-medium transition-colors duration-300 link-underline py-2"
          class:text-duda-verde={isActive('/contato')}
          class:text-white={!isActive('/contato')}
        >
          Contato
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button
        class="md:hidden relative z-10 p-2 -mr-2"
        onclick={toggleMobileMenu}
        aria-label={$mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
      >
        <div class="w-6 h-5 relative flex flex-col justify-between">
          <span
            class="w-full h-0.5 bg-white transition-all duration-300 origin-center"
            class:rotate-45={$mobileMenuOpen}
            class:translate-y-2={$mobileMenuOpen}
          ></span>
          <span
            class="w-full h-0.5 bg-white transition-all duration-300"
            class:opacity-0={$mobileMenuOpen}
            class:scale-x-0={$mobileMenuOpen}
          ></span>
          <span
            class="w-full h-0.5 bg-white transition-all duration-300 origin-center"
            class:-rotate-45={$mobileMenuOpen}
            class:-translate-y-2={$mobileMenuOpen}
          ></span>
        </div>
      </button>
    </div>
  </nav>

  <!-- Mobile Menu -->
  {#if $mobileMenuOpen}
    <div
      class="fixed inset-0 bg-duda-escuro/98 backdrop-blur-2xl md:hidden pt-20"
      transition:fade={{ duration: 200 }}
    >
      <nav class="container mx-auto px-6 py-8 flex flex-col gap-6">
        <a
          href="/"
          class="text-2xl font-semibold transition-colors duration-300"
          class:text-duda-verde={isActive('/')}
          onclick={handleNavClick}
          transition:fly={{ x: -20, delay: 50 }}
        >
          Início
        </a>

        <div class="space-y-4" transition:fly={{ x: -20, delay: 100 }}>
          <p class="text-duda-cinza-claro text-sm uppercase tracking-wider">Portfólio</p>
          <a
            href="/portfolio/videos"
            class="block text-xl transition-colors duration-300 pl-4 border-l-2 border-duda-verde/30 hover:border-duda-verde"
            class:text-duda-verde={isActive('/portfolio/videos')}
            class:border-duda-verde={isActive('/portfolio/videos')}
            onclick={handleNavClick}
          >
            Edição de Vídeos
          </a>
          <a
            href="/portfolio/design"
            class="block text-xl transition-colors duration-300 pl-4 border-l-2 border-duda-verde/30 hover:border-duda-verde"
            class:text-duda-verde={isActive('/portfolio/design')}
            class:border-duda-verde={isActive('/portfolio/design')}
            onclick={handleNavClick}
          >
            Design & Social Media
          </a>
        </div>

        <a
          href="/contato"
          class="text-2xl font-semibold transition-colors duration-300"
          class:text-duda-verde={isActive('/contato')}
          onclick={handleNavClick}
          transition:fly={{ x: -20, delay: 150 }}
        >
          Contato
        </a>

        <div class="mt-auto pt-8 border-t border-duda-verde/10" transition:fly={{ y: 20, delay: 200 }}>
          <div class="flex gap-4">
            <a
              href="https://wa.me/5545999445919"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary flex-1 text-center"
            >
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/designstudioduda/"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-secondary flex-1 text-center"
            >
              Instagram
            </a>
          </div>
        </div>
      </nav>
    </div>
  {/if}
</header>

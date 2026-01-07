<script lang="ts">
  type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

  interface FormData {
    name: string;
    email: string;
    whatsapp: string;
    service: string;
    message: string;
  }

  interface FormErrors {
    name?: string;
    email?: string;
    whatsapp?: string;
    service?: string;
    message?: string;
  }

  let formData = $state<FormData>({
    name: '',
    email: '',
    whatsapp: '',
    service: '',
    message: '',
  });

  let errors = $state<FormErrors>({});
  let touched = $state<Record<string, boolean>>({});
  let status = $state<FormStatus>('idle');
  let errorMessage = $state('');

  const services = [
    { value: '', label: 'Selecione uma opção' },
    { value: 'videos', label: 'Edição de Vídeos' },
    { value: 'design', label: 'Design para Social Media' },
    { value: 'ambos', label: 'Ambos os serviços' },
    { value: 'outro', label: 'Outro (especificar na mensagem)' },
  ];

  function validateField(field: keyof FormData, value: string): string | undefined {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Nome é obrigatório';
        if (value.trim().length < 2) return 'Nome deve ter pelo menos 2 caracteres';
        break;
      case 'email':
        if (!value.trim()) return 'Email é obrigatório';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email inválido';
        break;
      case 'whatsapp':
        if (value.trim() && !/^[\d\s()+-]+$/.test(value)) return 'Formato de telefone inválido';
        break;
      case 'service':
        if (!value) return 'Selecione um serviço';
        break;
      case 'message':
        if (!value.trim()) return 'Mensagem é obrigatória';
        if (value.trim().length < 10) return 'Mensagem deve ter pelo menos 10 caracteres';
        break;
    }
    return undefined;
  }

  function validateForm(): boolean {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FormData>).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    errors = newErrors;
    return isValid;
  }

  function handleBlur(field: keyof FormData) {
    touched[field] = true;
    const error = validateField(field, formData[field]);
    if (error) {
      errors[field] = error;
    } else {
      delete errors[field];
      errors = { ...errors };
    }
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();

    // Mark all fields as touched
    touched = {
      name: true,
      email: true,
      whatsapp: true,
      service: true,
      message: true,
    };

    if (!validateForm()) return;

    status = 'submitting';
    errorMessage = '';

    try {
      // Using Formspree - replace with your form ID
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          service: services.find((s) => s.value === formData.service)?.label,
          message: formData.message,
        }),
      });

      if (response.ok) {
        status = 'success';
        formData = { name: '', email: '', whatsapp: '', service: '', message: '' };
        touched = {};
        errors = {};
      } else {
        throw new Error('Erro ao enviar mensagem');
      }
    } catch {
      status = 'error';
      errorMessage = 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente ou entre em contato pelo WhatsApp.';
    }
  }

  function getInputClasses(field: keyof FormData): string {
    const base = 'input-field';
    if (touched[field] && errors[field]) {
      return `${base} input-field-error`;
    }
    return base;
  }
</script>

<form onsubmit={handleSubmit} class="space-y-6" novalidate>
  <!-- Name -->
  <div>
    <label for="name" class="block text-sm font-medium text-white mb-2">
      Nome <span class="text-duda-verde">*</span>
    </label>
    <input
      type="text"
      id="name"
      bind:value={formData.name}
      onblur={() => handleBlur('name')}
      class={getInputClasses('name')}
      placeholder="Seu nome completo"
      disabled={status === 'submitting'}
    />
    {#if touched.name && errors.name}
      <p class="mt-1 text-sm text-red-400">{errors.name}</p>
    {/if}
  </div>

  <!-- Email -->
  <div>
    <label for="email" class="block text-sm font-medium text-white mb-2">
      Email <span class="text-duda-verde">*</span>
    </label>
    <input
      type="email"
      id="email"
      bind:value={formData.email}
      onblur={() => handleBlur('email')}
      class={getInputClasses('email')}
      placeholder="seu@email.com"
      disabled={status === 'submitting'}
    />
    {#if touched.email && errors.email}
      <p class="mt-1 text-sm text-red-400">{errors.email}</p>
    {/if}
  </div>

  <!-- WhatsApp -->
  <div>
    <label for="whatsapp" class="block text-sm font-medium text-white mb-2">
      WhatsApp
    </label>
    <input
      type="tel"
      id="whatsapp"
      bind:value={formData.whatsapp}
      onblur={() => handleBlur('whatsapp')}
      class={getInputClasses('whatsapp')}
      placeholder="(00) 00000-0000"
      disabled={status === 'submitting'}
    />
    {#if touched.whatsapp && errors.whatsapp}
      <p class="mt-1 text-sm text-red-400">{errors.whatsapp}</p>
    {/if}
  </div>

  <!-- Service -->
  <div>
    <label for="service" class="block text-sm font-medium text-white mb-2">
      Qual serviço te interessa? <span class="text-duda-verde">*</span>
    </label>
    <select
      id="service"
      bind:value={formData.service}
      onblur={() => handleBlur('service')}
      class={getInputClasses('service')}
      disabled={status === 'submitting'}
    >
      {#each services as service}
        <option value={service.value}>{service.label}</option>
      {/each}
    </select>
    {#if touched.service && errors.service}
      <p class="mt-1 text-sm text-red-400">{errors.service}</p>
    {/if}
  </div>

  <!-- Message -->
  <div>
    <label for="message" class="block text-sm font-medium text-white mb-2">
      Conta mais sobre seu projeto <span class="text-duda-verde">*</span>
    </label>
    <textarea
      id="message"
      bind:value={formData.message}
      onblur={() => handleBlur('message')}
      class="{getInputClasses('message')} min-h-[120px] resize-y"
      placeholder="Descreva seu projeto, ideias, prazos..."
      disabled={status === 'submitting'}
    ></textarea>
    {#if touched.message && errors.message}
      <p class="mt-1 text-sm text-red-400">{errors.message}</p>
    {/if}
  </div>

  <!-- Error Message -->
  {#if status === 'error' && errorMessage}
    <div class="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
      {errorMessage}
    </div>
  {/if}

  <!-- Success Message -->
  {#if status === 'success'}
    <div class="p-4 rounded-xl bg-duda-verde/10 border border-duda-verde/30 text-duda-verde text-sm flex items-center gap-2">
      <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      Mensagem enviada com sucesso! Entraremos em contato em breve.
    </div>
  {/if}

  <!-- Submit Button -->
  <button
    type="submit"
    class="btn-primary w-full py-4 text-lg"
    disabled={status === 'submitting'}
  >
    {#if status === 'submitting'}
      <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Enviando...
    {:else if status === 'success'}
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      Enviado!
    {:else}
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
      Enviar Mensagem
    {/if}
  </button>
</form>

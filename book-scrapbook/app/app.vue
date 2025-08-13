<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// Configuração global da aplicação

// Meta tags que se aplicam a toda a aplicação como fallback
// Páginas individuais podem sobrescrever essas configurações
useHead({
  titleTemplate: "%s - Book Scrapbook", // Template para títulos: "Home - Book Scrapbook"
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      name: "description",
      content:
        "Your personal digital scrapbook for discovering and tracking amazing books",
    },
  ],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});

// Aqui você poderia adicionar configurações globais como:
// - Autenticação global
// - Providers de estado (Pinia stores)
// - Configurações de tema
// - Event listeners globais

// Exemplo de como você poderia adicionar um store global:
// const userStore = useUserStore()
//
// onMounted(() => {
//   // Verificar se usuário está logado
//   userStore.checkAuthStatus()
// })
</script>

<style>
/* 
  Estilos globais que se aplicam a toda a aplicação
  Mantenha isso mínimo - estilos específicos devem ficar nos componentes
*/

html {
  /* Fonte padrão para toda a aplicação */
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;

  /* Suavizar o scroll em navegadores que suportam */
  scroll-behavior: smooth;
}

body {
  /* Remover margens padrão do navegador */
  margin: 0;
  padding: 0;

  /* Garantir que a aplicação ocupe toda a altura */
  min-height: 100vh;

  /* Melhorar a renderização de texto */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  /* 
    Garantir que o contêiner principal ocupe toda a altura
    Isso permite que layouts filhos usem altura relativa
  */
  min-height: 100vh;
}

/* 
  Classes utilitárias globais que podem ser úteis 
  em qualquer lugar da aplicação
*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 
  Estilos para melhorar acessibilidade
*/
.focus\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
    var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
    calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
    var(--tw-shadow, 0 0 #0000);
}
</style>

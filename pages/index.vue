<template>
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold underline mb-6">Documentação do Teste SUTHUB</h1>
      
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Introdução</h2>
        <p class="text-base leading-relaxed">
          Esta aplicação foi desenvolvida para o teste da SUTHUB, cujo objetivo é implementar uma solução web com três páginas principais, cada uma com funcionalidades específicas e integração a uma API pública. As tecnologias utilizadas incluem Vue 3, Nuxt 3, e Headless UI, com foco em usabilidade, organização visual e implementação de validações eficientes. A seguir, descrevo as principais funcionalidades implementadas e suas características.
        </p>
      </section>
  
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Página 1: Cadastro de Usuário</h2>
        <ul class="list-disc ml-6 space-y-2 text-base">
          <li><strong>Nome Completo:</strong> Deve conter pelo menos duas palavras.</li>
          <li><strong>CPF:</strong> Validação com base nas regras oficiais brasileiras, com máscara automática de pontuação.</li>
          <li><strong>Data de Nascimento:</strong> O usuário deve ter entre 18 e 65 anos, com a data formatada no padrão brasileiro.</li>
          <li><strong>Telefone Celular:</strong> Validação para número de telefone com DDD e máscara automática.</li>
          <li><strong>CEP:</strong> Inclui máscara e busca automática de endereço ao digitar o CEP. Os campos de endereço, bairro, cidade e estado são preenchidos automaticamente.</li>
          <li><strong>Renda Mensal:</strong> Campo numérico, com valor mínimo de R$ 1000,00 e prepend de "R$".</li>
          <li><strong>Possui Carro:</strong> Implementado com um toggle "sim" ou "não", onde a opção "sim" é obrigatória.</li>
          <li><strong>Espécie do Pet:</strong> Toggle para selecionar entre "cão" ou "gato", que altera dinamicamente o select das raças correspondentes.</li>
        </ul>
      </section>
  
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Página 2: Galeria de Receitas e Busca por Tags</h2>
        <p class="text-base leading-relaxed mb-4">
          A página de galeria de receitas permite visualizar e filtrar receitas obtidas da API pública de receitas.
        </p>
        <h3 class="text-xl font-semibold mb-2">Funcionalidades:</h3>
        <ul class="list-disc ml-6 space-y-2 text-base">
          <li>Exibe uma galeria de receitas, mostrando imagem, nome e tags das receitas.</li>
          <li>Permite selecionar múltiplas tags para filtrar receitas por categorias específicas.</li>
          <li>Inclui uma busca funcional por tags, com as tags organizadas em ordem alfabética.</li>
          <li>Apresenta os detalhes da receita em uma modal ou nova página.</li>
        </ul>
      </section>
  
      <section class="mb-8">
        <h3 class="text-xl font-semibold mb-2">Limitações:</h3>
        <p class="text-base leading-relaxed">
          A API não oferece busca por múltiplas tags, então foi implementada uma lógica customizada para realizar essa busca.
        </p>
      </section>
  
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Página 3: Lista e Busca de Usuários</h2>
        <p class="text-base leading-relaxed mb-4">
          Essa página exibe uma lista de usuários obtidos da API pública de usuários, com uma lógica de paginação e busca por nome.
        </p>
        <h3 class="text-xl font-semibold mb-2">Funcionalidades:</h3>
        <ul class="list-disc ml-6 space-y-2 text-base">
          <li>Exibe uma tabela com os dados dos usuários, incluindo foto, nome completo, data de nascimento, gênero e localização.</li>
          <li>Botão que abre o Google Maps centralizado nas coordenadas geográficas do usuário.</li>
          <li>Campo de busca por nome, que retorna os usuários correspondentes.</li>
          <li>Paginação implementada para exibir 20 usuários por página.</li>
        </ul>
      </section>
  
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Considerações Finais</h2>
        <p class="text-base leading-relaxed">
          A aplicação foi desenvolvida com foco em usabilidade e na correta validação e exibição de dados. A integração com APIs públicas foi implementada para garantir a robustez do sistema, e a interface foi construída utilizando o Headless UI para proporcionar uma experiência de usuário agradável e moderna.
        </p>
      </section>
    </div>
  </template>
  
  <script>
  import { reactive, toRefs } from 'vue'
  
  export default {
    setup() {
      const state = reactive({
        count: 0,
      })
  
      return {
        ...toRefs(state),
      }
    },
  }
  </script>
  
  <style scoped>
  </style>
  
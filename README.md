# Teste Suthub

Esta aplicação foi desenvolvida para o teste da **SUTHUB**, onde o objetivo é implementar uma solução web com três páginas principais, cada uma com funcionalidades específicas e integração a uma API pública. As tecnologias utilizadas incluem **Vue 3**, **Nuxt 3**, **Headless UI** e **Docker**. O foco está em usabilidade, organização visual e implementação de validações. A aplicação é containerizada com Docker, garantindo consistência no ambiente de desenvolvimento.

## Tecnologias Utilizadas

- **Vue 3** (com Composition API)
- **Nuxt 3**
- **Headless UI**
- **TypeScript**
- **Docker** (para containerização da aplicação)
- **VeeValidate** (para validações)
- **Axios** (para chamadas à API DummyJSON)

---

## Menu de Navegação

- [Iniciar com Docker](#1-iniciar-com-docker)
- [Executar Localmente usando o Nuxt 3](#2-executar-localmente-usando-o-nuxt-3)

---

## Como Executar a Aplicação

### 1. Iniciar com Docker

Você pode rodar a aplicação utilizando Docker, o que facilita a configuração do ambiente. Siga os passos abaixo:

#### Passos para rodar a aplicação com Docker:

1. **Construir e iniciar a aplicação com Docker Compose:**
   No diretório raiz do projeto, execute o seguinte comando para construir e iniciar os containers da aplicação:

   ```bash
   docker-compose up -d --build

   ```bash
   http://localhost:3000


### 2. Executar Localmente usando o Nuxt 3

Se preferir executar a aplicação localmente sem Docker, você pode usar o Nuxt para desenvolvimento:

#### Passos para executar a aplicação localmente:

1. **Instalar dependências:**
   No diretório raiz do projeto, instale as dependências usando npm:

   ```bash
   npm install

2. **Iniciar a aplicação em modo de desenvolvimento:**
  Para iniciar a aplicação em modo de desenvolvimento, rode o seguinte comando:

   ```bash
   npm run dev

3. **Acessar a aplicação:**
   Abra o navegador e acesse o seguinte endereço:

   ```bash
   http://localhost:3000

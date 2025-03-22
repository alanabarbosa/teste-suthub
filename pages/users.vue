<template>
  <div class="px-4 lg:px-0 lg:py-0 md:px-8 sm:px-8 container flex justify-center flex-col mt-8 w-full my-0 mx-auto">
    <h2>Lista de usuários</h2>
    <!-- Integra o componente de busca -->
    <Search @search="onSearch" />

    <!-- Exibe uma mensagem enquanto os dados estão sendo carregados -->
    <div v-if="isLoading" class="text-center py-10">
      <p>Carregando usuários...</p>
    </div>

    <!-- Exibe a tabela de usuários com paginação -->
    <div v-else>
      <Table :headers="tableHeaders" :rows="formattedUsers" />

      <Pagination 
        :totalItems="totalUsers" 
        :itemsPerPage="itemsPerPage" 
        :currentPage="currentPage"
        @changePage="onPageChange" 
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted } from 'vue';
import Table from "@/components/Table.vue";
import Search from "@/components/Search.vue";
import Pagination from "@/components/Pagination.vue";

// Definir a interface para o tipo de usuário
interface User {
  image: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  address: {
    coordinates: { lat: number; lng: number }[];
  };
}

export default {
  components: { Table, Pagination, Search },

  setup() {
    // Cabeçalhos da tabela
    const tableHeaders = [
      'Foto do usuário', 
      'Nome completo', 
      'Data de nascimento', 
      'Gênero', 
      'Localização'
    ];

    // Variáveis de estado
    const users = ref<User[]>([]);
    const isLoading = ref(true);
    const totalUsers = ref(0);
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const searchQuery = ref('');  // Adiciona estado para o valor da busca

    const { fetchUsers, searchUsers } = useUserService();

    // Função para formatar os usuários para a tabela
    const formattedUsers = computed(() =>
      users.value.map(user => ({
        image: user.image,
        fullName: `${user.firstName} ${user.lastName}`,
        birthDate: user.birthDate,
        gender: user.gender == "female" ? "Feminino" : "Masculino",
        location: `<a href="https://www.google.com/maps?q=${user.address.coordinates.lat},${user.address.coordinates.lng}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="text-blue-600 underline hover:text-blue-800">Exibir a localização</a>`
      }))
    );

    // Função para carregar os usuários com paginação
    const loadUsers = async () => {
      isLoading.value = true;
      try {
        const response = searchQuery.value
          ? await searchUsers(searchQuery.value)
          : await fetchUsers(currentPage.value, itemsPerPage.value);
          
        if (response.success && response.data) {
          users.value = response.data.users;
          totalUsers.value = response.data.total;
        } else {
          console.error(response.error);
        }
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      } finally {
        isLoading.value = false;
      }
    };

    // Função para manipular a busca de usuários
    const onSearch = (query: string) => {
      searchQuery.value = query;
      currentPage.value = 1; // Reinicia a página ao fazer uma nova busca
      loadUsers();
    };

    // Manipula a mudança de página
    const onPageChange = (page: number) => {
      currentPage.value = page;
      loadUsers();
    };

    // Carrega os usuários ao montar o componente
    onMounted(() => {
      loadUsers();
    });

    return {
      tableHeaders,
      formattedUsers,
      totalUsers,
      currentPage,
      itemsPerPage,
      isLoading,
      onPageChange,
      onSearch
    };
  },
};
</script>

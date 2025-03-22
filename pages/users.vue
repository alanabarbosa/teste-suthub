<template>
  <div class="px-4 lg:px-0 lg:py-0 md:px-8 sm:px-8 container flex justify-center flex-col mt-8 w-full my-0 mx-auto">
    <CustomTitle title="Lista de usuários" />
    <Search @search="onSearch" />
    <div v-if="isLoading" class="text-center py-10">
      <Loading />
    </div>
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
import CustomTitle from "@/components/Title.vue";
import Search from "@/components/Search.vue";
import Pagination from "@/components/Pagination.vue";

interface User {
  image: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  address: {
    coordinates: { lat: number; lng: number };
  };
}

export default {
  components: { Table, Pagination, Search, CustomTitle },

  setup() {
    const tableHeaders = [
      'Foto do usuário', 
      'Nome completo', 
      'Data de nascimento', 
      'Gênero', 
      'Localização'
    ];

    const users = ref<User[]>([]);
    const isLoading = ref(true);
    const totalUsers = ref(0);
    const currentPage = ref(1);
    const itemsPerPage = ref(20);
    const searchQuery = ref('');

    const { fetchUsers, searchUsers } = useUserService();

    const formattedUsers = computed(() =>
      users.value.map(user => ({
        image: user.image,
        fullName: `${user.firstName} ${user.lastName}`,
        birthDate: new Date(user.birthDate).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }),
        gender: user.gender == "female" ? "Feminino" : "Masculino",
        location: `<a href="https://www.google.com/maps?q=${user.address.coordinates.lat},${user.address.coordinates.lng}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="text-blue-600 underline hover:text-blue-800">Exibir a localização</a>`
      }))
    );

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

    const onSearch = (query: string) => {
      searchQuery.value = query;
      currentPage.value = 1; 
      loadUsers();
    };
   
    const onPageChange = (page: number) => {
      currentPage.value = page;
      loadUsers();
    };

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
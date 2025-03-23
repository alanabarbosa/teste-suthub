import { ref } from 'vue';

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


interface ApiResponse {
  success: boolean;
  data?: {
    users: User[];
    total: number;
    skip: number;
    limit: number;
  };
  error?: string;
}

export const useUserService = () => {
  const totalUsers = ref(0);
  const users = ref<User[]>([]);

  // Função para buscar todos os usuários com paginação
  const fetchUsers = async (page: number = 1, limit: number = 20): Promise<ApiResponse> => {
    try {
      const skip = (page - 1) * limit;
      const response = await fetch(`https://dummyjson.com/users?sortBy=firstName&order=asc&limit=${limit}&skip=${skip}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        totalUsers.value = data.total || 0;
        return {
          success: true,
          data: {
            users: data.users || [],
            total: data.total || 0,
            skip: data.skip || 0,
            limit: data.limit || 10,
          },
        };
      } else {
        return { success: false, error: `Erro ao buscar os usuários: ${response.status}` };
      }
    } catch (error) {
      return { success: false, error: `Erro na requisição: ${error instanceof Error ? error.message : 'Desconhecido'}` };
    }
  };

  // Função para buscar usuários por nome
  const searchUsers = async (query: string): Promise<ApiResponse> => {
    try {
      const response = await fetch(`https://dummyjson.com/users/search?q=${query}&sortBy=firstName&order=asc`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        totalUsers.value = data.total || 0;
        return {
          success: true,
          data: {
            users: data.users || [],
            total: data.total || 0,
            skip: 0,
            limit: data.limit || 10,
          },
        };
      } else {
        return { success: false, error: `Erro ao buscar os usuários: ${response.status}` };
      }
    } catch (error) {
      return { success: false, error: `Erro na requisição: ${error instanceof Error ? error.message : 'Desconhecido'}` };
    }
  };

  return {
    fetchUsers,
    searchUsers,
    totalUsers,
    users,
  };
};

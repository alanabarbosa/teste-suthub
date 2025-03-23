import { useNuxtApp } from '#app';

export const useLocalStorage = () => {
  const saveToLocalStorage = <T>(key: string, value: T): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Erro ao salvar "${key}" no localStorage:`, error);
    }
  };
  
  const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
    try {
      if (typeof window !== 'undefined') {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
      }
      return defaultValue;
    } catch (error) {
      console.error(`Erro ao recuperar "${key}" do localStorage:`, error);
      return defaultValue;
    }
  };

  return {
    saveToLocalStorage,
    getFromLocalStorage
  };
};
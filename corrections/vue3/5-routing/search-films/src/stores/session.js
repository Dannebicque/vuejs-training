import { defineStore } from "pinia";
import { ref } from 'vue';

export const useSession = defineStore('session', () => {
  const user = ref(null);
  const loggedIn = ref(false);

  function login({ user: newUser }) {
    loggedIn.value = true;
    user.value = newUser;
  }

  function logout() {
    loggedIn.value = false;
    user.value = null;
  }

  return {
    user,
    loggedIn,
    login,
    logout
  };
});

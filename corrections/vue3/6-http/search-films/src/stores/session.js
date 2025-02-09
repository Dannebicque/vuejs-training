import { defineStore } from "pinia";
import { ref } from 'vue';

export const useSession = defineStore('session', () => {
  const user = ref(null);
  const token = ref(null);
  const loggedIn = ref(false);

  function login({ user: newUser, token: newToken }) {
    loggedIn.value = true;
    user.value = newUser;
    token.value = newToken;
  }

  function logout() {
    loggedIn.value = false;
    user.value = null;
    token.value = null;
  }

  return {
    user,
    token,
    loggedIn,
    login,
    logout
  };
});

<template>
  <div id="login-form">
    <form @submit.prevent="login">
      <h1>{{ title }}</h1>
      <p>Fill out this form to login.</p>
      <hr />

      <label for="email"><b>Email</b></label>
      <input type="text" v-model="email" placeholder="Enter your email" id="email" name="email" required />

      <label for="psw"><b>Password</b></label>
      <input type="password" v-model="password" placeholder="Enter your password" id="psw" name="psw" required />

      <p>
        <button type="submit">Login</button>
        <button @click.prevent="register">Create an account</button>
      </p>
      <p class="error" v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import UserService from "../services/UserService";
import { useSession } from "../stores/session";
import { useRouter } from 'vue-router';

const title = ref("Authentication");
const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();
const session = useSession();

const register = async () => {
  error.value = null;
  try {
    const response = await UserService.register({
      email: email.value,
      password: password.value,
      firstname: 'John',
      lastname: 'Smith'
    });
    session.login({ user: response.user, token: response.token });
    router.push('/search');
  } catch (err) {
    error.value = err.toString();
  }
};

const login = async () => {
  error.value = null;
  try {
    const response = await UserService.login({ email: email.value, password: password.value });
    session.login({ user: response.user, token: response.token });
    router.push('/search');
  } catch (err) {
    error.value = err.toString();
  }
};

</script>
<template>
<div id="login-form">
  <form @submit.prevent="login">
    <h1>{{ title }}</h1>
    <p>Fill out this form to login.</p>
    <hr />

    <label for="email"><b>Email</b></label>
    <input
      type="text"
      v-model="email"
      placeholder="Enter your email"
      id="email"
      name="email"
      required
    />

    <label for="psw"><b>Password</b></label>
    <input
      type="password"
      v-model="password"
      placeholder="Enter your password"
      id="psw"
      name="psw"
      required
    />

    <p><button type="submit">Login</button></p>
    <p class="error" v-if="error">{{ error }}</p>
  </form>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSession } from "@/stores/session";

const title = ref("Authentication");
const email = ref("");
const password = ref("");
const error = ref("");

const router = useRouter();
const session = useSession();

function login() {
  error.value = null;

  if (email.value === "test@test.com" && password.value === "test1234") {
    session.login({ user: { firstname: "John", lastname: "Smith" } });
    router.push('/search');
  } else {
    error.value = `Invalid credentials 😕`;
  }
}
</script>
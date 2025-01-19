<template>
  <LoginForm v-if="!loggedIn" @login="onLogin" />
  <SearchFilm v-else />
</template>

<script setup>
import { ref } from "vue";
import LoginForm from "./components/LoginForm.vue";
import SearchFilm from "./components/SearchFilm.vue";

const loggedIn = ref(false)

const onLogin = () => {
  loggedIn.value = true

}
</script>

<style>
@import './assets/base.css';
</style>

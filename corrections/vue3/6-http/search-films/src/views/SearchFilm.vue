<template>
  <div id="search-film">
    <h1>Search Films</h1>
    <form @submit.prevent="searchFilms">
      <label for="search">Search :</label>
      <input id="search" type="text" ref="search" v-model="query" />
    </form>

    <p>{{ numberResults }} results</p>

    <ul class="films">
      <Film :film="film" v-for="film in films" :key="film.title+film.released"></Film>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import Film from "../components/Film.vue";
import FilmService from "../services/FilmService";

const query = ref('');
const films = ref([]);

const numberResults = computed(() => films.value.length);

const searchFilms = async () => {
    films.value = await FilmService.search(query.value);
};


watch(query, async () => {
    films.value = await FilmService.search(query.value);
});
</script>

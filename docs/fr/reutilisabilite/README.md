# API de Composition

::: tip
L'API de composition est une nouveauté de Vue 3.0, mais peut être utilisée sur les projets Vue 2 grâce au plug-in [@vue/composition-api](https://github.com/vuejs/composition-api).
:::

Avec le temps, certains composants d'une application peuvent devenir très lourds, avec de plus en plus de data, méthodes, computed, watchers et autres options. Il convient dans la mesure du possible de les découper en plus petits composants, mais cela ne suffit pas parfois pour s'y retrouver.

Dans cette situation, des variables destinées à être utilisées conjointement se retrouvent très éloignées et dispersées dans le code de gros composants complexes. Idéalement, on souhaiterait regrouper ensemble les options par même logique métier, et non par type (méthode, data etc.). 

Pour palier à ce problème, Vue 3 propose une API alternative pour déclarer des composants: la **Composition API**.

Prenons cet exemple utilisant l'API Options que vous connaissez:

```vue
<template>
  <ul>
    <li v-for="todo in todos" :key="todo.label">
      <input type="checkbox" v-model="todo.done"> {{todo.label}}
    </li>
    <li>
      <input type="text" v-model="newTodo" placeholder="New task">
      <button @click="addTodo" :disabled="hasNoLabel">Add to todolist</button>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      todos: [],
      newTodo: ""
    }
  },
  computed: {
    hasNoLabel(){
      return this.newTodo.trim() === ""
    }
  },
  methods: {
    addTodo(){
      this.todos.push({ label: this.newTodo, done: false })
      this.newTodo = ""
    }
  }
}
</script>
```

Voilà comment il peut être réécrit en utilisant la Composition API:

```vue
<template>
  <ul>
    <li v-for="todo in todos" :key="todo.label">
      <input type="checkbox" v-model="todo.done"> {{todo.label}}
    </li>
    <li>
      <input type="text" v-model="newTodo" placeholder="New task">
      <button @click="addTodo" :disabled="hasNoLabel">Add to todolist</button>
    </li>
  </ul>
</template>

<script setup>
import { ref, reactive, computed } from "vue"

const todos = reactive([])
const newTodo = ref("")
const hasNoLabel = computed(() => newTodo.value.trim() === "")

function addTodo(){
  todos.push({ label: newTodo.value, done: false })
  newTodo.value = ""
}
</script>
```

Outre le fait que le code est plus synthétique, vous pouvez observer les changements suivants:
- avec l'attribut  `setup` de la balise `<script>`, les data, computed, méthodes et autres options peuvent être déclarées au niveau racine du script dans n'importe quel ordre ; plus besoin de les regrouper par type
- les options ne sont plus rattachées à un objet (`this.todos`) mais manipulées comme des variables indépendantes ; cela implique de les déclarer via des fonctions spécifiques fournies par Vue
- pour être réactives, les données doivent maintenant être déclarées avec les méthodes `reactive` et `ref`
- `ref` est utilisé pour encapsuler les valeurs primitives telles que la String `newTodo` dans une structure d'objet `{ value }` afin que vous puissiez changer leur valeur sans changer leur référence (mutation et pas réassignation) ; autrement, Vue perdrait la trace de cette variable (voir la [section Réactivité](../reactivite/)).
- les données stockées comme propriétés d'objets ou éléments de listes n'ayant pas ce problème de réassignement, vous pouvez les déclarer avec la méthode `reactive`

En bref, avec l'**API Options** est exporté par défaut un objet contenant toutes les options regroupées par type, tandis qu'avec l'API Composition, on exporte individuellement les différentes options. La Composition API tient son nom du fait que l'on peut déplacer certaines de ses options dans des fichiers séparés, que l'on viendra réutiliser et composer entre vos différents composants.

L'**API de Composition** est aujourd'hui la meilleure façon de composer de la logique dans les composants Vue, et a supplanté la solution précédente, les [mixins](https://vuejs.org/v2/guide/mixins.html), qui pourraient être amenées à disparaître à l'avenir si ce style d'écriture est adopté massivement par la communauté.

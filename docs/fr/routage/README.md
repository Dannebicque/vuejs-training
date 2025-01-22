# Routage

Les applications Vue sont la plupart du temps des Single Page Applications (SPA), c'est-à-dire que le serveur dessert toujours une seule et même page, et la navigation entre les pages est gérée côté client en JavaScript. Cette approche permet des transitions plus fluides entre pages, et de réduire le nombre d'appels nécessaires au serveur pour naviguer entre les pages. Cela s'avère essentiel pour les Progressive Web Apps ou les applications web souhaitant disposer de fonctionnalités offline.

Le routage d'une SPA est donc géré côté client, et l'équipe de Vue fournit une bibliothèque à cet effet: `vue-router`. Ce routeur permet d'associer des routes (URL) à des composants Vue, et propose de nombreuses fonctionnalités :

- Arborescence de routes
- Configuration modulaire basée sur les composants
- Gestion de paramètres dynamiques : path, query, wildcards...
- Intégration avec le système de transitions de Vue
- Deux modes de fonctionnement :
  - par `hash` (monsite.com/**#**/page1)
  - ou par `history` (manipulation de l'historique en JS avec auto-fallback pour IE)

La documentation complète se trouve ici : [https://router.vuejs.org/](https://router.vuejs.org/)

## Installation

Si vous ne l'avez pas installé pendant la configuration initiale du projet, vous pouvez maintenant installer `vue-router` avec `npm`.

Créez un dossier `src/router` et un fichier `router/index.js` qui contiendra la configuration du routeur. Le fichier `main.js` devra être modifié pour déclarer ce nouveau routeur dans l'application:

```bash
npm install vue-router@4
```

```js{5}
...
import router from "./router";
...

createApp(App)
	.use(router)
	.mount("#app")
```


## Configuration du routeur

Le routeur est créé en prenant en paramètres un ensemble de routes. Chaque route associe un pattern d'URL à un certain composant. Au chargement de la page, ou à chaque changement d'URL, le routeur va résoudre quelle route est associée à cette nouvelle URL.

```js
/** src/router/index.js **/
import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from "@/components/HelloWorld.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/hello/:name",
      name: "hello",
      component: HelloWorld
    }
  ]
});

export default router;
```

Une fois la résolution de la route terminée, un composant a été associé à l'URL en cours. Ce composant est alors injecté à la place de l'élément `<router-view />`. Cet élément est généralement placé dans le composant racine `App.vue`. Les éléments autour de `<router-view />` forment le layout structurant votre application : un header, une barre de navigation, un footer etc.

```vue
<template>
  <div class="app">
    <header><h1>Mon site web</h1></header>
    <router-view />
    <footer>Made with Vue</footer>
  </div>
</template>
```

## Navigation et router-link

Vue-router inclut un composant `<router-link>` déclaré globalement, qui peut se substituer aux balises `<a>` pour tout ce qui est navigation interne via ce routeur.

L'avantage de ce composant par rapport aux balises classiques `<a>` est que les liens s'adaptent à votre configuration (hash ou history) et peuvent être statiques ou dynamiquement générés par des noms de route et des listes de paramètres :

```vue
<router-link to="/home">Page d'accueil</router-link>
<router-link :to="{ name: 'home'}">Page d'accueil (nommée)</router-link>
<router-link :to="{ name: 'hello', params: { name: 'John' } }">
  Lien dynamique
</router-link>
<router-link :to="`/home/${name}`">Page d'accueil</router-link>
<router-link to="/home/toto">Page d'accueil</router-link>
```

Le routeur dispose de méthodes pour naviguer programmatiquement entre les pages:

```javascript
import { useRoute, useRouter } from 'vue-router'

const router = useRouter() // le router global
const route = useRoute() // la route en cours
​
// Pour récupérer un paramètre de l'URL
let id = route.params.id //si un paramètre id est défini sur la route

// récupérer la route courante
let currentRoute = router.currentRoute.value

router.push('/home'); // naviguer vers une nouvelle page
router.push(`/article/${nextId}`); // naviguer vers une nouvelle page par URL

router.replace('/home'); // remplacer la page actuelle

router.go(-1); // aller à page précédente
```


## TP: Implémentation du routeur

1. Si ce n'est pas déjà fait, installez vue-router sur votre projet en suivant les instructions ci-dessus. Ajoutez l'élément `<router-view>` dans `App.vue` puis créez le fichier `src/router/index.js` pour commencer à configurer les routes.

2. Ajouter une route `/login` reliée à la view `LoginForm` (créer le composant vide pour le moment) et une route `/search` reliée à `SearchFilm`.

::: tip
Par convention, on appelle les composants rattachés à des routes des _views_, et on les place généralement dans le dossier `src/views` plutôt que `src/components`.
:::

1. Ajoutez à la configuration des routes des redirections vers la route `/search` pour la route par défaut (`/`) et pour toutes les autres routes non reconnues ( `/:pathMatch(.*)*`) :


```javascript
{
  path: "/",
  redirect: "/search",
},
{ 
  path: '/:pathMatch(.*)*', 
  redirect: "/search"
}
```

1. A l'aide de la documentation de [vue-router](https://router.vuejs.org/api/), remplacez la bascule entre `LoginForm` et `SearchFilm` à base de `v-if` par une navigation d'une route à une autre avec `<router-view>`.

2. Naviguez programmatiquement vers la route `/search` après l'action de login, et vers la route `/login` après l'action de logout. Vérifiez que les transitions entre les pages et les changements d'URL fonctionnent correctement.

3. **Bonus** : en utilisant les [Navigation Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html) de vue-router, redirigez l'utilisateur voulant accéder à la page de recherche de films vers `/login` si l'utilisateur n'est pas authentifié.

## Transitions

Nous allons maintenant ajouter des transitions entre les différentes vues. Pour cela, nous allons utiliser les transitions de VueJs.
VueJs propose nativement un mécanisme de transition entre les éléments. Pour cela, il suffit de déclarer une balise `<transition>` autour de l'élément que l'on veut animer. https://vuejs.org/guide/built-ins/transition.html

Exemple (issue de la documentation) :

```vue
<button @click="show = !show">Toggle</button>
<Transition>
  <p v-if="show">hello</p>
</Transition>
```

Et il faut ajouter le CSS associé :

```css
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
```

Ces classes sont automatiquements ajoutées par VueJs sur les éléments lors de l'ajout ou de la suppression de l'élément.

## TP: Ajout de transitions

1. Ajoutez une transition entre les différentes vues de votre application. Vous pouvez utiliser les transitions de votre choix, ou vous inspirer de la [liste des transitions](https://vuejs.org/guide/built-ins/transition.html) proposées par VueJs.

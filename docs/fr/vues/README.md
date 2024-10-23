# Vues

## Aperçu d'un projet Vue

Le projet Vue fraîchement créé a les dossiers et fichiers suivants :

- `src` : les sources de votre projet
- `public` : tout le contenu qui sera directement mis à la racine du serveur web, sans être passé par Webpack
- `package.json` : les informations de package NPM du projet (version, dépendances, scripts etc.)
- `vite.config.js` : le fichier de configuration pour Vite sur ce projet

D'autres fichiers de configuration pour les outils de build peuvent également se trouver ici.

Dans le dossier `src`, vous trouvez :

- `assets` : des ressources statiques (images, fichiers) qui seront importées par Webpack au sein de vos composants Vue
- `components` : vos composants Vue (répartis par dossier par "module" de votre application)
- `App.vue` : votre composant Vue racine, qui contient toute l'application
- `main.js` : le point d'entrée du code JavaScript de toute l'application

Par la suite, vous pourrez être amenés à créer d'autres dossiers dans `src` selon vos besoins. On trouve par exemple couramment un dossier `services` qui contient des briques de logique métier avec des fonctions utilisées dans plusieurs composants. Ou encore un dossier `utils` pour venir stocker diverses fonctions utilitaires en JavaScript plutôt que de les répéter à plusieurs endroits.

![Cheat sheet de la structure de fichiers d'un projet Vue](../../assets/vue-project-file-structure.jpg)

## Fichiers monocomposants *.vue

- Une application dans Vue.js est divisée en plusieurs composants
- Un composant correspond à un fichier `.vue`
- Un fichier `.vue` se compose de trois éléments optionnels :
    - la balise `<template>` contient le code HTML du composant
    - la balise `<script setup>` (optionnelle) contient le code JavaScript du composant
      - La mention setup permet d'utiliser la syntaxe Composition API. Sans cette mention, on utilise la syntaxe Options API par défaut.
    - la balise `<style>` (optionnelle) contient le style CSS du composant

```vue
<template>
  <div>
    <span>Hello {{who}}</span>
  </div>
</template>

<script setup>
const who = 'world'
</script>

<style scoped>
span {
  color: blue;
}
</style>
```

La version en Option API du même composant :

```vue
<template>
  <div>
    <span>Hello {{who}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      who: 'world'
    }
  }
}
</script>

<style scoped>
span {
  color: blue;
}

</style>
```

Vous noterez que la syntaxe est plus concise avec la syntaxe Composition API, et que le code est plus facile à structurer et à lire.

::: tip

Par la suite nous n'évoquerons que la syntaxe par Composition Api, mais la document de vueJs est très bien faite et vous permettra de vous familiariser avec la syntaxe par Options API avec dans la majorité des cas une traduction directe entre les deux.

:::

## Travailler en composants

Les composants Vue décrits précédemment constituent les briques avec lesquelles vous allez concevoir vos interfaces web. Une application web est composée de petits composants réutilisables, imbriqués dans des composants de plus haut niveau pour former le layout, l'agencement de vos éléments sur la page. Cette structure peut être décrite comme un **arbre de composants**.

![Component tree](../../assets/component-tree.png)

Pour relier les composants entre eux, on déclare les composants enfants dans le template du composant parent, en utilisant leur nom comme balise. Un composant peut être réutilisé autant de fois que nécessaire, en l'incluant de la façon suivante :

```vue
<!-- MonComposant.vue -->
<template>
  <div>
    <mon-composant-enfant></mon-composant-enfant>
  </div>
</template>

<script setup>
import MonComposantEnfant from './MonComposantEnfant.vue'
</script>
```

Dans votre projet Vue, ouvrez le fichier `App.vue` et observez comment le composant `HelloWorld` a été intégré au composant racine `App`.

## Interpolation de texte dans les templates

::: v-pre
Le moyen le plus simple d'insérer des données dynamiquement dans vos composants est par interpolation de texte, au moyen de la syntaxe `{{ maVariable }}`. A l'intérieur des doubles accolades, vous pouvez indiquer n'importe quelle expression JavaScript valide :
:::

```vue
<template>
  <p>Commande ref. {{ referenceCommande }} - Total : {{ prix.toFixed(2)+'€' }}</p>
</template>

<script setup>
const referenceCommande = 'ABCXYZ'
const prix = 17.3
</script>
```

L'interpolation ne fonctionne que sur le contenu textuel des éléments. Vous ne pouvez pas l'utiliser pour changer la valeur d'attributs HTML ou pour insérer du code HTML par exemple. Pour cela, vous devrez recourir aux *directives*, que l'on verra dans la section suivante.

## TP : Premier composant

Le projet Vue a été initialisé avec des composants et des styles existants dans les dossiers `src/components` et `src/assets`. Vous pouvez y jeter un oeil et les supprimer si vous le souhaitez, vous n'en aurez pas besoin.

1. Remplacez la feuille de style CSS qui servira de base pour tout le TP, téléchargeable ici : [base.css](https://raw.githubusercontent.com/moshifr/vuejs-training/main/base.css). Vous devez la placer dans le dossier `src/assets`. Notez comment elle est incluse dans le projet avec `@import './assets/base.css'` dans la partie `<style>` de `App.vue`. Vous pouvez supprimer les autres styles existants.

2. Créer un nouveau composant `LoginForm.vue` contenant un formulaire d'authentification :

```html
<div id="login-form">
<form>
  <h1>Authentification</h1>
  <p>Remplissez ce formulaire pour vous connecter.</p>
  <hr>

  <label for="email"><b>Email</b></label>
  <input type="text" placeholder="Entrez votre courriel" id="email" name="email" required>

  <label for="psw"><b>Mot de passe</b></label>
  <input type="password" placeholder="Entrez votre mot de passe" id="psw" name="psw" required>

  <p><button type="submit">Se connecter</button></p>
</form>
</div>
```

1. Supprimez le contenu existant du template du composant `App.vue`, et affichez le composant `LoginForm.vue` à la place avec `<LoginForm />`. N'oubliez pas d'importer le composant.

2. Complétez le fichier `LoginForm.vue` pour déclarer une variable `title`. Utiliser ensuite l'interpolation de texte dans le template pour passer le titre du formulaire *"Authentification"* en utilisant cette variable `title`.
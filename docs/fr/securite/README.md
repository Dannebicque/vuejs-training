# Gestionde la sécurité

## Gestion de l'authentification avec Vuejs et ApiPlatform

### Introduction et JWT

JWT (Json Web Token) (https://jwt.io/) est un standard ouvert (RFC 7519) qui définit une manière compacte et autonome pour sécuriser les échanges de données entre plusieurs parties. Ces données sont sous forme de JSON et peuvent être vérifiées et validées car elles sont signées numériquement. Les JWT peuvent être signés à l'aide d'un secret (avec l'algorithme HMAC) ou d'une paire de clés publique/privée à l'aide de RSA ou ECDSA.

L'interet d'utiliser un token JWT est de sécuriser l'échange de données entre le front et le back. Le token est généré par le serveur après une authentification réussie et est ensuite envoyé au client. Le client doit ensuite envoyer ce token à chaque requête pour prouver son identité.

### Mise en place de l'authentification

**On considère que la partie back est opérationnelle. Sinon vous reporter à la documentation d'ApiPlatform et au cours sur Symfony (WR505D).**

Depuis la partie front en VueJs, nous allons mettre en place un formulaire de connexion, récupérer les informations, les envoyer au serveur et récupérer le token JWT. Ce token sera ensuite stocké dans le local storage du navigateur, afin de pouvoir être utilisé pour chaque requête. Exemple de code :

```html
<template>
  <div>
    <h1>Connexion</h1>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Nom d'utilisateur">
      <input type="password" v-model="password" placeholder="Mot de passe">
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
//utilisation de fetch pour envoyer les données, mais axos pourrait aussi fonctionner

const username = ref('');
const password = ref('');

const login = async () => {
  const response = await fetch('http://localhost:8000/api/login_check', { //vérifier l'url
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username.value, //normalement c'est les variables par défaut, à contrôler avec votre back
      password: password.value,
    }),
  });
  const data = await response.json();
  localStorage.setItem('token', data.token);
};
</script>
```

* Exemple de code pour envoyer le token avec chaque requête, en utilisant fetch (mais axios pourrait aussi fonctionner) :

```javascript
const response = await fetch('http://localhost:8000/api/mon_url', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    });
```

Explication des lignes

* `localStorage.setItem('token', data.token);` : stocke le token dans le local storage du navigateur
* `localStorage.getItem('token')` : récupère le token stocké dans le local storage
* `'Authorization': Bearer ${localStorage.getItem('token')}` : envoie le token dans le header de la requête

Comme nous allons devoir effectuer cette action à chaque requête à sécuriser, il est judicieux de créer un fichier `api.js` (ou le nom que vous voulez) qui contiendra les fonctions pour envoyer les requêtes sécurisées. Exemple de code (à adapter à votre projet) :

```javascript
export const api = {
  async get(url) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        });
    return await response.json();
    },
    async post(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    },
};
```

On pourrait faire de même avec Axios, qui va permettre d'intercepter les requêtes et d'ajouter le token automatiquement.

## Securisation des routes

### Introduction

Certaines de nos routes doivent être en accès limités, dépendant des droits de l'utilisateur connecté. Pour cela, nous allons utiliser Vue Router et les Guards.

### Mise en place

Pour sécuriser une route, il faut ajouter un Guard à la route. Un Guard est une fonction qui va être appelée avant l'affichage de la route. Si la fonction retourne `true`, la route est affichée, sinon, l'utilisateur est redirigé vers une autre route.

Exemple de code :

```javascript
import { createRouter, createWebHistory } from 'vue-router';
import { api } from '../api';

const routes = [
    //route a ne pas sécuriser, la home par exemple
  {
    path: '/',
    name: 'Home',
    component: Home,
    },
    //route sécurisée
    {
        path: '/secure',
        name: 'Secure',
        component: Secure,
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!localStorage.getItem('token')) {
      next('/login');
    } else {
      try {
        await api.get('http://localhost:8000/api/user'); //vérifier l'url
        next();
      } catch (e) {
        next('/login');
      }
    }
  } else {
    next();
  }
});

export default router;
```

Ici, on contrôle simplement si l'utilisateur est connecté. Si ce n'est pas le cas, on le redirige vers la page de connexion. Sinon, on vérifie si le token est toujours valide en envoyant une requête au serveur. Si la requête échoue, on redirige l'utilisateur vers la page de connexion.

Si vous voulez gérer des rôles, vous pouvez par exemple faire comme suit :

```javascript

// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { api } from '../api';
import Home from '@/views/Home.vue';
import Admin from '@/views/Admin.vue';
import Login from '@/views/Login.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true, roles: ['ROLE_ADMIN'] },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token');
    if (!token) {
      next('/login');
    } else {
      try {
        const user = await api.get('http://localhost:8000/api/user'); // vérifier l'URL
        const userRoles = user.roles;
        const requiredRoles = to.meta.roles;

        if (requiredRoles.some(role => userRoles.includes(role))) {
          next();
        } else {
          next('/login');
        }
      } catch (e) {
        next('/login');
      }
    }
  } else {
    next();
  }
});

export default router;
```

Sous cette forme, on vérifie si l'utilisateur a le rôle nécessaire pour accéder à la route. Si ce n'est pas le cas, on le redirige vers la page de connexion. Il faut que l'API retourne les rôles de l'utilisateur connecté.
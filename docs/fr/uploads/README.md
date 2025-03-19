# Mise en place d'un upload depuis VueJs vers ApiPlatform (ou autre)

## La partie front-end

L'upload de fichier depuis une application VueJs n'est pas forcément très différente d'une gestion d'upload classique. Il faut se souvenir des éléments essentiels lors d'un upload :

- La configuration de la balise form, qui doit être de type `multipart/form-data`
- L'ajout d'un input de type `file` pour sélectionner le fichier à uploader
- L'envoi de la requête POST vers le serveur

En partant de cette base là, on peut transposer dans un contexte VueJs et définir l'ensemble des éléments pour réaliser un upload.

La balise form n'est pas directement exploitée lors de la manipulation d'un fichier, on va plutôt utiliser un objet FormData pour envoyer les données. Cet objet permet de construire une requête POST avec les données que l'on souhaite envoyer.

```javascript
const formData = new FormData();
formData.append('file', file);
```

Ou `file` est l'objet récupéré depuis l'input de type `file`.

Ensuite, on peut envoyer la requête POST vers le serveur. Pour cela, on peut utiliser la méthode `fetch` de JavaScript.

```javascript
fetch('http://localhost:8000/api/files', {
  method: 'POST',
  body: formData
})
```

Mais cela ne fonctionnera pas, car le serveur attend un contenu de type `multipart/form-data`.

Il est donc nécessaire d'ajouter des options supplémentaires à la requête, comme les headers, pour spécifier le type de contenu envoyé.

```javascript
fetch('http://localhost:8000/api/files', {
  method: 'POST',
  body: formData,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
```

On peut si besoin préciser le format json (ou ld+json) et un token d'authentification, si la page est protégée.

```javascript
fetch('http://localhost:8000/api/files', {
  method: 'POST',
  body: formData,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': 'Bearer ' + token,
    'Accept': 'application/json',
  }
})
```

La partie template de VueJs peut ressembler à ceci :

```html

<template>
  <div>
    <input type="file" @change="onFileChange" />
    <button @click="uploadFile">Upload</button>
  </div>
</template>
```

Et le code JavaScript :

```javascript
<script setup>
import { ref } from 'vue';

const file = ref(null);

const onFileChange = (e) => {
    file.value = e.target.files[0];
};

const uploadFile = () => {
    const formData = new FormData();
    formData.append('file', file.value);

    fetch('http://localhost:8000/api/files', {
        method: 'POST',
        body: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });
};
</script>
```

Et voilà ! Vous avez maintenant un formulaire d'upload fonctionnel avec VueJs.

## Mais comment le traiter côté API...

La partie front-end étant prête, il est maintenant temps de s'occuper de la partie back-end. Pour cela, nous allons utiliser notre ApiPlatform qui gère les API de notre back-end.

Pour cela, au moins trois possibilités s'offrent à nous :

- Utiliser un endpoint dédié à l'upload de fichier
- Utiliser un endpoint classique et gérer l'upload de fichier dans un listener
- Utiliser un endpoint classique, dans un controleur dédié et gérer l'upload classiquement avec Symfony

La première solution est la plus simple, mais peut être moins flexible. La deuxième solution est plus complexe, mais permet de gérer l'upload de fichier de manière plus fine. 

Il est possible de s'aider de bundle comme : https://github.com/dustin10/VichUploaderBundle  pour gérer l'upload de fichier. Cette solution se base sur le listener, qui dès qu'un fichier est envoyé sur l'entité va s'occuper de l'upload (voire de renommer le fichier, de le stocker dans un dossier spécifique, etc.). Cette solution peut s'utiliser avec ou sans ApiPlatform et dans tous les projets symfony.

L'utilisation avec ApiPlatform et VichUploader et d'une entitée dédiée pour vos fichiers est très bien documentée ici : https://api-platform.com/docs/v3.4/core/file-upload/

Il est possible de la transposer facilement sur une entitée plus complète qui contiendrai un champs upload.

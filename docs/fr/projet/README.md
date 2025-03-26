# Projet

## Description

En vous basant sur la [partie backend déjà réalisée](https://wra506d.gitbook.io/wra506d), vous allez créer une application frontend en Vue.js pour proposer une interface de gestion de contenu au CMS.

Cette application devrait inclure les fonctionnalités suivantes :

- Authentification
- Gestion des utilisateurs (inscription, connexion, déconnexion, ...)
- Gestion des contenus (articles, posts, pages, ...)
- Gestion des commentaires sur les contenus
- Gestion de l'upload de fichiers
- Le site devra proposer une partie public accessible à tous pour consulter les contenus et commentaires
- Il faudra être connecté pour poster un contenu ou un commentaire
- Il faudra être connecté pour accéder aux fonctionnalités d'administration (gestion des contenus, commentaires, utilisateurs)
- Les utilisateurs devront avoir des rôles (admin, éditeur, auteur, ...) et les contenus devront être associés à un auteur
- Les contenus devront être filtrables par auteur, date ou une recherche par mots clés

**L'ensemble de l'application sera testée avec Cypress a minima pour toute la partie publique et les fonctionnalités des utilisateurs connectés (pas la partie administration).**

La partie esthétique du site n'est pas évaluée, mais il est attendu que l'interface soit fonctionnelle et agréable à utiliser. Vous pouvez utiliser un framework CSS comme Bootstrap ou TailwindCSS pour vous aider, ou des outils comme Vuetify, PrimeVue, etc.

**Le travail est individuel et raisonnablement il y a suffisament de façon d'imaginer les interfaces (et de thématique pour votre contenu) pour que vos codes/projets ne se ressemblent pas trop...**

## Rendu

Le rendu de ce projet est un dépôt Git contenant l'ensemble du code source de l'application Vue.js (**ainsi que le lien vers le dépôt back utilisé**), ainsi qu'un fichier README.md expliquant comment installer et lancer l'application, et **votre nom**.

Vous m'ajoutez en tant que collaborateur sur le dépôt (privé ou public à votre convenance) pour que je puisse le cloner et le tester. Mon identifiant GitHub est `dannebicque`.

La date limite est fixée au **28 mars 2025, 23h59**.

## Barème

- Tests cypress : 5
- Affichage des contenus publics + commentaires : 3
- Connexion, inscription, déconnexion, ... : 3
- Uploads : 2
- Recherche : 3
- Esthétique, mise en page, UX : 2
- Respect des consignes : 2
- Back-office/partie administration : 2

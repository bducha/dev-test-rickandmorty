
# The Rick and Morty Universe app!

  

Ce projet est une application web réalisée pour un test de programmation. Elle présente les différents lieux et personnages de la série Rick et Morty.

Cette application utilise le framework front-end **Vue.JS** et un serveur back-end **Node JS** connecté à une base NoSQL **MongoDB**. Les données de la série sont récupérées depuis [cette API](https://rickandmortyapi.com/).

  

Vous pouvez voir les détails de la création de l'application [ici](https://github.com/BenjaminDuchadeuil/dev-test-rickandmorty/details.md).

  

# Prérequis

  

Pour lancer cette application vous aurez besoin de:

  

- Node JS

- NPM

- Un serveur MongoDB

# Installation

À la racine du projet, exécuter :

  

npm install

# Configuration

Pour la connexion à la base de données, vous devez renseigner l'URL de connexion à votre base MongoDB préalablement créée dans la variable d'environnement `MONGO_URL`. Ex:

  

MONGO_URL=mongodb://localhost/rickandmorty

  

[Détail URL de connection MongoDB](https://docs.mongodb.com/manual/reference/connection-string/)

  

Il est fortement conseillé de définir une clé secrète pour la session Express. Vous pouvez la définir dans la variable d'environnement `EXPRESS_SECRET`

  

EXPRESS_SECRET=myNiceSecretKey

Il est possible que vous souhaitiez changer le port par défaut du serveur (3000). Vous pouvez pour cela changer la variable d'environnement `SERVER_PORT`.

  

SERVER_PORT=1337

Il est aussi possible de changer l'URL utilisée par le client pour se connecter au serveur en mode développement.

  

VUE_APP_BACKEND_API_URL=http://localhost:1337/api/

  

Notez que l'URL doit toujours se terminer par /api/

  

L'URL de l'API utilisée pour récupérer les données sur la série est aussi configurable:

  

VUE_APP_RICKMORTY_API_URL=https://rickmortyapi.com/api/

Vous pouvez trouver un fichier `.env.example` servant d'exemple à la racine. C'est ici que devra être mis votre propre fichier `.env`.

  

# Lancer le projet

Voici les différentes étapes pour lancer le projet

  

## Mode développement

Pour lancer le projet en mode développement, exécuter premièrement le serveur backend:

  

cd server

node app.js

Puis lancez l'application Vue.JS. Depuis la racine:

  

npm run serve

## Mode production

Commencer par build l'application (veillez à définir les variables d'environnement voulues avant dans le fichier .env à la racine du projet)

  

npm run build

Un dossier `dist` est alors créé. Il suffit ensuite de lancer le serveur backend qui se chargera de servir l'application sur le port désiré. Ne pas oublier de définir la variable d'environnement `NODE_ENV`.

  

cd server

node app.js

# Effectuer les test

Pour lancer les tests, exécutez simplement:
`npm run test:unit`

# Difficultés rencontrées

Durant le développement de l'application, j'ai pu rencontrer un problème d'authentification que j'ai mis un peu de temps à comprendre.

La vérification du cookie de session permettant l'authentification ne fonctionnait pas pendant le développement. J'ai fini par trouver le problème, qui était que le serveur back-end et le serveur de développement du front-end n'étaient pas lancés sur le même port, et il a donc fallu que j'autorise le *Cross Origin* sur le serveur pour le développement.


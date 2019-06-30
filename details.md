# Détails
Voici les détails sur la création de cette application web
## Technologies utilisés
#### Front-end
Pour la partie front-end de l'application, j'ai choisi d'utiliser Vue.JS. Je m'étais donné le choix entre React.JS que je connaissais bien et Vue.JS que je connaissais un peu moins, puisqu'il me paraissait assez risqué d'essayer un nouveau framework en si peu de temps. 

Pour cette application, j'ai préféré utiliser Vue.JS à React.JS premièrement car je trouvais que React était fait pour des projets plus gros que celui-ci, et me semblait un peu surdimensionné pour cette application.

J'avais néanmoins beaucoup moins de connaissances sur Vue.JS en comparaison avec React.JS, mais c'est un framework qui est renommé pour être simple à apprendre, et c'était la bonne occasion pour acquérir de l'expérience dessus.
Les deux framework permettaient aussi la création de *Progressive Web Apps*, qui peut être une fonctionnalité intéressante à rajouter.

Pour la mise en forme de l'application, j'ai utilisé Bootstrap-Vue. Je l'ai choisi pour sa simplicité de mise en oeuvre ainsi que son efficacité, ce qui m'a permis de faire une interface convenable en peu de temps.
#### Back-end
Pour la partie back-end, j'ai choisi d'utiliser un serveur Node.JS. C'est une technologie que je maîtrisais déjà, et le choix d'utiliser du JavaScript pour le front-end et le back-end me paraissais pertinent, puisqu'il me permettait notamment d'utiliser le même gestionnaire de packages NPM.
J'ai utilisé Express pour la création du serveur web, qui est le plus connu et qui répondait parfaitement à tous les besoins que j'avais.
Pour la partie authentification, j'ai utilisé Passport.js, car il est très simple d'utilisation mais aussi très extensible grâce à son système de *strategies* qui peut permettre de rajouter différentes méthodes d'authentification dans l'avenir.
## Design patterns
#### Front-end
Pour la partie front-end en Vue.JS, j'ai utilisé le pattern de *Single File Components*. Je trouvait cette façon de créer les composant plus lisible et maintenable, en comparaison avec les *String Templates* qui ne bénéficient par exemple pas de la coloration syntaxique du HTML.

Pour la communication entre les composants, j'ai utilisé le système de *Props* et d'*Events* qui suffisait largement à mon utilisation puisque les échange de données étaient peux nombreux. Il n'était donc pas très pertinent d'utiliser un système gestion de *states* comme *Vuex*.
#### Back-end
Pour la partie back-end j'ai décidé d'utiliser le *Depedency Injection Pattern* qui me paraissait naturel à l'utilisation. Il me permettait de séparer mes fichiers pour plus de visibilité et était compatible avec mon application.
# TrackMyExpenses

## Description
**TrackMyExpenses** est une application web de suivi financier personnel qui permet aux utilisateurs de gérer leurs dépenses de manière efficace. Elle offre des fonctionnalités pour catégoriser les dépenses, afficher des rapports financiers, gérer les budgets personnels, et bien plus encore.

---

## Fonctionnalités

### Authentification et Sécurité
- **Authentification utilisateur** : Basée sur JWT (JSON Web Token) pour une sécurité renforcée.
- **Gestion de profil** : Modifiez vos informations personnelles et votre photo de profil.

### Gestion des Dépenses
- **Opérations CRUD** : Ajoutez, modifiez, supprimez et consultez vos dépenses.
- **Filtrage** : Filtrez les dépenses par catégorie, date, ou montant.
- **Catégories personnalisées** : Créez et gérez vos propres catégories de dépenses.

### Rapports et Analyses
- **Rapports mensuels/hebdomadaires** : Visualisez vos dépenses sous forme de graphiques et de tableaux.
- **Exportation des données** : Exportez vos données au format CSV ou PDF pour une analyse approfondie.
- **Tendances financières** : Analysez vos habitudes de dépenses sur plusieurs mois.

### Budgets et Objectifs
- **Gestion des budgets** : Définissez des budgets mensuels par catégorie.
- **Objectifs financiers** : Fixez des objectifs d'épargne et suivez votre progression.

### Notifications
- **Alertes de dépenses** : Recevez des notifications lorsque vous approchez de la limite de votre budget.
- **Rappels** : Configurez des rappels pour les échéances de paiement.

---

## Stack Technique

### Backend
- **Node.js** : Environnement d'exécution JavaScript.
- **Express.js** : Framework pour construire l'API.
- **Sequelize** : ORM pour interagir avec la base de données sqlite.

### Frontend
- **Vue.js** : Framework JavaScript pour l'interface utilisateur.
- **ApexCharts** : Bibliothèque pour les graphiques interactifs.

### Base de Données
- **sqlite** : Base de données relationnelle pour stocker les données.

### Authentification
- **JWT (JSON Web Token)** : Pour une authentification sécurisée.

### Autres Outils
- **Dotenv** : Gestion des variables d'environnement.
- **Nodemon** : Redémarrage automatique du serveur pendant le développement.

---

## Installation

### Prérequis
- Node.js (version 14 ou supérieure)
- sqlite
- Git (pour cloner le dépôt)

### Étapes d'Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/kevine09/TrackMyExpenses.git
   cd TrackMyExpenses
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Configurez les variables d'environnement :
   Créez un fichier `.env` dans le répertoire racine et ajoutez les variables suivantes :
  DB_PATH=./database/expenses.db
JWT_SECRET=cledekevine09
PORT=3000
   

4. Exécutez les migrations de la base de données :
   ```bash
   npx sequelize db:migrate
   ```

5. Démarrez l'application :
   ```bash
   npm start
   ```

6. Accédez à l'application :
   - **API** : `http://localhost 3000`
   - **Frontend** : npm run dev.

---

## Utilisation

1. **Créer un compte** : Inscrivez-vous pour accéder à l'application.
2. **Ajouter une photo** : via le panneau laterale ou via parametres
3. **Ajouter des dépenses** : Ajoutez vos dépenses par catégorie (Nourriture, Transport, Loisirs, etc.).
4. **Filtrer les dépenses** : Utilisez les filtres pour analyser vos dépenses par date ou catégorie.
5. **Générer des rapports** : Visualisez vos dépenses sous forme de graphiques et exportez-les en PDF ou CSV.
6. **Gérer les budgets** : Définissez des budgets mensuels et recevez des alertes lorsque vous approchez de la limite.

---

## Feuille de Route

### Fonctionnalités à Venir
- [ ] **Notifications** : Alertes pour les paiements en retard ou les dépassements de budget.
- [ ] **Multi-devises** : Prise en charge de plusieurs devises pour les utilisateurs internationaux.

### Améliorations Techniques
- [ ] **Tests automatisés** : Ajouter des tests unitaires et d'intégration.
- [ ] **Dockerisation** : Faciliter le déploiement avec Docker.
- [ ] **Documentation API** : Générer une documentation Swagger pour l'API.

---

## Contribution

Les contributions sont les bienvenues ! Voici comment vous pouvez contribuer :

1. **Forkez le projet** : Créez une copie du projet sur votre compte GitHub.
2. **Créez une branche** : Utilisez une branche dédiée pour vos modifications.
3. **Soumettez une Pull Request** : Une fois vos modifications terminées, soumettez une PR pour examen.

### Guide de Contribution
- Respectez les conventions de code existantes.
- Ajoutez des tests pour les nouvelles fonctionnalités.
- Documentez vos modifications dans le fichier `CHANGELOG.md`.

## Tests

Pour exécuter les tests (à venir) :
```bash
npm test
```

## Dépendances

### Backend
- **express** : Framework pour construire l'API.
- **sequelize** : ORM pour interagir avec MySQL.
- **jsonwebtoken** : Gestion des tokens JWT.
- **bcrypt** : Hashage des mots de passe.
- **dotenv** : Gestion des variables d'environnement.

### Frontend 
- **vue** : Framework JavaScript pour l'interface utilisateur.
- **vue-router** : Gestion des routes.
- **axios** : Requêtes HTTP vers l'API.
- **apexcharts** : Graphiques interactifs.


## Licence

Ce projet n'a pas de licence pour le moment. Tous les droits sont réservés.


## Auteur

- **Kevine.** - Développeur principal - [GitHub](https://github.com/kevine09)


## Remerciements

- Merci à tous les contributeurs et utilisateurs de l'application.
- Inspiré par des applications de gestion financière populaires comme Mint et YNAB.



### Améliorations Apportées
1. **Structure claire** : Sections bien organisées pour une lecture facile.
2. **Détails techniques** : Ajout des dépendances, des prérequis, et des étapes d'installation.
3. **Feuille de route** : Liste des fonctionnalités à venir et des améliorations techniques.
4. **Guide de contribution** : Instructions pour contribuer au projet.
5. **Tests** : Section dédiée aux tests (à compléter).
6. **Licence** : Mention explicite de l'absence de licence.

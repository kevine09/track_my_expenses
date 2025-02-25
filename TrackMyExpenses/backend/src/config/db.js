import { Sequelize } from 'sequelize'; // Importe Sequelize
import dotenv from 'dotenv'; // Charge les variables d'environnement

dotenv.config(); // Initialise dotenv

// Crée une instance de Sequelize pour SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite', // Utilise SQLite comme base de données
  storage: process.env.DB_PATH || './database/expenses.db', // Chemin vers le fichier SQLite
});

export default sequelize; // Exporte l'instance de Sequelize
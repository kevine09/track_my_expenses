import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
console.log("🔍 Chargement du modèle Category...");
const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
    tableName: 'Categories', // Nom explicite de la table
  });
console.log("✅ Modèle Category chargé avec succès");
export default Category;
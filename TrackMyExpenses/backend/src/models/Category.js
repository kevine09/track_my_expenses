import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

console.log("🔍 Chargement du modèle Category...");

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Le nom de la catégorie est requis' },
      len: { args: [2, 50], msg: 'Le nom doit contenir entre 2 et 50 caractères' }
    }
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: { msg: 'L\'icône est requise' }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'Categories', // Nom explicite de la table
});

console.log("✅ Modèle Category chargé avec succès");

export default Category;
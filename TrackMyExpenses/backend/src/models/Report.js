import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Report = sequelize.define('Report', {
  type: {
    type: DataTypes.STRING, // 'monthly' ou 'weekly'
    allowNull: false,
  },
  data: {
    type: DataTypes.TEXT, // Stocke les données du rapport au format JSON
    allowNull: false,
  },
});
console.log("✅ Modèle Report chargé avec succès");

export default Report;
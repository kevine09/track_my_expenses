import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
console.log("🔍 Chargement du modèle Budget...");
const Budget = sequelize.define('Budget', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  month: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
console.log("✅ Modèle Budget chargé avec succès");
export default Budget;
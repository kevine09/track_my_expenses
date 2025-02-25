import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Expense = sequelize.define('Expense', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Date par défaut : maintenant
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true, // La description est facultative
  },
});
console.log("✅ Modèle Expense chargé avec succès");

export default Expense;

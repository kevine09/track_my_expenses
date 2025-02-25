import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const BankCard = sequelize.define('BankCard', {
  cardNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiryDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cvv: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Référence à la table Users
      key: 'id',
    },
  },
});

console.log("✅ Modèle BankCard chargé avec succès");

export default BankCard;
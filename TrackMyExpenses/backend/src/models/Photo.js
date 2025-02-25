import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Photo = sequelize.define('Photo', {
  photoUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Assurez-vous que la table s'appelle bien 'Users'
      key: 'id',
    },
  },
}, {
  tableName: 'Photos', // Nom explicite de la table
});
console.log("✅ Modèle Photo chargé avec succès");

export default Photo; // Exportez le modèle Photo
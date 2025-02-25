import { DataTypes } from 'sequelize'; // Importe DataTypes de Sequelize
import sequelize from '../config/db.js'; // Importe l'instance de Sequelize

// Définit le modèle User
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING, // Type de données : chaîne de caractères
    allowNull: false, // Le champ ne peut pas être null
  },
  email: {
    type: DataTypes.STRING, // Type de données : chaîne de caractères
    unique: true, // L'email doit être unique
    allowNull: false, // Le champ ne peut pas être null
  },
  password: {
    type: DataTypes.STRING, // Type de données : chaîne de caractères
    allowNull: false, // Le champ ne peut pas être null
    }
  }, {
    tableName: 'Users', // 💡 Cette ligne doit être dans les options ici !
    freezeTableName: true, // ✅ Empêche Sequelize d'ajouter un "s" ou de modifier le nom
  });
console.log("✅ Modèle user chargé avec succès");


export default User; // Exporte le modèle User
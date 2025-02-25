import User from './user.js';
import Category from './Category.js';
import Expense from './Expense.js';
import Budget from './Budget.js';
import Report from './Report.js';
import Photo from './Photo.js';
import BankCard from './BankCard.js';

// Relations existantes
User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Budget, { foreignKey: 'userId' });
Budget.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Report, { foreignKey: 'userId' });
Report.belongsTo(User, { foreignKey: 'userId' });

Category.hasMany(Expense, { foreignKey: 'categoryId' });
Expense.belongsTo(Category, { foreignKey: 'categoryId' });

// Nouvelles relations
User.hasMany(Photo, { foreignKey: 'userId' });
Photo.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(BankCard, { foreignKey: 'userId' });
BankCard.belongsTo(User, { foreignKey: 'userId' });

export { User, Category, Expense, Budget, Report, Photo, BankCard };
import Budget from '../models/Budget.js';

// Créer un budget
export const createBudget = async (req, res) => {
  const { amount, month, year, categoryId } = req.body;
  const userId = req.userId; // Récupère l'ID de l'utilisateur du middleware

  try {
    const budget = await Budget.create({ amount, month, year, userId, categoryId });
    res.status(201).json({ message: 'Budget ajoute', budget });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la creation budget', error: err.message });
  }
};

// Récupérer tous les budgets de l'utilisateur
export const getBudgets = async (req, res) => {
  const userId = req.userId;

  try {
    const budgets = await Budget.findAll({ where: { userId } });
    res.json({ budgets });
  } catch (err) {
    res.status(500).json({ message: 'Erreur de recuperation', error: err.message });
  }
};

// Mettre à jour un budget
export const updateBudget = async (req, res) => {
  const { id } = req.params;
  const { amount, month, year, categoryId } = req.body;
  const userId = req.userId;

  try {
    const budget = await Budget.findOne({ where: { id, userId } });
    if (!budget) {
      return res.status(404).json({ message: 'Budget introuvable' });
    }

    budget.amount = amount;
    budget.month = month;
    budget.year = year;
    budget.categoryId = categoryId;
    await budget.save();

    res.json({ message: 'Budget modifier', budget });
  } catch (err) {
    res.status(500).json({ message: 'Erreur de modification du budget', error: err.message });
  }
};

// Supprimer un budget
export const deleteBudget = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const budget = await Budget.findOne({ where: { id, userId } });
    if (!budget) {
      return res.status(404).json({ message: 'Budget introuvable' });
    }

    await budget.destroy();
    res.json({ message: 'Budget supprimer' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur de suppression de budget', error: err.message });
  }
};

export const checkBudgetExceeded = async (userId) => {
  const budgets = await Budget.findAll({ where: { userId } });
  const expenses = await Expense.findAll({ where: { userId } });

  const warnings = [];

  budgets.forEach((budget) => {
    const totalExpenses = expenses
      .filter((expense) => expense.categoryId === budget.categoryId)
      .reduce((sum, expense) => sum + expense.amount, 0);

    if (totalExpenses > budget.amount) {
      warnings.push({
        categoryId: budget.categoryId,
        budgetAmount: budget.amount,
        totalExpenses,
      });
    }
  });

  return warnings;
};
export const generateBudgetTips = async (userId) => {
  const expenses = await Expense.findAll({ where: { userId } });
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const tips = [];

  if (totalExpenses > 1000) {
    tips.push('Essayez de réduire vos dépenses dans la catégorie Loisirs.');
  }

  if (expenses.some((expense) => expense.categoryId === 1 && expense.amount > 500)) {
    tips.push('Vous dépensez beaucoup dans la catégorie Nourriture. Pensez à cuisiner à la maison !');
  }

  return tips;
};
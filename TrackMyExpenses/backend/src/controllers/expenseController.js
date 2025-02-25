import Expense from '../models/Expense.js';

// Créer une dépense
export const createExpense = async (req, res) => {
  const { amount, date, description, categoryId } = req.body;
  const userId = req.userId; // Récupère l'ID de l'utilisateur du middleware

  try {
    const expense = await Expense.create({ amount, date, description, userId, categoryId });
    res.status(201).json({ message: 'depense cree', expense });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la creation', error: err.message });
  }
};

// Récupérer toutes les dépenses de l'utilisateur
export const getExpenses = async (req, res) => {
  const userId = req.userId;

  try {
    const expenses = await Expense.findAll({ where: { userId } });
    res.json({ expenses });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la recuperation', error: err.message });
  }
};

// Mettre à jour une dépense
export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { amount, date, description, categoryId } = req.body;
  const userId = req.userId;

  try {
    const expense = await Expense.findOne({ where: { id, userId } });
    if (!expense) {
      return res.status(404).json({ message: 'depense introuvable' });
    }

    expense.amount = amount;
    expense.date = date;
    expense.description = description;
    expense.categoryId = categoryId;
    await expense.save();

    res.json({ message: 'depense modifier', expense });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la modification', error: err.message });
  }
};

// Supprimer une dépense
export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const expense = await Expense.findOne({ where: { id, userId } });
    if (!expense) {
      return res.status(404).json({ message: 'depense introuvable' });
    }

    await expense.destroy();
    res.json({ message: 'depense supprimee' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression ', error: err.message });
  }
};
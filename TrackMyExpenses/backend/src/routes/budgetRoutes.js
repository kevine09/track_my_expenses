import express from 'express';
import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from '../controllers/expenseController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { validateExpense, handleValidationErrors } from '../middleware/validationMiddleware.js';


const router = express.Router();

// Routes protégées par l'authentification
router.post('/', authMiddleware, createExpense); // Créer une dépense
router.get('/', authMiddleware, getExpenses); // Récupérer toutes les dépenses
router.put('/:id', authMiddleware, updateExpense); // Mettre à jour une dépense
router.delete('/:id', authMiddleware, deleteExpense); // Supprimer une dépense
router.post('/', authMiddleware, validateExpense, handleValidationErrors, createExpense);

export default router;
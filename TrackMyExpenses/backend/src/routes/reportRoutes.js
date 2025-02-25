import express from 'express';
import { generateMonthlyReport } from '../controllers/reportController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { validateExpense, handleValidationErrors } from '../middleware/validationMiddleware.js';
import { createExpense } from '../controllers/expenseController.js';
import { generatePDFReport } from '../controllers/reportController.js';

const router = express.Router();

// Route pour générer un rapport mensuel
router.post('/monthly', authMiddleware, generateMonthlyReport);
router.post('/', authMiddleware, validateExpense, handleValidationErrors, createExpense);
router.post('/pdf', authMiddleware, generatePDFReport); // Nouvelle route pour générer un PDF


export default router;
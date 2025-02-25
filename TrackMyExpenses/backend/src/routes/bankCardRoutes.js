// routes/bankCardRoutes.js
import express from 'express';
import { createBankCard, getBankCards, deleteBankCard } from '../controllers/bankCardController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes protégées par l'authentification
router.post('/', authMiddleware, createBankCard); // Créer une carte bancaire
router.get('/', authMiddleware, getBankCards); // Récupérer toutes les cartes bancaires
router.delete('/:id', authMiddleware, deleteBankCard); // Supprimer une carte bancaire

export default router;
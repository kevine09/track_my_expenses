import express from 'express'; // Importe Express
import { register, login } from '../controllers/authController.js'; // Importe les contrôleurs
import { validateExpense, handleValidationErrors } from '../middleware/validationMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js'
import { createExpense } from '../controllers/expenseController.js';



const router = express.Router(); // Crée un routeur Express

// Routes
router.post('/register', register); // Route pour l'inscription
router.post('/login', login); // Route pour la connexion
router.post('/', authMiddleware, validateExpense, handleValidationErrors, createExpense);


export default router; // Exporte le routeur
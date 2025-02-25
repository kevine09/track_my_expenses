// routes/photoRoutes.js
import express from 'express';
import { createPhoto, getPhotos, deletePhoto } from '../controllers/photoController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes protégées par l'authentification
router.post('/', authMiddleware, createPhoto); // Créer une photo
router.get('/', authMiddleware, getPhotos); // Récupérer toutes les photos
router.delete('/:id', authMiddleware, deletePhoto); // Supprimer une photo

export default router;
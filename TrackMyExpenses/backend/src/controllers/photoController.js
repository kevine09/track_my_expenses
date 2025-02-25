// controllers/photoController.js
import Photo from '../models/Photo.js';

// Créer une photo
export const createPhoto = async (req, res) => {
  const { photoUrl } = req.body;
  const userId = req.userId; // Récupère l'ID de l'utilisateur du middleware

  try {
    const photo = await Photo.create({ photoUrl, userId });
    res.status(201).json({ message: 'Photo créée', photo });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création', error: err.message });
  }
};

// Récupérer toutes les photos de l'utilisateur
export const getPhotos = async (req, res) => {
  const userId = req.userId;

  try {
    const photos = await Photo.findAll({ where: { userId } });
    res.json({ photos });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération', error: err.message });
  }
};

// Supprimer une photo
export const deletePhoto = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const photo = await Photo.findOne({ where: { id, userId } });
    if (!photo) {
      return res.status(404).json({ message: 'Photo introuvable' });
    }

    await photo.destroy();
    res.json({ message: 'Photo supprimée' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error: err.message });
  }
};
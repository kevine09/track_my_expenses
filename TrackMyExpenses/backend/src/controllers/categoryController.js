import Category from '../models/Category.js';

// Créer une catégorie
export const createCategory = async (req, res) => {
  const { name, icon, description } = req.body;

  try {
    const category = await Category.create({ name, icon, description });
    res.status(201).json({ message: 'Catégorie créée avec succès', category });
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: 'Validation error', errors: err.errors });
    }
    res.status(500).json({ message: 'Erreur lors de la création', error: err.message });
  }
};

// Récupérer toutes les catégories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération', error: err.message });
  }
};

// Mettre à jour une catégorie
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, icon, description } = req.body;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Catégorie introuvable' });
    }

    await category.update({ name, icon, description });
    res.json({ message: 'Catégorie mise à jour avec succès', category });
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: 'Validation error', errors: err.errors });
    }
    res.status(500).json({ message: 'Erreur lors de la mise à jour', error: err.message });
  }
};

// Supprimer une catégorie
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Catégorie introuvable' });
    }

    await category.destroy();
    res.json({ message: 'Catégorie supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error: err.message });
  }
};
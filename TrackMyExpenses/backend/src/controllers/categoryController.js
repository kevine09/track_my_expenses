import Category from '../models/Category.js';

// Créer une catégorie
export const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const category = await Category.create({ name });
    res.status(201).json({ message: 'Categorie crerr', category });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la creation', error: err.message });
  }
};

// Récupérer toutes les catégories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ message: 'Erreur de recuperation', error: err.message });
  }
};

// Mettre à jour une catégorie
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Categorie introuvable' });
    }

    category.name = name;
    await category.save();

    res.json({ message: 'Categorie modifier', category });
  } catch (err) {
    res.status(500).json({ message: 'erreur lors de la modification', error: err.message });
  }
};

// Supprimer une catégorie
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Categorie introuvable' });
    }

    await category.destroy();
    res.json({ message: 'Categorie supprimer' });
  } catch (err) {
    res.status(500).json({ message: 'Ereur lors de la suppression', error: err.message });
  }
};
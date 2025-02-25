import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import  Category  from "../models/Category.js"; // 🔹 Assure-toi que Category est bien importé !

const router = express.Router();

// ✅ Récupérer toutes les catégories (PROTÉGÉ PAR AUTH)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des catégories :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des catégories" });
  }
});

// ✅ Ajouter une catégorie
router.post("/", authMiddleware, async (req, res) => {
  const { name, icon, description } = req.body;

  if (!name || !icon) {
    return res.status(400).json({ message: "Nom et icône requis" });
  }

  try {
    const newCategory = await Category.create({ name, icon, description });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("❌ Erreur lors de la création de la catégorie :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✅ Modifier une catégorie
router.put("/:id", authMiddleware, async (req, res) => {
  const { name, icon, description } = req.body;

  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Catégorie non trouvée" });

    await category.update({ name, icon, description });
    res.json(category);
  } catch (error) {
    console.error("❌ Erreur lors de la modification :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✅ Supprimer une catégorie
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Catégorie non trouvée" });

    await category.destroy();
    res.json({ message: "Catégorie supprimée" });
  } catch (error) {
    console.error("❌ Erreur lors de la suppression :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;

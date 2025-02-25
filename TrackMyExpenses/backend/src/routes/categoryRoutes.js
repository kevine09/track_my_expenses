import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createCategory, getCategories, updateCategory, deleteCategory } from "../controllers/categoryController.js";

const router = express.Router();

// ✅ Récupérer toutes les catégories (PROTÉGÉ PAR AUTH)
router.get("/", authMiddleware, getCategories);

// ✅ Ajouter une catégorie
router.post("/", authMiddleware, async (req, res) => {
  const { name, icon, description } = req.body;

  if (!name || !icon) {
    return res.status(400).json({ message: "Nom et icône requis" });
  }

  try {
    const newCategory = await createCategory(req, res);
  } catch (error) {
    console.error("❌ Erreur lors de la création de la catégorie :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✅ Modifier une catégorie
router.put("/:id", authMiddleware, async (req, res) => {
  const { name, icon, description } = req.body;

  if (!name || !icon) {
    return res.status(400).json({ message: "Nom et icône requis" });
  }

  try {
    const updatedCategory = await updateCategory(req, res);
  } catch (error) {
    console.error("❌ Erreur lors de la modification :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✅ Supprimer une catégorie
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedCategory = await deleteCategory(req, res);
  } catch (error) {
    console.error("❌ Erreur lors de la suppression :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;
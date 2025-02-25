// controllers/bankCardController.js
import BankCard from '../models/BankCard.js';

// Créer une carte bancaire
export const createBankCard = async (req, res) => {
  const { cardNumber, expiryDate, cvv } = req.body;
  const userId = req.userId; // Récupère l'ID de l'utilisateur du middleware

  try {
    const bankCard = await BankCard.create({ cardNumber, expiryDate, cvv, userId });
    res.status(201).json({ message: 'Carte bancaire créée', bankCard });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création', error: err.message });
  }
};

// Récupérer toutes les cartes bancaires de l'utilisateur
export const getBankCards = async (req, res) => {
  const userId = req.userId;

  try {
    const bankCards = await BankCard.findAll({ where: { userId } });
    res.json({ bankCards });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération', error: err.message });
  }
};

// Supprimer une carte bancaire
export const deleteBankCard = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const bankCard = await BankCard.findOne({ where: { id, userId } });
    if (!bankCard) {
      return res.status(404).json({ message: 'Carte bancaire introuvable' });
    }

    await bankCard.destroy();
    res.json({ message: 'Carte bancaire supprimée' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error: err.message });
  }
};
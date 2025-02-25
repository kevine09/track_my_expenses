import Report from '../models/Report.js';
import Expense from '../models/Expense.js';

import { generatePDF } from '../utils/pdfGenerator.js';
// generer le rapport en pdf 
export const generatePDFReport = async (req, res) => {
  const { html } = req.body;

  try {
    const filename = `report_${Date.now()}.pdf`;
    await generatePDF(html, filename);
    res.download(filename); // Télécharge le PDF
  } catch (err) {
    res.status(500).json({ message: 'Error generating PDF', error: err.message });
  }
};

// Générer un rapport mensuel
export const generateMonthlyReport = async (req, res) => {
  const userId = req.userId;
  const { month, year } = req.body;

  try {
    const expenses = await Expense.findAll({
      where: { userId },
      attributes: ['montant', 'date', 'description', 'categoryId'],
    });

    const reportData = {
      month,
      year,
      totalExpenses: expenses.reduce((sum, expense) => sum + expense.amount, 0),
      expenses,
    };

    const report = await Report.create({
      type: 'monthly',
      data: JSON.stringify(reportData),
      userId,
    });

    res.json({ message: 'rapport mensuel generer', report });
  } catch (err) {
    res.status(500).json({ message: 'Erreur de generation ', error: err.message });
  }
};
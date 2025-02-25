import { body, validationResult } from 'express-validator';

// Validation pour la création d'une dépense
export const validateExpense = [
  body('amount').isFloat({ gt: 0 }).withMessage('le montant doit etre positif'),
  body('date').isISO8601().withMessage('la date doit etre valide'),
  body('categoryId').isInt({ gt: 0 }).withMessage('Category ID must be a positive integer'),
];

// Middleware pour gérer les erreurs de validation
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
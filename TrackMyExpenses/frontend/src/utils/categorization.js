export const categories = {
    "SUPERMARCHE": "Nourriture",
    "RESTAURANT": "Nourriture",
    "ESSENCE": "Transport",
    "CINEMA": "Loisirs",
  };
  
  export function categorizeExpense(merchant) {
    for (const [keyword, category] of Object.entries(categories)) {
      if (merchant.toUpperCase().includes(keyword)) {
        return category;
      }
    }
    return "Autres"; // Catégorie par défaut
  }
export function calculateTotals(expenses, budget) {
    const totals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});
  
    const remainingBudget = {
      Nourriture: budget.Nourriture - (totals.Nourriture || 0),
      Transport: budget.Transport - (totals.Transport || 0),
      Loisirs: budget.Loisirs - (totals.Loisirs || 0),
    };
  
    return { totals, remainingBudget };
  }
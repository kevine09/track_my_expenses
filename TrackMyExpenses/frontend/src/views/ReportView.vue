<template>
    <div>
      <ReportChart :reportData="reportData" />
    </div>
  </template>
  
  <script>
  import ReportChart from '@/components/ReportChart.vue';
  const warnings = await checkBudgetExceeded(userId);
  warnings.forEach((warning) => {
    alert(`Attention ! Vous avez dépassé votre budget de ${warning.budgetAmount} pour la catégorie ${warning.categoryId}.`);
  });
  export default {
    components: { ReportChart },
    data() {
      return {
        reportData: {
          labels: ['Nourriture', 'Transport', 'Loisirs'],
          values: [300, 150, 100],
        },
      };
    },
  };
  </script>
  
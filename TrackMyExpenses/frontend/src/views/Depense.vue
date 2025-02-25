<template>
    <div class="expenses-container">
      <!-- Titre et description de la page -->
      <div class="page-header">
        <h1 class="page-title">📊 Statistiques des Dépenses</h1>
        <p class="page-description">
          Visualisez et analysez vos dépenses pour mieux gérer votre budget.
        </p>
      </div>
  
      <!-- Filtres -->
      <div class="filters">
        <select v-model="selectedPeriod" class="filter-select">
          <option value="month">Mois en cours</option>
          <option value="last-month">Mois précédent</option>
          <option value="year">Année en cours</option>
        </select>
        <select v-model="selectedCategory" class="filter-select">
          <option value="all">Toutes les catégories</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
  
      <!-- Statistiques clés -->
      <div class="key-stats">
        <div class="stat-card">
          <h3>Dépenses totales</h3>
          <p>{{ totalExpenses }} €</p>
        </div>
        <div class="stat-card">
          <h3>Dépenses moyennes/jour</h3>
          <p>{{ averageDailyExpenses }} €</p>
        </div>
        <div class="stat-card">
          <h3>Comparaison avec le mois dernier</h3>
          <p :class="{ 'positive': comparison >= 0, 'negative': comparison < 0 }">
            {{ comparison }} %
          </p>
        </div>
      </div>
  
      <!-- Graphiques -->
      <div class="charts">
        <!-- Graphique en camembert -->
        <div class="chart-container">
          <h2>Répartition des dépenses par catégorie</h2>
          <apexchart 
            type="pie" 
            :options="pieChartOptions" 
            :series="pieChartData"
          ></apexchart>
        </div>
  
        <!-- Graphique en barres -->
        <div class="chart-container">
          <h2>Dépenses mensuelles</h2>
          <apexchart 
            type="bar" 
            :options="barChartOptions" 
            :series="barChartData"
          ></apexchart>
        </div>
  
        <!-- Graphique en courbes -->
        <div class="chart-container">
          <h2>Évolution des dépenses</h2>
          <apexchart 
            type="line" 
            :options="lineChartOptions" 
            :series="lineChartData"
          ></apexchart>
        </div>
      </div>
  
      <!-- Tableau des dépenses récentes -->
      <div class="recent-expenses">
        <h2>Dépenses récentes</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Montant</th>
              <th>Catégorie</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="expense in recentExpenses" :key="expense.id">
              <td>{{ expense.date }}</td>
              <td>{{ expense.amount }} €</td>
              <td>{{ expense.category }}</td>
              <td>{{ expense.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import VueApexCharts from 'vue3-apexcharts';
  export default {
    components: {
    apexchart: VueApexCharts,
  },
    data() {
      return {
        selectedPeriod: "month",
        selectedCategory: "all",
        totalExpenses: 1200,
        averageDailyExpenses: 40,
        comparison: -5, // -5% par rapport au mois dernier
        categories: [
          { id: 1, name: "Nourriture" },
          { id: 2, name: "Transport" },
          { id: 3, name: "Loisirs" },
        ],
        pieChartOptions: {
          labels: ["Nourriture", "Transport", "Loisirs"],
          colors: ["#FF5733", "#33C3FF", "#FFC300"],
        },
        pieChartData: [500, 300, 400],
        barChartOptions: {
          xaxis: {
            categories: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
          },
        },
        barChartData: [
          {
            name: "Dépenses",
            data: [300, 400, 350, 500, 450, 600],
          },
        ],
        lineChartOptions: {
          xaxis: {
            categories: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
          },
        },
        lineChartData: [
          {
            name: "Dépenses",
            data: [300, 400, 350, 500, 450, 600],
          },
        ],
        recentExpenses: [
          { id: 1, date: "2023-10-01", amount: 50, category: "Nourriture", description: "Supermarché" },
          { id: 2, date: "2023-10-05", amount: 30, category: "Loisirs", description: "Cinéma" },
          { id: 3, date: "2023-10-10", amount: 40, category: "Transport", description: "Essence" },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .expenses-container {
    padding: 20px;
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(135deg, #0a192f, #2ecc71);
    min-height: 100vh;
    color: white;
  }
  
  .page-header {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .page-title {
    font-size: 32px;
    color: #f1c40f;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .page-description {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .filters {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
  }
  
  .filter-select {
    padding: 10px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    color: rgb(237, 149, 7);
    outline: none;
  }


  
  .key-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .stat-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 20px;
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(245, 193, 36, 0.3);
  }
  
  .stat-card h3 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #f1c40f;
  }
  
  .stat-card p {
    font-size: 24px;
    font-weight: bold;
  }
  
  .positive {
    color: #2ecc71;
  }
  
  .negative {
    color: #e74c3c;
  }
  
  .charts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .chart-container {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 20px;
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  }
  
  .recent-expenses {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 20px;
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  th {
    color: #f1c40f;
  }
  </style>
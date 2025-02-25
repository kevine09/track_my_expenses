<template>
    <div class="report-container">
      <!-- En-tête de la page -->
      <div class="page-header">
        <h1 class="page-title">📊 Rapports Financiers</h1>
        <p class="page-description">
          Visualisez et téléchargez vos rapports financiers pour mieux comprendre vos dépenses.
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
        <button @click="generateReport">Générer le Rapport</button>
      </div>
  
      <!-- Rapport Visuel -->
      <div class="report-visual">
        <!-- Graphiques -->
        <div class="chart-container">
          <h2>Répartition des Dépenses</h2>
          <apexchart 
            type="pie" 
            :options="pieChartOptions" 
            :series="pieChartData"
          ></apexchart>
        </div>
  
        <!-- Tableau Récapitulatif -->
        <div class="summary-table">
          <h2>Récapitulatif des Dépenses</h2>
          <table>
            <thead>
              <tr>
                <th>Catégorie</th>
                <th>Budget</th>
                <th>Dépenses</th>
                <th>Écart</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="category in budgetCategories" :key="category.id">
                <td>{{ category.name }}</td>
                <td>{{ category.budget }} €</td>
                <td>{{ category.spent }} €</td>
                <td>{{ category.budget - category.spent }} €</td>
                <td>
                  <span v-if="category.spent <= category.budget" class="success">😊</span>
                  <span v-else class="warning">😢</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Téléchargement des Rapports -->
      <div class="download-options">
        <h2>Télécharger le Rapport</h2>
        <div class="download-buttons">
          <button @click="downloadPDF">Télécharger en PDF</button>
          <button @click="downloadWord">Télécharger en Word</button>
          <button @click="downloadExcel">Télécharger en Excel</button>
        </div>
        <div class="download-settings">
          <label>
            <input type="checkbox" v-model="includeCharts" /> Inclure les graphiques
          </label>
          <label>
            <input type="checkbox" v-model="includeDetails" /> Inclure les détails
          </label>
        </div>
      </div>
  
      <!-- Analyse des Tendances -->
      <div class="trend-analysis">
        <h2>Analyse des Tendances</h2>
        <div class="trend-chart">
          <apexchart 
            type="line" 
            :options="trendChartOptions" 
            :series="trendChartData"
          ></apexchart>
        </div>
        <div class="trend-summary">
          <p v-if="trendImprovement > 0" class="success">
            🎉 Vos dépenses ont diminué de {{ trendImprovement }} % ce mois-ci !
          </p>
          <p v-else class="warning">
            😢 Vos dépenses ont augmenté de {{ Math.abs(trendImprovement) }} % ce mois-ci.
          </p>
        </div>
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
        includeCharts: true,
        includeDetails: true,
        categories: [
          { id: 1, name: "Nourriture" },
          { id: 2, name: "Transport" },
          { id: 3, name: "Loisirs" },
        ],
        budgetCategories: [
          { id: 1, name: "Nourriture", budget: 500, spent: 400 },
          { id: 2, name: "Transport", budget: 300, spent: 250 },
          { id: 3, name: "Loisirs", budget: 200, spent: 150 },
        ],
        pieChartOptions: {
          labels: ["Nourriture", "Transport", "Loisirs"],
          colors: ["#FF5733", "#33C3FF", "#FFC300"],
        },
        pieChartData: [500, 300, 200],
        trendChartOptions: {
          xaxis: {
            categories: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
          },
        },
        trendChartData: [
          {
            name: "Dépenses",
            data: [1200, 1300, 1100, 1400, 1500, 1600],
          },
        ],
        trendImprovement: -10, // Exemple de tendance
      };
    },
    methods: {
      generateReport() {
        alert("Rapport généré !");
      },
      downloadPDF() {
        alert("Téléchargement du PDF en cours...");
      },
      downloadWord() {
        alert("Téléchargement du Word en cours...");
      },
      downloadExcel() {
        alert("Téléchargement de l'Excel en cours...");
      },
    },
  };
  </script>
  
  <style scoped>
  .report-container {
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
  
  .filter-select,
  .filters button {
    padding: 10px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    outline: none;
  }
  
  .filters button {
    background: #f1c40f;
    color: #0a192f;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .filters button:hover {
    background: #e6b800;
  }
  
  .report-visual {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .chart-container,
  .summary-table {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 20px;
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  }
  
  .summary-table table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .summary-table th,
  .summary-table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .success {
    color: #2ecc71;
  }
  
  .warning {
    color: #e74c3c;
  }
  
  .download-options {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 20px;
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
    margin-bottom: 30px;
  }
  
  .download-buttons {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .download-buttons button {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    background: #f1c40f;
    color: #0a192f;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .download-buttons button:hover {
    background: #e6b800;
  }
  
  .download-settings {
    display: flex;
    gap: 20px;
  }
  
  .trend-analysis {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 20px;
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
    margin-bottom: 30px;
  }
  
  .trend-chart {
    margin-bottom: 20px;
  }
  </style>
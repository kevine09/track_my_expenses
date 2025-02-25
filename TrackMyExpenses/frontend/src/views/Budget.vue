<template>
    <div class="budget-container">
      <!-- En-tête de la page -->
      <div class="page-header">
        <h1 class="page-title">📅 Gestion des Budgets</h1>
        <p class="page-description">
          Planifiez et suivez vos budgets pour mieux contrôler vos finances.
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
          <h3>Budget Total</h3>
          <p>{{ totalBudget }} €</p>
        </div>
        <div class="stat-card">
          <h3>Dépenses Totales</h3>
          <p>{{ totalExpenses }} €</p>
        </div>
        <div class="stat-card">
          <h3>Solde Restant</h3>
          <p>{{ remainingBalance }} €</p>
        </div>
        <div class="stat-card">
          <h3>Objectifs Atteints</h3>
          <p>{{ achievedGoals }} / {{ totalGoals }}</p>
        </div>
      </div>
  
      <!-- Graphiques -->
    <div class="charts">
      <!-- Camembert des budgets -->
      <div class="chart-container">
        <h2>Répartition des budgets par catégorie</h2>
        <apexchart 
          type="pie" 
          :options="pieChartOptions" 
          :series="pieChartData"
        ></apexchart>
      </div>

      <!-- Graphique d'évolution -->
      <div class="chart-container">
        <h2>Évolution des budgets et dépenses</h2>
        <apexchart 
          type="line" 
          :options="lineChartOptions" 
          :series="lineChartData"
        ></apexchart>
      </div>
    </div>

    <!-- Liste des budgets par catégorie -->
    <div class="budget-list">
      <h2>Budgets par Catégorie</h2>
      <div v-for="category in budgetCategories" :key="category.id" class="budget-item">
        <h3>{{ category.name }}</h3>
        <div class="progress-bar">
          <div 
            class="progress" 
            :style="{ width: (category.spent / category.budget) * 100 + '%' }"
          ></div>
        </div>
        <p>{{ category.spent }} € / {{ category.budget }} €</p>
      </div>
    </div>

    <!-- Suggestions Automatiques -->
    <div class="suggestions">
      <h2>Suggestions</h2>
      <div v-for="suggestion in suggestions" :key="suggestion.id" class="suggestion-item">
        <p>{{ suggestion.message }}</p>
        <button v-if="suggestion.action" @click="suggestion.action">
          {{ suggestion.actionLabel }}
        </button>
      </div>
    </div>
  
      <!-- Objectifs Financiers -->
      <div class="goals">
        <h2>Objectifs Financiers</h2>
        <div v-for="goal in financialGoals" :key="goal.id" class="goal-item">
          <h3>{{ goal.name }}</h3>
          <div class="progress-circle">
            <apexchart 
              type="radialBar" 
              :options="goal.chartOptions" 
              :series="goal.progress"
            ></apexchart>
          </div>
          <p>{{ goal.current }} € / {{ goal.target }} €</p>
          <p v-if="goal.current >= goal.target" class="success">Objectif atteint ! 🎉</p>
          <p v-else class="warning">Objectif non atteint.</p>
          <button @click="editGoal(goal)">Modifier</button>
          <button @click="deleteGoal(goal.id)">Supprimer</button>
        </div>
        <div class="add-goal">
          <h3>Définir un nouvel objectif</h3>
          <input v-model="newGoal.name" placeholder="Nom de l'objectif" />
          <input v-model="newGoal.target" type="number" placeholder="Montant cible (€)" />
          <button @click="addGoal">Ajouter</button>
        </div>
      </div>
  
      <!-- Simulateur de Budget -->
      <div class="simulator">
        <h2>Simulateur de Budget</h2>
        <div class="simulator-input">
          <label>Si je dépense </label>
          <input v-model="simulatorAmount" type="number" placeholder="Montant (€)" />
          <label> de plus en </label>
          <select v-model="simulatorCategory">
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
          <label>, cela affectera mon budget comme suit :</label>
        </div>
        <div class="simulator-result">
          <p>Nouveau solde : {{ remainingBalance - simulatorAmount }} €</p>
          <p v-if="simulatorAmount > remainingBalance" class="warning">
            Attention, vous dépasserez votre budget !
          </p>
        </div>
      </div>
  
      <!-- Gamification -->
      <div class="gamification">
        <h2>Gamification</h2>
        <div class="badges">
          <h3>Badges</h3>
          <div v-for="badge in badges" :key="badge.id" class="badge-item">
            <span>{{ badge.name }}</span>
            <span v-if="badge.earned">✅</span>
            <span v-else>❌</span>
          </div>
        </div>
        <div class="challenges">
          <h3>Défis Mensuels</h3>
          <div v-for="challenge in challenges" :key="challenge.id" class="challenge-item">
            <p>{{ challenge.description }}</p>
            <button @click="acceptChallenge(challenge)">Accepter</button>
          </div>
        </div>
      </div>
  
      <!-- Gestion des Revenus -->
      <div class="income-management">
        <h2>Gestion des Revenus</h2>
        <div class="income-allocation">
          <h3>Allocation Automatique</h3>
          <div v-for="allocation in incomeAllocations" :key="allocation.category" class="allocation-item">
            <label>{{ allocation.category }} :</label>
            <input v-model="allocation.percentage" type="number" placeholder="%" />
          </div>
          <button @click="saveAllocations">Enregistrer</button>
        </div>
        <div class="income-tracking">
          <h3>Suivi des Revenus</h3>
          <p>Revenu total ce mois-ci : {{ totalIncome }} €</p>
          <p>Dépenses totales : {{ totalExpenses }} €</p>
          <p>Solde restant : {{ totalIncome - totalExpenses }} €</p>
        </div>
      </div>
  
      <!-- Mode Économie d'Urgence -->
      <div class="emergency-mode" v-if="remainingBalance < 0">
        <h2>Mode Économie d'Urgence</h2>
        <p>Vous avez dépassé votre budget. Voici quelques suggestions pour économiser :</p>
        <ul>
          <li>Évitez les restaurants cette semaine pour économiser 100 €.</li>
          <li>Réduisez vos dépenses en loisirs de 20 %.</li>
        </ul>
      </div>
  
      <!-- Historique des Budgets -->
      <div class="budget-history">
        <h2>Historique des Budgets</h2>
        <div class="history-chart">
          <apexchart 
            type="bar" 
            :options="historyChartOptions" 
            :series="historyChartData"
          ></apexchart>
        </div>
      </div>
  
      <!-- Conseils Personnalisés -->
      <div class="personalized-advice">
        <h2>Conseils Personnalisés</h2>
        <div v-for="advice in personalizedAdvice" :key="advice.id" class="advice-item">
          <p>{{ advice.message }}</p>
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
        totalBudget: 2000,
        totalExpenses: 1200,
        remainingBalance: 800,
        achievedGoals: 2,
        totalGoals: 5,
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
        financialGoals: [
          {
            id: 1,
            name: "Épargner 1000 €",
            target: 1000,
            current: 600,
            progress: [60],
            chartOptions: {
              chart: {
                type: 'radialBar',
              },
              plotOptions: {
                radialBar: {
                  hollow: {
                    size: '70%',
                  },
                },
              },
              labels: ['Progression'],
            },
          },
        ],
        newGoal: {
          name: "",
          target: 0,
        },
        simulatorAmount: 0,
        simulatorCategory: 1,
        badges: [
          { id: 1, name: "Économe", earned: true },
          { id: 2, name: "Défi Mensuel", earned: false },
        ],
        challenges: [
          {
            id: 1,
            description: "Économisez 10 % de plus sur votre budget Transport ce mois-ci.",
          },
        ],
        incomeAllocations: [
          { category: "Épargne", percentage: 30 },
          { category: "Loisirs", percentage: 20 },
        ],
        totalIncome: 2500,
        historyChartOptions: {
          xaxis: {
            categories: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
          },
        },
        historyChartData: [
          {
            name: "Budget",
            data: [2000, 2000, 2000, 2000, 2000, 2000],
          },
          {
            name: "Dépenses",
            data: [1200, 1300, 1100, 1400, 1500, 1600],
          },
        ],
        personalizedAdvice: [
          {
            id: 1,
            message: "Vous dépensez beaucoup en restaurants. Essayez de cuisiner à la maison pour économiser 200 € par mois.",
          },
        ],
        suggestions: [
        {
          id: 1,
          message: "Vous avez économisé 100 € sur votre budget Nourriture. Souhaitez-vous transférer ce montant vers votre épargne ?",
          action: () => this.transferToSavings(100),
          actionLabel: "Transférer",
        },
      ],
      pieChartOptions: {
        labels: ["Nourriture", "Transport", "Loisirs"],
        colors: ["#FF5733", "#33C3FF", "#FFC300"],
      },
      pieChartData: [500, 300, 200],
      lineChartOptions: {
        xaxis: {
          categories: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
        },
      },
      lineChartData: [
        {
          name: "Budget",
          data: [2000, 2000, 2000, 2000, 2000, 2000],
        },
        {
          name: "Dépenses",
          data: [1200, 1300, 1100, 1400, 1500, 1600],
        },
      ],
      };
    },
    methods: {
      addGoal() {
        if (this.newGoal.name && this.newGoal.target > 0) {
          this.financialGoals.push({
            id: this.financialGoals.length + 1,
            name: this.newGoal.name,
            target: this.newGoal.target,
            current: 0,
            progress: [0],
            chartOptions: {
              chart: {
                type: 'radialBar',
              },
              plotOptions: {
                radialBar: {
                  hollow: {
                    size: '70%',
                  },
                },
              },
              labels: ['Progression'],
            },
          });
          this.newGoal = { name: "", target: 0 };
        }
      },
      editGoal(goal) {
        const newName = prompt("Modifier le nom de l'objectif :", goal.name);
        const newTarget = prompt("Modifier le montant cible :", goal.target);
        if (newName && newTarget) {
          goal.name = newName;
          goal.target = parseFloat(newTarget);
        }
      },
      deleteGoal(goalId) {
        this.financialGoals = this.financialGoals.filter((goal) => goal.id !== goalId);
      },
      acceptChallenge(challenge) {
        alert(`Défi accepté : ${challenge.description}`);
      },
      saveAllocations() {
        alert("Allocations enregistrées !");
      },
      transferToSavings(amount) {
      // Logique pour transférer vers l'épargne
      console.log(`Transférer ${amount} € vers l'épargne`);
    },
    },
  };
  </script>
  
  <style scoped>
  .budget-container {
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
    color: white;
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
  
  .budget-list, .goals, .suggestions {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 20px;
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
    margin-bottom: 30px;
  }
  
  .budget-item, .goal-item, .suggestion-item {
    margin-bottom: 20px;
  }
  
  .progress-bar {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    height: 10px;
    overflow: hidden;
  }
  
  .progress {
    background: #f1c40f;
    height: 100%;
    border-radius: 10px;
  }
  
  .progress-circle {
    max-width: 100px;
    margin: 0 auto;
  }
  
  .suggestion-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .suggestion-item button {
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    background: #f1c40f;
    color: #0a192f;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .suggestion-item button:hover {
    background: #e6b800;
  }
  /* Styles pour les Objectifs Financiers */
.goals {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  margin-bottom: 30px;
}

.goal-item {
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.goal-item h3 {
  color: #f1c40f;
  margin-bottom: 10px;
}

.progress-circle {
  max-width: 100px;
  margin: 0 auto 10px;
}

.success {
  color: #2ecc71;
  font-weight: bold;
}

.warning {
  color: #e74c3c;
  font-weight: bold;
}

.add-goal {
  margin-top: 20px;
}

.add-goal input {
  padding: 10px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  outline: none;
  margin-right: 10px;
}

.add-goal button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: #f1c40f;
  color: #0a192f;
  cursor: pointer;
  transition: background 0.3s ease;
}

.add-goal button:hover {
  background: #e6b800;
}

/* Styles pour le Simulateur de Budget */
.simulator {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  margin-bottom: 30px;
}

.simulator-input {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.simulator-input input,
.simulator-input select {
  padding: 10px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  outline: none;
}

.simulator-result p {
  font-size: 16px;
}

.simulator-result .warning {
  color: #e74c3c;
  font-weight: bold;
}

/* Styles pour la Gamification */
.gamification {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  margin-bottom: 30px;
}

.badges,
.challenges {
  margin-bottom: 20px;
}

.badge-item,
.challenge-item {
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.challenge-item button {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background: #f1c40f;
  color: #0a192f;
  cursor: pointer;
  transition: background 0.3s ease;
}

.challenge-item button:hover {
  background: #e6b800;
}

/* Styles pour la Gestion des Revenus */
.income-management {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  margin-bottom: 30px;
}

.income-allocation,
.income-tracking {
  margin-bottom: 20px;
}

.allocation-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.allocation-item input {
  padding: 10px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  outline: none;
}

.income-tracking p {
  font-size: 16px;
}

/* Styles pour le Mode Économie d'Urgence */
.emergency-mode {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  margin-bottom: 30px;
}

.emergency-mode ul {
  list-style-type: disc;
  padding-left: 20px;
}

.emergency-mode li {
  margin-bottom: 10px;
}

/* Styles pour l'Historique des Budgets */
.budget-history {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  margin-bottom: 30px;
}

.history-chart {
  margin-top: 20px;
}

/* Styles pour les Conseils Personnalisés */
.personalized-advice {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  margin-bottom: 30px;
}

.advice-item {
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 10px;
}
  </style>
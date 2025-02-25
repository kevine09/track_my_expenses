<template>
  <div>
    <!-- Section de bienvenue -->
    <div class="welcome-section">
      <h1>Bienvenue, {{ userName }} !</h1>
      <p>Voici un résumé de vos finances ce mois-ci.</p>
    </div>

    <!-- Cartes de résumé -->
    <div class="summary-cards">
      <div class="card">
        <h3>Solde actuel</h3>
        <p>{{ currentBalance }} $</p>
      </div>
      <div class="card">
        <h3>Revenus</h3>
        <p>{{ monthlyIncome }} $ <i class="fas fa-pencil-alt edit-icon" @click="editBudget"></i></p>
      </div>
      <div class="card">
        <h3>Dépenses</h3>
        <p>{{ monthlyExpenses }} $</p>
      </div>
    </div>

    <!-- Graphique en camembert -->
    <div class="chart-container">
      <apexchart width="400" type="pie" :options="chartOptions" :series="chartData"></apexchart>
    </div>

    <!-- Scanner un reçu -->
    <div class="action-cards">
      <div class="receipt-scanner">
        <h2>Scanner un reçu</h2>
        <button @click="scanReceipt"><i class="fas fa-camera"></i> Prendre une photo</button>
      </div>

      <!-- Synchroniser les cartes bancaires -->
      <div class="bank-sync">
        <h2>Synchroniser les cartes bancaires</h2>
        <button @click="showBankCardSync = true"><i class="fas fa-credit-card"></i> Synchroniser</button>
        <BankCardSync v-if="showBankCardSync" @card-synced="handleCardSync" />
      </div>
    </div>

    <!-- Dernières transactions -->
    <div class="recent-transactions">
      <h2>Dernières transactions</h2>
      <ul>
        <li v-for="transaction in recentTransactions" :key="transaction.id">
          <i :class="transaction.icon"></i>
          <span>{{ transaction.description }}</span>
          <span>{{ transaction.amount }} $</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BankCardSync from "../components/BankCardSync.vue";
import Tesseract from 'tesseract.js';
import Notification from '../components/Notification.vue';

export default {
  components: {
    BankCardSync,
    Notification,
  },
  data() {
    return {
      userName: "John Doe",
      currentBalance: 1500,
      monthlyIncome: 3000,
      monthlyExpenses: 1500,
      chartOptions: {
        labels: ['Nourriture', 'Transport', 'Loisirs'],
        colors: ['#f1c40f', '#2ecc71', '#3498db'],
      },
      chartData: [500, 200, 300],
      recentTransactions: [
        { id: 1, icon: "fas fa-utensils", description: "Supermarket", amount: 50 },
        { id: 2, icon: "fas fa-gas-pump", description: "Fuel", amount: 40 },
      ],
      showBankCardSync: false,
    };
  },
  methods: {
    editBudget() {
      alert("Fonctionnalité d'édition du budget à implémenter.");
    },
    scanReceipt() {
      alert("Fonctionnalité de scan de reçu à implémenter.");
    },
    handleCardSync() {
      alert("Fonctionnalité de synchronisation de carte à implémenter.");
    },
  },
};
</script>
  <style scoped>
  /* contenair principal*/
  /* 📌 Contenu principal */
  .main-content {
    flex: 1;
    padding: 20px;
    transition: margin-left 0.3s ease;
    overflow-y: auto;
    margin-left: 70px; /* Largeur du sidebar */
  transition: margin-left 0.3s ease;
  }
  
  .main-content.expanded {
  margin-left: 0; /* Lorsque le sidebar est masqué */
}
  
  /* 📌 Section de bienvenue */
  .welcome-section {
    margin-bottom: 30px;
  }
  
  .welcome-section h1 {
    font-size: 28px;
    margin-bottom: 10px;
    color: #f1c40f;
  }
  
  .welcome-section p {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8);
  }
  
  /* 📌 Cartes de résumé */
  .summary-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 20px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .card:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(245, 193, 36, 0.3);
  }
  
  .card h3 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #f1c40f;
    font-weight: bold;
    text-decoration: underline;
  }
  
  .card p {
    font-size: 24px;
    font-weight: bold;
  }
  

  .chart-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
}

  /* 📌 Graphique en camembert */
  .expense-chart {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 20px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    margin-bottom: 30px;
  }

  .expense-chart:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(245, 193, 36, 0.3);
  }
  
  .expense-chart h2 {
    font-size: 22px;
    margin-bottom: 15px;
    color: #f1c40f;
  }

  .action-cards {
  display: flex;
  gap: 20px; /* Espace entre les cartes */
  margin-bottom: 30px;
}

.receipt-scanner, .bank-sync {
  flex: 1; /* Les cartes prennent une largeur égale */
}

.action-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Deux colonnes de largeur égale */
  gap: 20px; /* Espace entre les cartes */
  margin-bottom: 30px;
}
  
  /* 📌 Scanner un reçu */
  .receipt-scanner {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 20px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 30px;
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

  }
  .receipt-scanner:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(245, 193, 36, 0.3);
  }
  
  .receipt-scanner h2 {
    font-size: 22px;
    margin-bottom: 15px;
    color: #f1c40f;
  }
  
  .receipt-scanner button {
    background: linear-gradient(135deg, #f1c40f, #e67e22);
        color: #0a192f;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .receipt-scanner button:hover {
    background: #e67e22;
  }
  
  /* 📌 Synchroniser les cartes bancaires */
  .bank-sync {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 20px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 30px;
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
    transition: transform 0.3s ease, box-shadow 0.3s ease;


  }
  
    .bank-sync:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(245, 193, 36, 0.3);
    }
  .bank-sync h2 {
    font-size: 22px;
    margin-bottom: 15px;
    color: #f1c40f;
  }
  
  .bank-sync button {
    background: linear-gradient(135deg, #f1c40f, #e67e22);
    color: #0a192f;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .bank-sync button:hover {
    background: #e67e22;
  }
  
  /* 📌 Dernières transactions */
  .recent-transactions {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 20px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
    transition: transform 0.3s ease, box-shadow 0.3s ease

  }
  
  .recent-transactions:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(245, 193, 36, 0.3);
  }


  .recent-transactions h2 {
    font-size: 22px;
    margin-bottom: 15px;
    color: #f1c40f;
  }
  
  .recent-transactions ul {
    list-style: none;
    padding: 0;
  }
  
  .recent-transactions li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: background 0.3s ease;
  }
  
  .recent-transactions li:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  .recent-transactions li i {
    color: #f1c40f;
  }

 
canvas {
  width: 100%;
  height: 100%;
}

  </style>
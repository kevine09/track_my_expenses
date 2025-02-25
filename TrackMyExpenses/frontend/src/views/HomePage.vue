<template>
  <div class="home-contenair"> 
  <div class="app-container">
    <!-- Conteneur pour le top-nav et le sidebar -->
  <div class="nav-sidebar-container">
    <!-- Barre de navigation supérieure -->
    <div class="top-nav">
      <!-- 📌 Sidebar -->
<div class="sidebar" :class="{ 'sidebar-collapsed': isSidebarCollapsed }" v-show="!isSidebarCollapsed">
  <!-- Contenu du sidebar -->
</div>

  <!-- Bouton Sidebar Toggle -->
  <button class="sidebar-toggle" @click="toggleSidebar">
    <i class="fas fa-bars"></i>
  </button>

  <!-- Titre de l'application -->
  <h1 class="app-title">TrackMyExpenses</h1>

  <!-- Icône de notifications -->
  <div class="notifications-icon" @click="toggleNotifications">
  <i class="fas fa-bell"></i>
  <span class="notification-count">{{ notifications.length }}</span>
</div>

    <!-- 📌 Panneau des notifications -->

    <div class="notifications-panel" v-if="showNotifications">
  <h3>Notifications</h3>
  <ul>
    <li v-for="notification in notifications" :key="notification.id">
      <i class="fas fa-info-circle"></i> {{ notification.message }}
    </li>
  </ul>
  <button @click="clearNotifications">Marquer comme lu</button>

  </div>
</div>
    <!-- Panneau latéral -->
    <div class="sidebar" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
      <div class="user-profile">
        <div class="user-photo" @click="uploadPhoto">
          <img v-if="userPhoto" :src="userPhoto" alt="User Photo" />
          <i v-else class="fas fa-user-circle default-icon"></i>
          <input type="file" ref="photoInput" @change="handlePhotoUpload" style="display: none;" />
        </div>
        <p>{{ userName }}</p>
      </div>
      <div class="sidebar-menu">
        <router-link to="/" class="menu-item"><i class="fas fa-home"></i> Accueil</router-link>
        <router-link to="/category" class="menu-item"><i class="fas fa-list"></i> Catégories</router-link>
        <router-link to="/expenses" class="menu-item"><i class="fas fa-money-bill-wave"></i> Dépenses</router-link>
        <router-link to="/reports" class="menu-item"><i class="fas fa-chart-pie"></i> Rapports</router-link>
        <router-link to="/settings" class="menu-item"><i class="fas fa-cog"></i> Paramètres</router-link>
        <router-link to="/profile" class="menu-item"><i class="fas fa-user"></i> Profil</router-link>
        <button class="menu-item" @click="downloadData"><i class="fas fa-cloud-download-alt"></i> Télécharger</button>
        <button class="menu-item" @click="logout"><i class="fas fa-sign-out-alt"></i> Déconnexion</button>
      </div>
    </div>
  </div>

    <!-- Contenu principal -->
    <div class="main-content" :class="{ 'expanded': isSidebarCollapsed }">
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
        <!-- 🔥 Graphique des dépenses -->
      <div class="chart-container">
        <apexchart width="400" type="pie" :options="chartOptions" :series="chartData"></apexchart>
      </div>
      <div class="action-cards">
      <!-- Scanner un reçu -->
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
<!-- Composant de Notification -->
<Notification ref="notification" />
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
  </div>
</div>
</template>  
<script>
import BankCardSync from "../components/BankCardSync.vue";
import Tesseract from 'tesseract.js';
import Notification from '../components/Notification.vue'; // Importez le composant Notification

export default {
  components: {
    BankCardSync,
    Notification,
  },
  data() {
    return {
      isSidebarCollapsed: false,
      showNotifications: false,
      notifications: [
        { id: 1, message: "Vous avez dépassé votre budget de nourriture cette semaine." },
        { id: 2, message: "Bonne gestion ! Vous pouvez épargner 20$ aujourd'hui." },
        { id: 3, message: "Nouvelle transaction détectée sur votre carte bancaire." },
      ],
      showBankCardSync: false,
      userName: "John Doe",
      userPhoto: null,
      userId: 1, // ID de l'utilisateur connecté
      currentBalance: 1500,
      monthlyIncome: 3000,
      monthlyExpenses: 1500,
      budgetConfig: {
        food: 50,
      },
      expenses: {
        food: 65,
      },
      chartOptions: {
        labels: ['Nourriture', 'Transport', 'Loisirs'],
        colors: ['#f1c40f', '#2ecc71', '#3498db'],
      },
      chartData: [500, 200, 300],
      recentTransactions: [
        { id: 1, icon: "fas fa-utensils", description: "Supermarket", amount: 50 },
        { id: 2, icon: "fas fa-gas-pump", description: "Fuel", amount: 40 },
      ],
      isEditingBudget: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
    },
    checkBudgetStatus() {
      if (this.expenses.food > this.budgetConfig.food) {
        this.notifications.push({
          id: new Date().getTime(),
          message: `🚨 Vous avez dépassé votre budget de nourriture (${this.expenses.food}$ > ${this.budgetConfig.food}$). Ajustez votre budget !`,
        });
      }
      let surplus = this.monthlyIncome - this.monthlyExpenses;
      if (surplus > 50) {
        this.notifications.push({
          id: new Date().getTime(),
          message: `💰 Vous pouvez épargner ${Math.min(50, surplus)}$ aujourd'hui.`,
        });
      }
    },
    showSuccessMessage(message) {
      this.$refs.notification.showNotification(message, 'success');
    },
    showErrorMessage(message) {
      this.$refs.notification.showNotification(message, 'error');
    },
    handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) {
      console.error("❌ Aucun fichier sélectionné !");
      this.showErrorMessage("Aucune image sélectionnée.");
      return;
    }

    console.log("📸 Fichier sélectionné :", file);
    if (file && file.type.startsWith('image/')) {
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('userId', this.userId);
      console.log("📤 Données envoyées :", formData);

      fetch('http://localhost:3000/api/upload-photo', {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur lors du téléversement');
          }
          return response.json();
        })
        .then(data => {
          this.userPhoto = data.photo.photoUrl;
          this.showSuccessMessage('Photo téléversée avec succès !');
        })
        .catch(error => {
          console.error('Erreur lors du téléversement:', error);
          this.showErrorMessage('Erreur lors du téléversement de la photo.');
        });
    } else {
      this.showErrorMessage('Veuillez sélectionner une image valide.');
    }
  },
    uploadPhoto() {
      this.$refs.photoInput.click();
    },
    async scanReceipt() {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.onchange = async (event) => {
        const file = event.target.files[0];
        if (file) {
          const { data: { text } } = await Tesseract.recognize(file);
          const extractedData = this.parseReceiptText(text);
          this.processExtractedData(extractedData);
        }
      };
      fileInput.click();
    },
    parseReceiptText(text) {
      const amountMatch = text.match(/(\d+,\d{2})/);
      const merchantMatch = text.match(/[A-Za-z]+/);
      return {
        amount: amountMatch ? amountMatch[0] : null,
        merchant: merchantMatch ? merchantMatch[0] : null,
        rawText: text,
      };
    },
    processExtractedData(data) {
      console.log("Données extraites :", data);
      this.$emit("receipt-scanned", data);
    },
    handleCardSync(cardData) {
    const { cardNumber, expiryDate, cvv, cardHolder } = cardData;
    const userId = this.userId;

    fetch('http://localhost:3000/api/bank-cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cardNumber, expiryDate, cvv, userId }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la synchronisation');
        }
        return response.json();
      })
      .then(data => {
        this.showSuccessMessage('Carte synchronisée avec succès !');
        this.showBankCardSync = false;
      })
      .catch(error => {
        console.error('Erreur lors de la synchronisation:', error);
        this.showErrorMessage('Erreur lors de la synchronisation de la carte.');
      });
  },
  showSuccessMessage(message) {
    alert(message); // Vous pouvez remplacer cela par un composant de notification
  },
  showErrorMessage(message) {
    alert(message); // Vous pouvez remplacer cela par un composant de notification
  },

    downloadData() {
      alert("Fonctionnalité de téléchargement des données à implémenter.");
    },
    logout() {
      alert("Fonctionnalité de déconnexion à implémenter.");
    },
    clearNotifications() {
      this.notifications = [];
    },
    toggleEditBudget() {
      this.isEditingBudget = !this.isEditingBudget;
    },
    saveBudget() {
      this.isEditingBudget = false;
      this.updateBudgetInDatabase(this.monthlyIncome);
    },
    updateBudgetInDatabase(newBudget) {
      fetch('http://localhost:3000/api/update-budget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: this.userId, budget: newBudget }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Budget mis à jour:', data);
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour:', error);
        });
    },
    toggleEditTransaction(transaction) {
      transaction.isEditing = !transaction.isEditing;
    },
    saveTransaction(transaction) {
      transaction.isEditing = false;
      this.updateTransactionInDatabase(transaction);
    },
    updateTransactionInDatabase(transaction) {
      fetch('http://localhost:3000/api/update-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Transaction mise à jour:', data);
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour:', error);
        });
    },
  },
  mounted() {
    this.checkBudgetStatus();
  },
};
</script>
  <style scoped>
  /* contenair principal*/
  .home-contenair{
    display: flex;
    min-height: 200vh;
    width: 1220px;
    background: linear-gradient(135deg, #0a192f, #2ecc71);
    padding: 20px;
    align-items: center;
justify-content: center;
    overflow: hidden;
    font-family: 'Poppins', sans-serif;
  }

  .app-container {
    display: flex;
  width: 100%;
  max-width: 1000px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.5s ease-out;
  }
  @keyframes slideIn {
  from { transform: translateY(-50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Conteneur pour le top-nav et le sidebar */
.nav-sidebar-container {
  display: flex;
  flex-direction: column;
  width: 300px; /* Largeur fixe pour le sidebar */
  background: rgba(255, 255, 255, 0.1);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.2);
}

/* 📌 Barre de navigation supérieure */
.top-nav {
    padding: 10px 20px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #0a192f, #2ecc71);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: background 0.3s ease;
  
}
.top-nav:hover {
  background: linear-gradient(135deg, #0a192f, #1abc9c);
}

.p.user-profile{
  color: white;
}
  .app-title {
    font-size: 24px;
    margin: 0;
    color: #f1c40f;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  
  }
  
  .notifications-icon {
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.notifications-icon:hover {
  transform: scale(1.1);
}
  
.notification-count {
  position: absolute;
  top: -10px;
  right: -10px;
  background: #f1c40f;
  color: #0a192f;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* 📌 Panneau latéral */
.sidebar {
    width: 300px;
    backdrop-filter: blur(25px);
    padding: 10px;
    margin-top: 1px;
    margin-left: 0px;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
    flex: 1;
    background: linear-gradient(135deg, rgba(10, 25, 47, 0.9), rgba(46, 204, 113, 0.9));
  transition: transform 0.3s ease, opacity 0.3s ease;
  border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  
  }
  
  .sidebar-collapsed {
    transform: translateX(-100%);
    opacity: 0;
    
  }
    .sidebar-menu {
        margin-top: 20px;
    }
.sidebar-menu a {
    display: block;
    color: white;
    text-decoration: none;
    transition: background 0.3s ease, color 0.3s ease;
  padding: 12px 16px;
  margin: 8px 0;
  border-radius: 8px;
  border-left: 3px solid transparent;
  }

  .sidebar-menu a:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #f1c40f;
  border-left: 3px solid #f1c40f;
  transform: translateX(5px);
}

    /* Icône d'édition pour les revenus */
.edit-icon {
  margin-left: 10px;
  cursor: pointer;
  color: #f1c40f;
  transition: color 0.3s ease;
}

.edit-icon:hover {
  color: #e67e22;
}

  

  .user-profile {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .user-photo {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.3);
    overflow: hidden;
    transition: transform 0.3s ease, border-color 0.3s ease;
  
  }
  
  .user-photo:hover {
    transform: scale(1.1);
    border-color: #f1c40f;
  }
  
  .user-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .default-icon {
    font-size: 50px;
    color: rgba(255, 255, 255, 0.5);
  }
  
  .menu-item {
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    transition: background 0.3s ease, color 0.3s ease;
  padding: 12px 16px;
  margin: 8px 0;
  border-radius: 8px;
  }
  
  .menu-item:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #f1c40f;
  border-left: 3px solid #f1c40f;
  transform: translateX(5px);
  }
  
  .menu-item i {
    width: 20px;
    text-align: center;
  }
  
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
<template>
    <div class="settings-container">
      <!-- En-tête de la page -->
      <div class="page-header">
        <h1 class="page-title">⚙️ Paramètres</h1>
        <p class="page-description">
          Personnalisez votre expérience dans l'application.
        </p>
      </div>
  
      <!-- Changement de Devise -->
      <div class="settings-section">
        <h2>Devise</h2>
        <select v-model="selectedCurrency" class="settings-select">
          <option v-for="currency in currencies" :key="currency.code" :value="currency.code">
            {{ currency.name }} ({{ currency.symbol }})
          </option>
        </select>
        <button @click="saveCurrency" class="settings-button">Enregistrer</button>
      </div>
  
      <!-- Gestion du Profil -->
      <div class="settings-section">
        <h2>Profil</h2>
        <div class="profile-picture" @click="uploadPhoto">
            <img v-if="userPhoto" :src="userPhoto" alt="User Photo" />
            <i v-else class="fas fa-user-circle default-icon"></i>
          <input type="file" @change="uploadProfilePicture" />
        </div>
        <div class="profile-info">
          <input v-model="user.firstName" placeholder="Prénom" class="settings-input" />
          <input v-model="user.lastName" placeholder="Nom" class="settings-input" />
          <input v-model="user.email" placeholder="E-mail" class="settings-input" />
        </div>
        <button @click="saveProfile" class="settings-button">Enregistrer</button>
      </div>
  
      <!-- Préférences d'Affichage -->
      <div class="settings-section">
        <h2>Affichage</h2>
        <label class="settings-label">
          <input type="checkbox" v-model="darkMode" class="settings-checkbox" /> Mode Sombre
        </label>
        <select v-model="selectedLanguage" class="settings-select">
          <option v-for="language in languages" :key="language.code" :value="language.code">
            {{ language.name }}
          </option>
        </select>
        <button @click="saveDisplaySettings" class="settings-button">Enregistrer</button>
      </div>
  
      <!-- Notifications -->
      <div class="settings-section">
        <h2>Notifications</h2>
        <label class="settings-label">
          <input type="checkbox" v-model="notifications.expenseAlerts" class="settings-checkbox" /> Alertes de Dépenses
        </label>
        <label class="settings-label">
          <input type="checkbox" v-model="notifications.reminders" class="settings-checkbox" /> Rappels
        </label>
        <button @click="saveNotificationSettings" class="settings-button">Enregistrer</button>
      </div>
  
      <!-- Sécurité -->
      <div class="settings-section">
        <h2>Sécurité</h2>
        <button @click="changePassword" class="settings-button">Changer le Mot de Passe</button>
        <label class="settings-label">
          <input type="checkbox" v-model="twoFactorAuth" class="settings-checkbox" /> Authentification à Deux Facteurs
        </label>
        <button @click="saveSecuritySettings" class="settings-button">Enregistrer</button>
      </div>
  
      <!-- Exportation des Données -->
      <div class="settings-section">
        <h2>Données</h2>
        <button @click="exportData" class="settings-button">Exporter les Données</button>
        <button @click="deleteData" class="settings-button danger">Supprimer les Données</button>
      </div>
  
      <!-- Aide et Support -->
      <div class="settings-section">
        <h2>Aide et Support</h2>
        <button @click="openFAQ" class="settings-button">FAQ</button>
        <button @click="openContactForm" class="settings-button">Contactez-nous</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedCurrency: "EUR",
        currencies: [
          { code: "EUR", name: "Euro", symbol: "€" },
          { code: "USD", name: "Dollar américain", symbol: "$" },
          { code: "GBP", name: "Livre sterling", symbol: "£" },
        ],
        user: {

          profilePicture: null,
          firstName: "Jean",
          lastName: "Dupont",
          email: "jean.dupont@example.com",
        },
        darkMode: false,
        selectedLanguage: "fr",
        languages: [
          { code: "fr", name: "Français" },
          { code: "en", name: "Anglais" },
        ],
        notifications: {
          expenseAlerts: true,
          reminders: true,
        },
        twoFactorAuth: false,
      };
    },
    methods: {
      saveCurrency() {
        alert(`Devise enregistrée : ${this.selectedCurrency}`);
      },
      uploadPhoto() {
        this.$refs.photoInput.click();
      },
      handlePhotoUpload(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.userPhoto = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
      saveProfile() {
        alert("Profil enregistré !");
      },
      saveDisplaySettings() {
        alert("Préférences d'affichage enregistrées !");
      },
      saveNotificationSettings() {
        alert("Paramètres de notification enregistrés !");
      },
      changePassword() {
        alert("Ouvrir le formulaire de changement de mot de passe...");
      },
      saveSecuritySettings() {
        alert("Paramètres de sécurité enregistrés !");
      },
      exportData() {
        alert("Exportation des données en cours...");
      },
      deleteData() {
        if (confirm("Êtes-vous sûr de vouloir supprimer toutes vos données ?")) {
          alert("Données supprimées !");
        }
      },
      openFAQ() {
        alert("Ouvrir la FAQ...");
      },
      openContactForm() {
        alert("Ouvrir le formulaire de contact...");
      },
    },
  };
  </script>
  
  <style scoped>
  .settings-container {
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
  
  .settings-section {
    background: rgba(255, 255, 255, 0.05);
    padding: 20px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 20px;
  }
  
  .settings-section h2 {
    color: #f1c40f;
    margin-bottom: 15px;
    font-size: 20px;
  }
  
  .settings-select,
  .settings-input,
  .settings-button {
    width: 100%;
    padding: 10px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    outline: none;
    margin-bottom: 10px;
    font-family: 'Poppins', sans-serif;
  }
  
  .settings-button {
    background: #f1c40f;
    color: #0a192f;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .settings-button:hover {
    background: #e6b800;
  }
  
  .settings-button.danger {
    background: #e74c3c;
  }
  
  .settings-button.danger:hover {
    background: #c0392b;
  }
  
  .profile-picture img {
    width: 200px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }
  
  .profile-picture input {
    display: none;
  }
  
  .profile-info input {
    display: block;
    width: 100%;
    margin-bottom: 10px;
  }
  
  .settings-label {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .settings-checkbox {
    margin-right: 10px;
  }
  </style>
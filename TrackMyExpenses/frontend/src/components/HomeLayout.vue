<template>
    <div class="home-contenair"> 
      <div class="app-container">
        <!-- Conteneur pour le top-nav et le sidebar -->
        <div class="nav-sidebar-container">
          <!-- Barre de navigation supérieure -->
          <div class="top-nav">
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
  
            <!-- Panneau des notifications -->
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
              <router-link to="/home" class="menu-item"><i class="fas fa-home"></i> Accueil</router-link>
              <router-link to="/home/category" class="menu-item"><i class="fas fa-list"></i> Catégories</router-link>
              <router-link to="/home/expenses" class="menu-item"><i class="fas fa-money-bill-wave"></i> Dépenses</router-link>
              <router-link to="/home/budget" class="menu-item"><i class="fas fa-chart-line"></i> Budget</router-link>
              <router-link to="/home/reports" class="menu-item"><i class="fas fa-chart-pie"></i> Rapports</router-link>
              <router-link to="/home/settings" class="menu-item"><i class="fas fa-cog"></i> Paramètres</router-link>
              <button class="menu-item" @click="downloadData"><i class="fas fa-cloud-download-alt"></i> Cloud</button>
              <button class="menu-item" @click="logout"><i class="fas fa-sign-out-alt"></i> Déconnexion</button>
            </div>
          </div>
        </div>
  
        <!-- Contenu principal -->
        <div class="main-content" :class="{ 'expanded': isSidebarCollapsed }">
          <!-- Contenu Dynamique (Catégories, Dépenses, Rapports, etc.) -->
          <router-view></router-view>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isSidebarCollapsed: false,
        showNotifications: false,
        notifications: [
          { id: 1, message: "Vous avez dépassé votre budget de nourriture cette semaine." },
          { id: 2, message: "Bonne gestion ! Vous pouvez épargner 20$ aujourd'hui." },
          { id: 3, message: "Nouvelle transaction détectée sur votre carte bancaire." },
        ],
        userName: "John Doe",
        userPhoto: null,
      };
    },
    methods: {
      toggleSidebar() {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
      },
      toggleNotifications() {
        this.showNotifications = !this.showNotifications;
      },
      clearNotifications() {
        this.notifications = [];
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
      downloadData() {
        alert("Fonctionnalité de téléchargement des données à implémenter.");
      },
      logout() {
        alert("Fonctionnalité de déconnexion à implémenter.");
      },
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
  
    </style>
<template>
    <div class="login-container">
      
      <!-- Contenu principal -->
      <div class="main-content">
  
        <!-- Section gauche : Formulaire de connexion -->
        <div id="login" class="login-section">
          <!-- Logo de l'entreprise -->
          <img src="../assets/logo3.png" alt="Logo TrackMyExpenses" class="logo" />
  
          <h2 class="title">Prenez le contrôle de vos <span class="highlight">finances</span></h2>
          <p class="subtitle">Connectez-vous pour accéder à votre univers financier.</p>
  
          <!-- Formulaire de connexion -->
          <form @submit.prevent="handleLogin">
            <!-- Champ email avec icône -->
            <div class="input-group">
              <label>Email : </label>
              <div class="input-wrapper">
                <i class="fas fa-envelope icon"></i>
                <input type="email" v-model="email" placeholder="exemple@google.com" required />
              </div>
            </div>
  
            <!-- Champ mot de passe avec icône -->
            <div class="input-group">
              <label>Mot de passe :</label>
              <div class="input-wrapper">
                <i class="fas fa-lock icon"></i>
                <input type="password" v-model="password" placeholder="••••••••" required />
              </div>
            </div>
  
            <!-- Bouton de connexion avec icône -->
            <button type="submit" class="btn-login">
              <i class="fas fa-sign-in-alt"></i> Se connecter
            </button>
          </form>
          <!-- ✅ Message de connexion réussie ou erreur -->
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  
          <!-- Boutons de connexion sociale -->
          <div class="social-login">
            <p class="social-text">Ou connectez-vous avec :</p>
            <div class="social-buttons">
              <button class="social-btn google" @click="loginWithGoogle">
                <i class="fab fa-google"></i>
                <span class="tooltip">Google</span>
              </button>
              <button class="social-btn facebook" @click="loginWithFacebook">
                <i class="fab fa-facebook"></i>
                <span class="tooltip">Facebook</span>
              </button>
              <button class="social-btn apple" @click="loginWithApple">
                <i class="fab fa-apple"></i>
                <span class="tooltip">Apple</span>
              </button>
            </div>
          </div>
  
          <!-- Lien d'inscription et mot de passe oublié -->
          <div class="links">
            <p class="switch-text">
  Pas encore de compte ?
  <router-link to="/register" class="register-link">Inscrivez-vous</router-link>
</p>


            <p class="forgot-password">
              <a @click="$router.push('/forgot-password')" class="forgot-link">Mot de passe oublié ?</a>
            </p>
          </div>
        </div>
  
        <!-- Section droite : Animation accrocheuse -->
        <div id="features" class="feature-section">
          <div class="holographic-card">
            <img src="../assets/card.png" alt="Carte Bancaire" class="card-image" />
          </div>
          <h3 class="feature-title">Découvrez nos nouvelles fonctionnalités !</h3>
          <p class="feature-text">
            Suivez vos dépenses en temps réel, gérez vos budgets et atteignez vos objectifs financiers.
          </p>
          <button class="cta-btn" @click="$router.push('/features')">En savoir plus</button>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    data() {
    return {
      email: '',
      password: '',
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleLogin() {
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: this.email, password: this.password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erreur de connexion');
    }

    console.log("✅ Connexion réussie ! Token stocké :", data.token);
    localStorage.setItem('token', data.token);

    console.log("🔄 Redirection vers /home dans 2 secondes...");
    setTimeout(() => {
      console.log("➡️ Redirection forcée vers /home !");
      this.$router.push('/home');  
      
      // 🚀 **Forcer un rechargement après la redirection**
      setTimeout(() => {
        window.location.reload();
      }, 500);

    }, 2000);
  } catch (error) {
    console.error("❌ Erreur de connexion :", error.message);
    this.errorMessage = error.message;
  }
}
,
  // ✅ Corriger la fonction de redirection vers RegisterPage
  methods: {
  goToRegister() {
    console.log("➡️ Redirection vers /register");
    console.log("📌 Valeur de this.$router :", this.$router);

    if (this.$router) {
      this.$router.push('/register');
    } else {
      console.error("❌ Vue Router n'est pas disponible !");
    }
  }
}


,

  loginWithGoogle() {
    alert('Connexion avec Google');
  },
  loginWithFacebook() {
    alert('Connexion avec Facebook');
  },
  loginWithApple() {
    alert('Connexion avec Apple');
  },
  scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  },
}
  };
  </script>

  
<style scoped>

/* Conteneur */
.login-container {
  display: flex;
  
  padding: 20px;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a192f, #2ecc71);
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
}

.success-message {
  color: #2ecc71;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
}

.error-message {
  color: #e74c3c;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
}


/* Contenu principal */
.main-content {
    display: flex;
  width: 80%;
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

/* Section gauche : Formulaire de connexion */
.login-section {
  flex: 1;
  padding: 40px;
  margin-right: 5%;
  text-align: center;
  border: 2px solid rgba(0, 255, 255, 0.3);
  border-radius: 15px;
  box-shadow: 0 0 25px rgba(0, 255, 255, 0.3), inset 0 0 10px rgba(0, 255, 255, 0.2);
}

.logo {
  width: 250px;
  margin-bottom: 20px;
  animation: float 3s ease-in-out infinite;
}

.title {
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-shadow: 0 0 10px #2ecc71;
}

.highlight {
  color: #f1c40f;
  text-shadow: 0 0 10px #f1c40f;
}

.subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  margin-bottom: 20px;
}

/* Champs de saisie */
.input-group {
  text-align: left;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.input-group label {
  color: white;
  font-size: 14px;
  text-align: left;
}

.input-wrapper {
  position: relative;
}

.input-wrapper .icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
}

.input-group input {
  width: 100%;
  padding: 10px 10px 10px 35px;
  border: 2px solid rgba(0, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input-group input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.input-group input:focus {
  border-color: #2ecc71;
  box-shadow: 0 0 10px rgba(46, 204, 113, 0.6);
}

/* Bouton de connexion */
.btn-login {
  width: 100%;
  padding: 12px;
  background: linear-gradient(90deg, #2ecc71, #27ae60);
  border: 2px solid rgba(0, 255, 255, 0.4);
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.btn-login i {
  margin-right: 8px;
}

.btn-login:hover {
  background: linear-gradient(90deg, #27ae60, #1e8449);
  border-color: #f1c40f;
  transform: scale(1.05);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
}

/* Boutons de connexion sociale */
.social-login {
  margin-top: 20px;
}

.social-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  margin-bottom: 10px;
}

.social-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.social-btn {
  width: 40px;
  height: 40px;
  border: 2px solid rgba(0, 255, 255, 0.4);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  position: relative;
}

.social-btn i {
  color: white;
  font-size: 18px;
}

.social-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: #f1c40f;
  transform: scale(1.1);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
}

.social-btn .tooltip {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.social-btn:hover .tooltip {
  opacity: 1;
}

/* Liens d'inscription et mot de passe oublié */
.links {
  margin-top: 20px;
}

.switch-text, .forgot-password {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.register-link, .forgot-link {
  color: #f1c40f;
  cursor: pointer;
  text-decoration: none;
  transition: 0.3s;
}

.register-link:hover, .forgot-link:hover {
  text-decoration: underline;
  color: #e67e22;
}

/* Section droite : Animation accrocheuse */
.feature-section {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 2px solid rgba(0, 255, 255, 0.3);
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3), inset 0 0 10px rgba(0, 255, 255, 0.2);
}

.holographic-card {
  width: 200px;
  height: 150px;
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(46, 204, 113, 0.5);
  animation: glow 3s ease-in-out infinite, rotate 10s linear infinite;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(46, 204, 113, 0.5); }
  50% { box-shadow: 0 0 40px rgba(46, 204, 113, 0.8); }
}

@keyframes rotate {
  0% { transform: rotateY(0); }
  100% { transform: rotateY(360deg); }
}

.feature-title {
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-shadow: 0 0 10px #2ecc71;
}

.feature-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  margin-bottom: 20px;
}

.cta-btn {
  padding: 12px 24px;
  background: linear-gradient(90deg, #2ecc71, #27ae60);
  border: 2px solid rgba(0, 255, 255, 0.4);
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.cta-btn:hover {
  background: linear-gradient(90deg, #27ae60, #1e8449);
  border-color: #f1c40f;
  transform: scale(1.05);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
}
</style>
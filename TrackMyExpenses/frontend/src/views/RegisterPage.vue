<template>
    <div class="register-container">
      <!-- Fond animé -->
      <div class="animated-background"></div>
  
      <!-- Carte d'inscription futuriste -->
      <div class="register-card">
        <!-- Logo de l'application -->
        <img src="../assets/logo3.png" alt="TrackMyExpenses" class="logo" />
  
        <h2 class="title">Reprenez le <span class="highlight">contrôle</span> de vos finances !</h2>
        <p class="subtitle">Créez votre compte et gérez votre budget comme un pro.</p>
  
        <form @submit.prevent="handleRegister">
          <!-- Vérification du pseudo -->
          <div class="input-group">
            <label>Nom d'utilisateur : </label>
            <div class="input-wrapper">
              <i class="fas fa-user icon"></i>
              <input type="text" v-model="username" @input="checkUsername" placeholder="Votre pseudo" required />
              <span v-if="usernameValid === true" class="checkmark">✔</span>
              <span v-if="usernameValid === false" class="error-mark">✖</span>
            </div>
          </div>
  
          <!-- Email -->
          <div class="input-group">
            <label>Email : </label>
            <div class="input-wrapper">
              <i class="fas fa-envelope icon"></i>
              <input type="email" v-model="email" placeholder="exemple@domaine.com" required />
            </div>
          </div>
  
          <!-- Mot de passe avec indicateur de force -->
          <div class="input-group">
            <label>Mot de passe : </label>
            <div class="input-wrapper">
              <i class="fas fa-lock icon"></i>
              <input type="password" v-model="password" @input="checkPasswordStrength" placeholder="••••••••" required />
            </div>
            <div class="strength-container">
              <div class="strength-bar" :class="passwordStrength"></div>
            </div>
          </div>
  
          <!-- Bouton d'inscription avec effet de pression -->
          <button type="submit" class="btn-register">
            <i class="fas fa-user-plus"></i> S'inscrire
          </button>
        </form>
  
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  
        <p class="switch-text">
          Déjà un compte ?  
          <router-link to="/login" class="login-link">Connectez-vous</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        errorMessage: '',
        usernameValid: null,
        passwordStrength: ''
      };
    },
    methods: {
      async handleRegister() {
        try {
          const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: this.username,
              email: this.email,
              password: this.password
            })
          });
  
          const data = await response.json();
  
          if (!response.ok) {
            throw new Error(data.message || "Erreur lors de l'inscription");
          }
  
          alert('Inscription réussie ! Connectez-vous maintenant.');
          this.$router.push('/login');
        } catch (error) {
          this.errorMessage = error.message;
        }
      },
  
      // Vérification du pseudo (fake check)
      async checkUsername() {
        if (this.username.length < 3) {
          this.usernameError = "Le nom d'utilisateur doit contenir au moins 3 caractères";
          return;
        }
        try {
          const res = await fetch(`http://localhost:3000/api/auth/check-username?username=${this.username}`);
          const { exists } = await res.json();
          this.usernameError = exists ? "Ce pseudo est déjà pris" : "";
        } catch {
          this.usernameError = "Erreur lors de la vérification";
        }
      },
  
      // Vérification de la force du mot de passe
      checkPasswordStrength() {
        if (this.password.length < 6) {
          this.passwordStrength = 'weak';
        } else if (this.password.length >= 6 && this.password.match(/[A-Z]/) && this.password.match(/[0-9]/)) {
          this.passwordStrength = 'medium';
        } else if (this.password.length >= 8 && this.password.match(/[A-Z]/) && this.password.match(/[0-9]/) && this.password.match(/[\W]/)) {
          this.passwordStrength = 'strong';
        } else {
          this.passwordStrength = '';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* 📌 Conteneur principal */
  .register-container {
    display: flex;
    height: 200%;
  width: 100vw;
  padding: 20px;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #0a192f, #2ecc71);
    overflow: hidden;
    position: relative;
    font-family: 'Poppins', sans-serif;
  }
  
  /* 📌 Fond animé */
  .animated-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #0a192f, #2ecc71, #0a192f);
    background-size: 200% 200%;
    z-index: -1;
    animation: gradientAnimation 10s ease infinite;
  }
  
  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  /* 📌 Carte d'inscription */
  .register-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(15px);
    border-radius: 15px;
    padding: 40px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    width: 400px;
    text-align: center;
    border: 2px solid rgba(0, 255, 255, 0.3);
    animation: float 3s ease-in-out infinite alternate;
  }
  
  /* Effet flottant */
  @keyframes float {
    0% { transform: translateY(0); }
    100% { transform: translateY(-10px); }
  }
  
  /* Logo */
  .logo {
    width: 250px;
    margin-bottom: 20px;
  }
  
  /* 📌 Effet glow au survol */
  .register-card:hover {
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
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

  /* Indicateur de force du mot de passe */
  .strength-container {
    height: 5px;
    margin-top: 5px;
    width: 100%;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
  
  .strength-bar {
    height: 100%;
    border-radius: 3px;
    transition: width 0.3s ease;
  }
  
  .weak { width: 33%; background: red; }
  .medium { width: 66%; background: orange; }
  .strong { width: 100%; background: green; }
  
  /* Bouton interactif */
  .btn-register {
    width: 100%;
    padding: 12px;
    background: linear-gradient(90deg, #2ecc71, #27ae60);
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    cursor: pointer;
    transition: 0.3s;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    animation: pulse 1.5s infinite;
  }
  
  @keyframes pulse {
    0% { box-shadow: 0 0 10px rgba(46, 204, 113, 0.5); }
    50% { box-shadow: 0 0 20px rgba(46, 204, 113, 0.8); }
    100% { box-shadow: 0 0 10px rgba(46, 204, 113, 0.5); }
  }
  
  .btn-register:hover { transform: scale(1.05); }
  .btn-register:active { transform: scale(0.95); }
  
  /* 📌 Désactiver le bouton en cas de chargement */
  .btn-register:disabled {
    background: gray;
    cursor: not-allowed;
  }
  
  /* Styles des liens */
  .switch-text, .forgot-password {
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
  }
  
  .login-link, .forgot-link {
    color: #f1c40f;
    cursor: pointer;
    text-decoration: none;
    transition: 0.3s;
  }
  
  .login-link:hover, .forgot-link:hover {
    text-decoration: underline;
    color: #e67e22;
  }
  
  /* Titre */
  .title {
    font-size: 24px;
    color: white;
  }
  
  .subtitle {
    font-size: 14px;
    color: white;
  }
  </style>
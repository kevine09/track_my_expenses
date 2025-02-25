<template>
    <div class="homepage-container">
      <!-- Section Hero (Bienvenue) -->
      <section class="hero-section">
    <div class="hero-overlay"></div> <!-- Ajout d’un overlay pour améliorer le contraste -->
    
    <div class="hero-content">
      <h1 class="hero-title">
        🎉 Bienvenue sur <span class="highlight">TrackerMyExpenses</span> !
      </h1>
      <h2 class="hero-subtitle">📊 Prenez le contrôle de vos finances !</h2>
      <p>
        Avec <span class="highlight">TrackMyExpenses</span>, gérez vos finances simplement et intelligemment. 
        Suivez vos dépenses, planifiez vos budgets et atteignez vos objectifs financiers 🚀.
      </p>

      <div class="cta-container">
        <button class="cta-btn primary" @click="$router.push('/login')">
          🚀 Commencez maintenant
        </button>
      </div>

      <div class="hero-image">
        <img src="../assets/finance.png" alt="Finance Illustration" />
      </div>
    </div> <!-- Closing tag added here -->
  </section>

  <!-- 🌟 Qui sommes-nous -->
  <section class="about-section">
    <h2 class="section-title">✨ Qui sommes-nous ?</h2>
    <div class="about-content">
      <div class="about-text">
        <p>TrackMyExpenses est bien plus qu'une simple application financière. Nous sommes une équipe passionnée qui cherche à **simplifier la gestion des finances** pour tout le monde.</p>
        <p>Notre mission est de vous offrir **un outil puissant, intelligent et sécurisé** pour que **vous preniez le contrôle total de vos finances**.</p>
      </div>
      <div class="about-image">
        <img src="../assets/team.png" alt="Notre équipe">
      </div>
    </div>
  </section>
  <section class="features">
    <h2 class="section-title">🚀 Fonctionnalités Clés</h2>
    <div class="features-grid">
      <div class="feature-card" v-for="(feature, index) in features" :key="index">
        <div class="feature-icon">
          <i :class="feature.icon"></i>
        </div>
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
      </div>
    </div>
  </section>
    <!-- 📍 Localisation (Google Maps) -->
    <section class="location">
    <div class="location-text">
      <h2>📍 <span>Où nous trouver ?</span></h2>
      <p>Notre équipe est basée dans un espace collaboratif moderne, prêt à vous accueillir pour discuter finances et innovation.</p>
      <button class="map-btn" @click="openGoogleMaps">Ouvrir sur Google Maps</button>
    </div>
    <div class="map-container">
      <iframe 
        class="map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093656!2d144.96305781590468!3d-37.81627974202152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df1a2f2b1%3A0xa3f83f3e9e7d3b0!2sFederation%20Square!5e0!3m2!1sen!2sfr!4v1630541447045!5m2!1sen!2sfr"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </div>
  </section>

    <!-- 📌 Témoignages -->
    <section class="testimonials">
    <h2>💬 <span>Ce que disent nos utilisateurs</span></h2>
    <div class="testimonial-slider">
      <div class="testimonial-card" v-for="(testimonial, index) in testimonials" :key="index">
        <img :src="testimonial.image" alt="User" class="user-img" />
        <p class="testimonial-text">"{{ testimonial.comment }}"</p>
        <span class="user-name">- {{ testimonial.name }}</span>
      </div>
    </div>
  </section>
  
      <!-- Section À propos -->
      <section class="about-section">
    <h2 class="section-title">🌟 Notre Histoire</h2>
    <div class="timeline">
      <div class="timeline-item" v-for="(step, index) in timeline" :key="index">
        <div class="timeline-icon">
          <i :class="step.icon"></i>
        </div>
        <div class="timeline-content">
          <h3>{{ step.year }}</h3>
          <p>{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>
  
      <!-- Section vision -->
      <section class="vision-section">
    <h2 class="section-title">🔮 Notre Vision</h2>
    <div class="vision-content">
      <div class="stats-container">
        <div class="stat-item" v-for="(stat, index) in stats" :key="index">
          <h3 class="counter" ref="counters">{{ stat.value }}</h3>
          <p>{{ stat.label }}</p>
        </div>
      </div>
      <div class="video-container">
        <iframe 
          src="https://www.youtube.com/embed/9bZkp7q19f0"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </section>
  <button v-show="showButton" class="scroll-top-btn" @click="scrollToTop">
    ⬆️
  </button>
  </div>
  
      <!-- Section Footer -->
      <footer class="footer-section">
        <p>© 2024 TrackMyExpenses. Tous droits réservés.</p>      </footer>
  </template>
  
  <script>
  export default {
    data() {
    return {
      showScrollButton: false,
      testimonials: [
        { 
          name: "Sarah L.", 
          comment: "Depuis que j'utilise TrackMyExpenses, j'ai enfin un contrôle total sur mes finances !",
          image: "../assets/user1.png"
        },
        { 
          name: "Lucas M.", 
          comment: "Un must-have pour gérer son budget de manière intuitive et efficace.",
          image: "../assets/user2.png"
        },
        { 
          name: "Elisa R.", 
          comment: "J'ai économisé 30% de plus grâce aux alertes et aux prévisions personnalisées.",
          image: "../assets/user3.png"
        }
      ],
      timeline: [
        { year: "2021", icon: "fas fa-lightbulb", description: "L'idée de TrackMyExpenses est née pour simplifier la gestion des finances personnelles." },
        { year: "2022", icon: "fas fa-laptop-code", description: "Développement de l'application avec des fonctionnalités innovantes et une interface intuitive." },
        { year: "2023", icon: "fas fa-users", description: "Lancement officiel avec une communauté grandissante d'utilisateurs satisfaits." },
        { year: "2024", icon: "fas fa-rocket", description: "Déploiement de nouvelles fonctionnalités : IA, budget intelligent et bien plus !" }
      ],
      stats: [
        { value: "50K+", label: "Utilisateurs actifs" },
        { value: "90%", label: "Clients satisfaits" },
        { value: "120K$", label: "Économies générées" },
        { value: "4.9/5", label: "Avis moyens" }
      ], 
      features: [
        { icon: "fas fa-wallet", title: "Gestion des Dépenses", description: "Suivez vos dépenses en temps réel et évitez les mauvaises surprises." },
        { icon: "fas fa-chart-pie", title: "Analyse Visuelle", description: "Des graphiques interactifs pour comprendre où va votre argent." },
        { icon: "fas fa-bell", title: "Alertes & Notifications", description: "Recevez des rappels pour éviter les découverts et optimiser vos finances." },
        { icon: "fas fa-file-export", title: "Export des Données", description: "Exportez vos finances en PDF ou CSV pour une analyse détaillée." }
      ]
    };
  },
    mounted() {
      console.log("✅ HomePage.vue CHARGÉ !");
      this.animateCounters();
      window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
    },
    methods: {
      scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    handleScroll() {
      this.showButton = window.scrollY > 300;
    }
  },
    openGoogleMaps() {
      window.open("https://www.google.com/maps/place/Federation+Square", "_blank");
    },animateCounters() {
      const counters = this.$refs.counters;
      counters.forEach(counter => {
        let count = 0;
        const updateCount = () => {
          const target = parseInt(counter.textContent);
          const increment = target / 100;
          if (count < target) {
            count += increment;
            counter.textContent = Math.floor(count);
            requestAnimationFrame(updateCount);
          } else {
            counter.textContent = target;
          }
        };
        updateCount();
      });
    }
  }
  </script>
  
  <style scoped>
  /* 📌 Conteneur principal */
  .homepage-container {
    font-family: 'Poppins', sans-serif;
    color: #333;
    background: linear-gradient(135deg, #0a192f, #2ecc71);
    padding: 20px;
    min-height: 100vh;
    
  }
  
  /* 📌 Section Hero */
  .hero-section {
    margin-bottom: 40px;
    position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 100px 40px;
  background: linear-gradient(135deg, rgba(46, 204, 113, 0.8), rgba(27, 163, 156, 0.8));
  color: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);
  }
  /* Overlay pour améliorer le contraste */
.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  z-index: 1;
}
  
  /* 🟢 Texte principal */
.hero-content {
  max-width: 600px;
  position: relative;
  z-index: 2;
}
  .hero-text {
  max-width: 600px;
}
.hero-title {
  font-size: 42px;
  font-weight: bold;
  text-transform: uppercase;
  text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 15px;
  letter-spacing: 1px;
} 

p {
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
}

.highlight {
  color: #f1c40f;
}

/* 🟢 Boutons CTA */
.cta-container {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.cta-btn {
  padding: 14px 26px;
  border-radius: 50px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

/* 🟡 Bouton principal */
.cta-btn.primary {
  background: linear-gradient(135deg, #f1c40f, #e67e22);
  color: white;
  box-shadow: 0px 4px 10px rgba(241, 196, 15, 0.5);
}

.cta-btn.primary:hover {
  background: linear-gradient(135deg, #e67e22, #f1c40f);
  transform: scale(1.05);
  box-shadow: 0px 6px 15px rgba(241, 196, 15, 0.7);
}
.cta-btn, .feature-card, .hero-image img {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
  .hero-subtitle {
 font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #f1c40f;
  text-shadow: 0px 2px 6px rgba(241, 196, 15, 0.5);
  }
  
  /* 🖼️ Image */
.hero-image {
  position: relative;
  z-index: 2;
}

.hero-image img {
  max-width: 400px;
  border-radius: 15px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  transform: rotate(-2deg);
  transition: transform 0.3s ease;
  margin-top: -300px;
  margin-left: 600px;

}
.hero-image img:hover {
  transform: rotate(0deg) scale(1.05);
}

/* 🌟 Animation sur le texte */
@keyframes textGlow {
  0% { text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.3); }
  50% { text-shadow: 0px 0px 20px rgba(255, 255, 255, 0.6); }
  100% { text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.3); }
}

.highlight {
  color: #f1c40f;
  font-weight: bold;
  animation: textGlow 2s infinite;
}


  /* 🌟 Section Localisation */
.location {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 80px 40px;
  background: linear-gradient(135deg, rgba(27, 163, 156, 0.9), rgba(46, 204, 113, 0.9));
  color: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);
}

/* Texte */
.location-text {
  max-width: 500px;
}

.location h2 {
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 15px;
}

.location p {
  font-size: 18px;
  margin-bottom: 20px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1s ease 0.3s forwards;
}

/* Carte */
.map-container {
  width: 500px;
  height: 350px;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.map-container:hover {
  transform: scale(1.05);
}

.map {
  width: 100%;
  height: 100%;
  border: none;
}

/* Bouton */
.map-btn {
  background: #f1c40f;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  color: black;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none;
}

.map-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
}

/* Animation */
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}


  
.features {
  text-align: center;
  padding: 80px 40px;
  background: linear-gradient(135deg, rgba(46, 204, 113, 0.9), rgba(27, 163, 156, 0.9));
  color: white;
  border-radius: 20px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);
}

/* Titre */
.features-title {
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 40px;
  text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}

/* Grille des fonctionnalités */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

/* Cartes */
.feature-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.feature-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
}

/* Icônes */
.feature-icon {
  font-size: 50px;
  margin-bottom: 20px;
  color: #f1c40f;
  text-shadow: 0px 0px 15px rgba(241, 196, 15, 0.8);
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: rotate(10deg) scale(1.1);
}

/* Titres et texte */
.feature-card h3 {
  font-size: 22px;
  margin-bottom: 10px;
  color: #fff;
}

.feature-card p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}
/* 🎯 Qui sommes-nous */
  
  .about-us {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 80px 40px;
  background: linear-gradient(135deg, rgba(10, 25, 47, 0.9), rgba(46, 204, 113, 0.8));
  color: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);
  position: relative;
}
.about-section {
  padding: 80px 20px;
  background: linear-gradient(135deg, #0a192f, #2ecc71);
  color: white;
  border-radius: 20px;
  text-align: center;
}

/* Texte */
.about-content {
  display: flex;
  align-items: center;
  gap: 40px;}

.about-title {
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  transform: translateY(-10px);
  opacity: 0;
  animation: fadeInUp 1s ease forwards;
}

.about-title span {
  color: #f1c40f;
}

.about-text {
  font-size: 18px;
  line-height: 1.6;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1s ease 0.3s forwards;
}
.about-text {
  flex: 1;
}

.about-image img {
  max-width: 100%;
  border-radius: 10px;
}
/* Image */
.about-image img {
  max-width: 400px;
  border-radius: 15px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  transform: rotate(-2deg);
  transition: transform 0.3s ease;
}

.about-image img:hover {
  transform: rotate(0deg) scale(1.05);
}

/* Animation */
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
  
  /* 📌 Section Feuille de route */
  .roadmap-section {
    padding: 60px 20px;
    background-color: white;
    border-radius: 15px;
    margin-bottom: 40px;
  }
  
  /* 🌟 Section Vision */
.vision-section {
  padding: 80px 40px;
  background: linear-gradient(135deg, #0a192f, #2ecc71);
  color: white;
  text-align: center;
  border-radius: 20px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);
}

/* Contenu */
.vision-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  margin-top: 50px;
}

/* Statistiques */
.stats-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stat-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.counter {
  font-size: 42px;
  font-weight: bold;
  color: #f1c40f;
}

/* Vidéo */
.video-container {
  width: 50%;
  max-width: 600px;
}

.video-container iframe {
  width: 100%;
  height: 300px;
  border-radius: 10px;
  border: none;
}
  
  
 /* 🌟 Section Témoignages */
.testimonials {
  text-align: center;
  padding: 80px 40px;
  background: linear-gradient(135deg, rgba(27, 163, 156, 0.9), rgba(46, 204, 113, 0.9));
  color: white;
  border-radius: 20px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

/* Titre */
.testimonials h2 {
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 40px;
}

/* Slider */
.testimonial-slider {
  display: flex;
  gap: 30px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 10px;
}

.testimonial-card {
  min-width: 300px;
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  scroll-snap-align: start;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* 🌟 Section À Propos */
/* Titre */
.section-title {
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 50px;
}

.about-section {
  padding: 80px 40px;
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: white;
  text-align: center;
  border-radius: 20px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);
}

.timeline {
  position: relative;
  max-width: 700px;
  margin: auto;
}

.timeline-item {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
  animation: fadeInUp 1s ease-in-out forwards;
}

.timeline-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
}

.timeline-content {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

.testimonial-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
}

/* Image */
.user-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 15px;
  border: 3px solid white;
}

/* Texte */
.testimonial-text {
  font-size: 18px;
  font-style: italic;
  margin-bottom: 15px;
}

.user-name {
  font-size: 16px;
  font-weight: bold;
  color: #f1c40f;
}
/* 📌 Footer */
.footer {
  text-align: center;
  padding: 20px;
  background-color: #0a192f;
  color: white;
  border-radius: 15px;
}
.scroll-top-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: linear-gradient(45deg, #2ecc71, #27ae60);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
}

.scroll-top-btn:hover {
  transform: scale(1.2);
  box-shadow: 0 0 25px rgba(0, 255, 255, 0.8);
}
  </style>
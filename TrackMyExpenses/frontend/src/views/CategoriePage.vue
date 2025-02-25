<template>
  <div class="categories-container">
    <!-- Titre et description de la page -->
    <div class="page-header">
      <h1 class="page-title">📂 Gestion des Catégories</h1>
      <p class="page-description">
        Organisez vos dépenses en catégories, définissez des budgets et suivez vos progrès en temps réel.
      </p>
    </div>

    <!-- 🔍 Barre de Recherche -->
    <div class="search-bar">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Rechercher une catégorie..." 
        class="search-input"
      />
      <i class="fas fa-search search-icon"></i>
    </div>

    <!-- 🗂️ Cartes de Résumé (Rappel de la page d'accueil) -->
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

    <!-- 🗂️ Liste des Catégories -->
    <div class="categories-grid">
      <transition-group name="fade">
        <div 
          class="category-card"
          v-for="category in filteredCategories"
          :key="category.id"
          :style="{ background: category.color, borderColor: category.color }"
          @mouseenter="hoverCategory(category.id)"
          @mouseleave="hoverCategory(null)"
        >
          <!-- Icône et Nom de la Catégorie -->
          <div class="icon-wrapper">
            <i :class="category.icon"></i>
          </div>
          <h3>{{ category.name }}</h3>
          <p>{{ category.description }}</p>

          <!-- 📊 Progression du Budget -->
          <div class="budget-info">
            <div class="progress-bar-container">
              <div 
                class="progress-bar"
                :class="{ 'over-budget': category.spent > category.budget }"
                :style="{ width: budgetUsage(category) + '%' }"
              ></div>
            </div>
            <p class="budget-text" :class="{ 'over-text': category.spent > category.budget }">
              {{ category.spent }}€ / {{ category.budget }}€ 
              <span v-if="category.spent > category.budget">🚨 Dépassement</span>
              <span v-else>✅ Sous contrôle</span>
            </p>
          </div>

          <!-- Historique des Dépenses (Accordéon) -->
          <div class="history-section">
            <button class="toggle-history" @click="toggleHistory(category.id)">
              {{ showHistory[category.id] ? 'Masquer l\'historique' : 'Afficher l\'historique' }}
            </button>
            <transition name="slide">
              <ul v-if="showHistory[category.id]" class="history-list">
                <li v-for="expense in category.history" :key="expense.id">
                  {{ expense.date }} - {{ expense.amount }}€ ({{ expense.description }})
                </li>
              </ul>
            </transition>
          </div>

          <!-- ⚙️ Actions -->
          <div class="category-actions">
            <button class="edit-btn" @click="editCategory(category)">✏️</button>
            <button class="delete-btn" @click="deleteCategory(category.id)">🗑️</button>
          </div>
        </div>
      </transition-group>
    </div>

    <!-- ➕ Ajouter une Catégorie -->
    <button class="add-category-btn" @click="showAddModal = true">
      ➕ Ajouter une Catégorie
    </button>

    <!-- 📌 Modal Ajout / Édition -->
    <div v-if="showAddModal" class="modal-overlay">
      <div class="modal">
        <h2>{{ editingCategory ? "Modifier la Catégorie" : "Ajouter une Catégorie" }}</h2>
        <input v-model="newCategory.name" placeholder="Nom de la catégorie" />
        <input v-model="newCategory.icon" placeholder="Classe FontAwesome (ex: fas fa-utensils)" />
        <input v-model="newCategory.budget" type="number" placeholder="Budget alloué (€)" />
        <input v-model="newCategory.color" placeholder="Couleur (ex: #FF5733)" />
        <textarea v-model="newCategory.description" placeholder="Description"></textarea>
        <button @click="saveCategory">💾 Enregistrer</button>
        <button @click="showAddModal = false" class="close-btn">❌ Annuler</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      showAddModal: false,
      editingCategory: null,
      showHistory: {}, // Pour gérer l'affichage de l'historique par catégorie
      newCategory: { name: "", icon: "", budget: 0, color: "#FFFFFF", description: "" },
      currentBalance: 1500,
      monthlyIncome: 3000,
      monthlyExpenses: 1500,
      chartOptions: {
        labels: ['Nourriture', 'Transport', 'Loisirs'],
        colors: ['#f1c40f', '#2ecc71', '#3498db'],
      },
      chartData: [500, 200, 300],
      categories: [
        {
          id: 1,
          name: "Nourriture",
          icon: "fas fa-utensils",
          description: "Dépenses alimentaires",
          budget: 300,
          spent: 250,
          color: "linear-gradient(135deg, rgba(255, 87, 51, 0.8), rgba(255, 195, 0, 0.8))",
          history: [
            { id: 1, date: "2023-10-01", amount: 50, description: "Supermarché" },
            { id: 2, date: "2023-10-05", amount: 30, description: "Restaurant" },
          ],
        },
        {
          id: 2,
          name: "Transport",
          icon: "fas fa-car",
          description: "Essence, billets de train",
          budget: 200,
          spent: 220,
          color: "linear-gradient(135deg, rgba(51, 195, 255, 0.8), rgba(51, 133, 255, 0.8))",
          history: [
            { id: 1, date: "2023-10-02", amount: 40, description: "Essence" },
          ],
        },
        {
          id: 3,
          name: "Loisirs",
          icon: "fas fa-film",
          description: "Cinéma, sorties",
          budget: 150,
          spent: 100,
          color: "linear-gradient(135deg, rgba(255, 195, 0, 0.8), rgba(255, 87, 51, 0.8))",
          history: [
            { id: 1, date: "2023-10-03", amount: 20, description: "Cinéma" },
          ],
        },
      ],
    };
  },
  computed: {
    filteredCategories() {
      return this.categories.filter(category =>
        category.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    budgetUsage(category) {
      return Math.min((category.spent / category.budget) * 100, 100);
    },
    toggleHistory(categoryId) {
      this.$set(this.showHistory, categoryId, !this.showHistory[categoryId]);
    },
    hoverCategory(categoryId) {
      // Ajoutez des effets visuels au survol si nécessaire
    },
    editCategory(category) {
      this.newCategory = { ...category };
      this.editingCategory = category;
      this.showAddModal = true;
    },
    deleteCategory(categoryId) {
      this.categories = this.categories.filter(category => category.id !== categoryId);
    },
    saveCategory() {
      if (this.editingCategory) {
        const index = this.categories.findIndex(c => c.id === this.editingCategory.id);
        this.categories.splice(index, 1, { ...this.newCategory });
      } else {
        this.categories.push({ ...this.newCategory, id: this.categories.length + 1 });
      }
      this.resetForm();
    },
    resetForm() {
      this.newCategory = { name: "", icon: "", budget: 0, color: "#FFFFFF", description: "" };
      this.editingCategory = null;
      this.showAddModal = false;
    },
  },
};
</script>

<style scoped>
.categories-container {
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

.search-bar {
  position: relative;
  margin-bottom: 30px;
}

.search-input {
  width: 100%;
  padding: 10px 40px 10px 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  outline: none;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  border-color: #f1c40f;
}

.search-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.5);
}

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
  border-radius: 15px;
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
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.category-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

.icon-wrapper {
  font-size: 30px;
  color: white;
  margin-bottom: 10px;
}

.budget-info {
  margin-top: 15px;
}

.progress-bar-container {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  overflow: hidden;
}

.progress-bar {
  height: 10px;
  background: #2ecc71;
  transition: width 0.3s ease;
}

.progress-bar.over-budget {
  background: #e74c3c;
}

.budget-text {
  margin-top: 5px;
  font-size: 14px;
}

.budget-text.over-text {
  color: #e74c3c;
}

.history-section {
  margin-top: 15px;
}

.toggle-history {
  background: none;
  border: none;
  color: #f1c40f;
  cursor: pointer;
  font-size: 14px;
}

.history-list {
  list-style: none;
  padding: 0;
  margin-top: 10px;
}

.history-list li {
  padding: 5px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.category-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}

.edit-btn, .delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: white;
}

.delete-btn {
  color: #e74c3c;
}

.add-category-btn {
  margin-top: 30px;
  padding: 12px 20px;
  font-size: 16px;
  background: linear-gradient(135deg, #f1c40f, #e67e22);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.add-category-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 5px 15px rgba(245, 193, 36, 0.5);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 15px;
  width: 400px;
  text-align: center;
  color: #0a192f;
}

.modal h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.modal input, .modal textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.modal button {
  padding: 10px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

.close-btn {
  background: #e74c3c;
  color: white;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: max-height 0.5s ease;
}

.slide-enter, .slide-leave-to {
  max-height: 0;
  overflow: hidden;
}
</style>
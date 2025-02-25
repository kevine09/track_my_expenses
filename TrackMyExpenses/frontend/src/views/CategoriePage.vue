<template>
  <div class="categories-container">
    <h1 class="page-title">📂 Mes Catégories</h1>

    <!-- 🔍 Barre de Recherche -->
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Rechercher une catégorie..." />
    </div>

    <!-- 🗂️ Liste des Catégories -->
    <div class="categories-grid">
      <div 
        class="category-card"
        v-for="category in filteredCategories"
        :key="category.id"
      >
        <div class="icon-wrapper">
          <i :class="category.icon"></i>
        </div>
        <h3>{{ category.name }}</h3>
        <p>{{ category.description }}</p>

        <!-- ⚙️ Options (Éditer / Supprimer) -->
        <div class="category-actions">
          <button class="edit-btn" @click="editCategory(category)">✏️</button>
          <button class="delete-btn" @click="deleteCategory(category.id)">🗑️</button>
        </div>
      </div>
    </div>

    <!-- ➕ Bouton Ajouter une Catégorie -->
    <button class="add-category-btn" @click="showAddModal = true">➕ Ajouter une Catégorie</button>

    <!-- 📌 Modal Ajout / Édition -->
    <div v-if="showAddModal" class="modal-overlay">
      <div class="modal">
        <h2>{{ editingCategory ? "Modifier la Catégorie" : "Ajouter une Catégorie" }}</h2>
        <input v-model="newCategory.name" placeholder="Nom de la catégorie" />
        <input v-model="newCategory.icon" placeholder="Classe FontAwesome (ex: fas fa-utensils)" />
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
      categories: [],
      newCategory: { name: "", icon: "", description: "" }
    };
  },
  computed: {
    filteredCategories() {
      return this.categories.filter(category =>
        category.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await fetch('http://localhost:3000/api/categories', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // 🔥 Ajoute le token si nécessaire
          }
        });
        if (!response.ok) throw new Error('Erreur API');
        this.categories = await response.json();
      } catch (error) {
        console.error('Erreur :', error);
      }
    },
    async saveCategory() {
      try {
        const url = this.editingCategory
          ? `http://localhost:3000/api/categories/${this.editingCategory.id}` // Mettre à jour une catégorie existante
          : 'http://localhost:3000/api/categories'; // Ajouter une nouvelle catégorie

        const method = this.editingCategory ? 'PUT' : 'POST';

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // 🔥 Ajoute le token si nécessaire
          },
          body: JSON.stringify(this.newCategory)
        });

        if (!response.ok) throw new Error('Erreur API');
        this.fetchCategories(); // Rafraîchir la liste des catégories
        this.resetForm();
      } catch (error) {
        console.error('Erreur lors de la sauvegarde de la catégorie :', error);
      }
    },
    async deleteCategory(id) {
      try {
        const response = await fetch(`http://localhost:3000/api/categories/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // 🔥 Ajoute le token si nécessaire
          }
        });

        if (!response.ok) throw new Error('Erreur API');
        this.fetchCategories(); // Rafraîchir la liste des catégories
      } catch (error) {
        console.error('Erreur lors de la suppression de la catégorie :', error);
      }
    },
    editCategory(category) {
      this.newCategory = { ...category };
      this.editingCategory = category;
      this.showAddModal = true;
    },
    resetForm() {
      this.newCategory = { name: "", icon: "", description: "" };
      this.editingCategory = null;
      this.showAddModal = false;
    }
  },
  mounted() {
    this.fetchCategories();
  }
};
</script>
<style scoped>
/* 🌟 Conteneur Principal */
.categories-container {
  max-width: 900px;
  margin: 50px auto;
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

/* 🎯 Titre */
.page-title {
  font-size: 32px;
  margin-bottom: 20px;
  color: #2ecc71;
}

/* 🔍 Barre de Recherche */
.search-bar input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 2px solid #2ecc71;
  font-size: 16px;
  outline: none;
}

/* 🗂️ Grille de Catégories */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

/* 📌 Carte Catégorie */
.category-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 255, 255, 0.3);
}

/* 🎨 Icône */
.icon-wrapper {
  font-size: 30px;
  color: #2ecc71;
  margin-bottom: 10px;
}

/* ⚙️ Boutons Modifier / Supprimer */
.category-actions {
  position: absolute;
  top: 10px;
  right: 10px;
}

.edit-btn, .delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-left: 5px;
}

.delete-btn {
  color: #e74c3c;
}

/* ➕ Bouton Ajouter une Catégorie */
.add-category-btn {
  margin-top: 30px;
  padding: 12px 20px;
  font-size: 16px;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.add-category-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 5px 15px rgba(0, 255, 255, 0.5);
}

/* 📌 Modal Ajout / Modification */
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
  border-radius: 10px;
  width: 400px;
  text-align: center;
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
</style>

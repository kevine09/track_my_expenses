import dotenv from 'dotenv';
import path from 'path';
import multer from 'multer'; // Importez Multer
import fs from 'fs';
import Photo from '../src/models/Photo.js'; // Importez le modèle Photo

// Synchronisation de la base de données
sequelize.sync({ force: false }) // `force: false` pour ne pas écraser les tables existantes
  .then(() => {
    console.log('✅ Base de données synchronisée (tables recréées)');
  })
  .catch((err) => {
    console.error('Erreur lors de la synchronisation de la base de données :', err);
  });

const uploadsDir = path.resolve('uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log('✅ Dossier uploads créé');
}

const envPath = path.resolve('backend/.env'); // Spécifie explicitement le chemin
dotenv.config({ path: envPath });
console.log("Chemin du fichier .env :", envPath);

// Vérifier si le fichier existe
if (!fs.existsSync(envPath)) {
  console.error("⚠️ Le fichier .env n'existe pas !");
} else {
  console.log("✅ Le fichier .env a été trouvé !");
}

console.log("Valeur de JWT_SECRET après chargement :", process.env.JWT_SECRET);

// Importer les modèles et les relations
import { User, Category, Expense, Budget, Report } from './models/index.js'; // Assurez-vous que ce fichier existe

import express from 'express'; // Importe Express
import cors from 'cors'; // Importe CORS pour autoriser les requêtes cross-origin
import sequelize from './config/db.js'; // Importe la configuration de la base de données
import authRoutes from './routes/authRoutes.js'; // Importe les routes d'authentification
import expenseRoutes from './routes/expenseRoutes.js'; // Importez les routes des dépenses
import categoryRoutes from './routes/categoryRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import photoRoutes from './routes/photoRoutes.js';
import bankCardRoutes from './routes/bankCardRoutes.js';

const app = express(); // Crée une instance d'Express
const PORT = process.env.PORT || 3000; // Définit le port du serveur

// Configuration de Multer pour gérer les fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Dossier où les fichiers seront stockés
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nom unique pour le fichier
  },
});
const upload = multer({ storage });

// Middleware
app.use(cors({
  origin: '*', // Accepte les requêtes depuis n'importe quel domaine
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json()); // Permet à Express de parser le JSON

app.use((req, res, next) => {
  console.log(`🔍 Requête reçue : ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes); // Utilise les routes d'authentification
app.use('/api/expenses', expenseRoutes); // Utilisez les routes des dépenses
app.use('/api/categories', categoryRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/bank-cards', bankCardRoutes);

app.post('/api/upload-photo', upload.single('photo'), async (req, res) => {
  try {
    console.log("📸 Fichier reçu :", req.file);
    console.log("📂 Données reçues :", req.body);

    if (!req.file) {
      throw new Error("Aucun fichier reçu.");
    }

    const { userId } = req.body;
    if (!userId) {
      throw new Error("userId est manquant dans la requête.");
    }

    const photoUrl = `/uploads/${req.file.filename}`;

    // Vérifier si l'utilisateur existe
    const userExists = await User.findByPk(userId);
    if (!userExists) {
      throw new Error("L'utilisateur spécifié n'existe pas.");
    }

    // Créer l'entrée en base de données
    const photo = await Photo.create({ userId, photoUrl });

    console.log("✅ Photo enregistrée :", photo);
    res.status(201).json({ message: 'Photo téléversée avec succès', photo });

  } catch (err) {
    console.error("❌ Erreur lors du téléversement :", err);
    res.status(500).json({ message: 'Erreur lors du téléversement', error: err.message });
  }
});


// Synchronisation de la base de données
sequelize.sync().then(() => {
  console.log('base de donnees synchronisee'); // Affiche un message lorsque la base de données est synchronisée
});

// Démarre le serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Affiche un message lorsque le serveur démarre
});

async function testDB() {
  try {
    const users = await User.findAll();
    console.log("✅ Utilisateurs récupérés :", users);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des utilisateurs :", error);
  }
}

testDB();
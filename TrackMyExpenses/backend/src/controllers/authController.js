import bcrypt from 'bcryptjs'; // Importe bcrypt pour le hachage des mots de passe
import jwt from 'jsonwebtoken'; // Importe JWT pour la génération de tokens
import User from '../models/user.js'; // Importe le modèle User

// Fonction pour l'inscription
export const register = async (req, res) => {
  const { username, email, password } = req.body; // Récupère les données du corps de la requête

  // Hache le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crée un nouvel utilisateur
  const user = await User.create({ username, email, password: hashedPassword });

  // Renvoie une réponse
  res.status(201).json({ message: 'Utilisateur créé avec succès', user });
};


// Fonction pour la connexion
export const login = async (req, res) => {
  const { email, password } = req.body; // Récupère les données du corps de la requête
  // Debug : vérifier les données reçues
  console.log("Email reçu:", email);
  console.log("Password reçu:", password);
  // Vérifier si email et password sont fournis
  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe sont requis' });
  }

  // Trouve l'utilisateur par email
  const user = await User.findOne({ where: { email } });


  // Vérifier si l'utilisateur existe
  if (!user) {
    return res.status(401).json({ message: 'Identifiants invalides' });
  }

  // Vérifier si le mot de passe est défini
  if (!user.password) {
    return res.status(500).json({ message: 'Erreur serveur : mot de passe utilisateur introuvable' });
  }

  // Comparer les mots de passe
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Identifiants invalides' });
  }


  // Debug : Vérifier la valeur de JWT_SECRET
  console.log("JWT_SECRET:", process.env.JWT_SECRET);  

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: 'Erreur serveur : JWT_SECRET non défini' });
  }
  const jwtSecret = process.env.JWT_SECRET || 'cledekevine09';
console.log("JWT_SECRET chargé:", jwtSecret);
  
// Génère un token JWT
 const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
 

  // Renvoie le token
  res.json({ token });
};
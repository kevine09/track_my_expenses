import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Récupère le token du header

  if (!token) {
    return res.status(401).json({ message: 'token absent , access refuse' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérifie le token
    req.userId = decoded.userId; // Ajoute l'ID de l'utilisateur à la requête
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalide' });
  }
};

export default authMiddleware;
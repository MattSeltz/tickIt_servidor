import jwt from "jsonwebtoken"

import {JWT_SECRET} from "../configs/configs.js"

const authenticateToken = (req, res, next) => {
  if (req.path.startsWith("/auth")) {
    return next();
  }

  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Acceso denegado. Token requerido." });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado." });
  }
};

export default authenticateToken
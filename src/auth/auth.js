import { Router } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { Usuario } from "../models/usuario.js"

import {JWT_SECRET} from "../configs/configs.js"

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { nombre, password, email } = req.body;

    if (!nombre || !password || !email) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    const existingUser = await Usuario.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Usuario({ nombre, password: hashedPassword, email });
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado con éxito." });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor.", error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    const user = await Usuario.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }

    const token = jwt.sign({ id: user._id, nombre: user.nombre }, JWT_SECRET);

    res.status(200).json({ message: "Inicio de sesión exitoso.", token });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor.", error });
  }
});

export default router
import e from "express";
import cors from "cors"

import {db} from "./db/db.js"

import { PORT } from "./configs/configs.js"

import usuariosRoutes from "./routes/usuario.js"
import tareasRoutes from "./routes/tarea.js"
import authRoutes from "./auth/auth.js"
import authenticateToken from "./middlewares/auth.js"

await db()

const app = e()

app.use(e.json())
app.use(cors())

app.use(authenticateToken)

app.use("/auth", authRoutes)

app.use("/usuarios", usuariosRoutes)
app.use("/tareas", tareasRoutes)

app.get("/", (req, res) => res.send(`<h1>TICKIT API</h1>`))

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
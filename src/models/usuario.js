import { Schema, model } from "mongoose";

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required:true
  },
  foto: {
    type:String
  },
  tareas: [{type:Schema.Types.ObjectId, ref:"Tarea"}]
}, { timestamps: true })

export const Usuario = model("Usuario",usuarioSchema)
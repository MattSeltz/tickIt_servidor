import { Schema, model } from "mongoose";

const tareaSchema = new Schema({
  nombre: {
    type: String,
    required:true
  },
  calendario: [
    {
      dia: {
        type: String,
        required:true
      },
      horario: [{
        type: String,
        required:true
      }]
    }
  ],
  fecha: {
    type: String,
    required:true
  },
  realizado: {
    type: Boolean,
    required:true
  },
  usuario: {type:Schema.Types.ObjectId, ref:"Usuario"}
}, { timestamps: true })

export const Tarea = model("Tarea",tareaSchema)
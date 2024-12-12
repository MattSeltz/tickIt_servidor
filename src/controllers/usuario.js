import { Usuario } from "../models/usuario.js"

export const getData = async (req, res) => {
  try {
    const usuario = await Usuario.find().populate("tarea")
    res.json(usuario)
  } catch (error) {
    console.error(error)
  }
}

export const getOneData = async (req, res) => {
  const {id} = req.params

  try {
    const usuario = await Usuario.findById(id).populate("tarea")
    res.json(usuario)
  } catch (error) {
    console.error(error)
  }
}

export const postData = async (req, res) => {
  try {
    const usuario = new Usuario(req.body)
    await usuario.save()
    res.json(usuario)
  } catch (error) {
    console.error(error)
  }
}

export const putData = async (req, res) => {
  const {id} = req.params

  try {
    const usuario = await Usuario.findByIdAndUpdate(id, req.body, { new: true })
    res.json(usuario)
  } catch (error) {
    console.error(error)
  }
}

export const deleteData = async (req, res) => {
  const {id} = req.params

  try {
    const usuario = await Usuario.findByIdAndDelete(id)
    res.json(usuario)
  } catch (error) {
    console.error(error)
  }
}
import { Tarea } from "../models/tarea.js"

export const getData = async (req, res) => {
  try {
    const tarea = await Tarea.find().populate("usuario")
    res.json(tarea)
  } catch (error) {
    console.error(error)
  }
}

export const getOneData = async (req, res) => {
  const {id} = req.params

  try {
    const tarea = await Tarea.findById(id).populate("usuario")
    res.json(tarea)
  } catch (error) {
    console.error(error)
  }
}

export const postData = async (req, res) => {
  try {
    const tarea = new Tarea(req.body)
    await tarea.save()
    res.json(tarea)
  } catch (error) {
    console.error(error)
  }
}

export const putData = async (req, res) => {
  const {id} = req.params

  try {
    const tarea = await Tarea.findByIdAndUpdate(id, req.body, { new: true })
    res.json(tarea)
  } catch (error) {
    console.error(error)
  }
}

export const deleteData = async (req, res) => {
  const {id} = req.params

  try {
    const tarea = await Tarea.findByIdAndDelete(id)
    res.json(tarea)
  } catch (error) {
    console.error(error)
  }
}
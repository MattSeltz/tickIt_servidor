import { connect } from "mongoose";

import {MONGODB_KEY} from "../configs/configs.js"

export const db = async () => {
  try {
    await connect(MONGODB_KEY)
    console.log("Conectado a Mongo DB")
  } catch (error) {
    console.error(error)
  }
}
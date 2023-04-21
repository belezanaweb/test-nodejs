import * as dotenv from 'dotenv'
dotenv.config()
import { app } from "./app"
import mongoose from 'mongoose'

const PORT = process.env.PORT
const password = process.env.PASSWORD_MONGO_ATLAS
const user = process.env.USER_MONGO_ATLAS

mongoose.connect(`mongodb+srv://${user}:${password}@boticario.9b0wn6v.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => console.log("Database Connected"))
  .catch((err) => { throw err })

app.listen(PORT, () => console.log(`Magic happen on ${process.env.HOST_NAME}:${PORT}`))
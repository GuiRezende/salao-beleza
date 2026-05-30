import mongoose from "mongoose"

async function connectDb() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING)

    console.log("Conectado ao MongoDB Atlas")
  } catch (erro) {
    console.log(erro)
  }
}

export default connectDb
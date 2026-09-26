import mongoose from 'mongoose';

const servicoSchema = new mongoose.Schema(
    {
        nomeTipo: String, 
        valor: Number,
        tempoDuracao: Number
    }
)

const Servico = mongoose.model("Servico", servicoSchema, "servicos")
export default Servico
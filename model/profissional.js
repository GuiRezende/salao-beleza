import mongoose from 'mongoose';

const profissionalSchema = new mongoose.Schema(
    {
        nome: String,
        telefone: String,
        cpf: String,
        especialidade: String,
        salario: Number,
        endereco_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Endereco'
        }
    },
    {
        versionKey: false
    }
);

const Profissional = mongoose.model("Profissional", profissionalSchema, "profissionais")

export default Profissional

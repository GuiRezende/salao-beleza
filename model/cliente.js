import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema(
    {
        nome: String,
        telefone: String,
        dataNascimento: Date,
        endereco: String,
        cpf: String,
        endereco_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Endereco'
        }
    },
    {
        versionKey: false
    }
);

const Cliente = mongoose.model("Cliente", clienteSchema, "clientes")

export default Cliente
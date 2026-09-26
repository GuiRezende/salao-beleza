import mongoose from 'mongoose';

const enderecoSchema = new mongoose.Schema(
    {
        cidade: String,
        estado: String,
        cep: String,
        logradouro: String,
        numero: String
    },
    {
        versionKey: false
    }
);

const Endereco = mongoose.model("Endereco", enderecoSchema, "enderecos")

export default Endereco



import fs from "fs"
import endereco from "../model/endereco.js";

async function getTodosEnderecos() {
    const listaEnderecos = await endereco.find({});
    return listaEnderecos;
}

async function getEnderecoById(id) {
    const enderecoEncontrado = await endereco.findById(id);
    return enderecoEncontrado;
}

async function insertEndereco(novoEndereco) {
    const enderecoCriado = await endereco.create(novoEndereco);
    return enderecoCriado;
}

async function updateEndereco(id, enderecoAtualizado) {
    const enderecoEncontrado = await endereco.findByIdAndUpdate(id, enderecoAtualizado, { new: true });
    return enderecoEncontrado;
}

async function deleteEnderecoById(id) {
    const enderecoDeletado = await endereco.findByIdAndDelete(id);
    return enderecoDeletado;
}

export { 
    getTodosEnderecos, 
    getEnderecoById, 
    insertEndereco, 
    updateEndereco, 
    deleteEnderecoById 
}   

import fs from "fs"
import Servico from "../model/Servico.js"

async function getAll() {
    const listaServicos = await Servico.find({});
    return listaServicos;
}

async function getServicoById(id) {
    const servicoEncontrado = await Servico.findById(id);
    return servicoEncontrado;
}

async function insertServico(novoServico) {
    const servicoCriado = await Servico.create(novoServico);
    return servicoCriado;
}

async function updateServico(id, servicoAtualizado) {
    const servicoEncontrado = await Servico.findByIdAndUpdate(id, servicoAtualizado, { new: true });
    return servicoEncontrado;
}

async function deleteById(id) {
    const servicoDeletado = await Servico.findByIdAndDelete(id);
    return servicoDeletado;
}

export { 
    getAll, 
    getServicoById, 
    insertServico, 
    updateServico, 
    deleteById
}
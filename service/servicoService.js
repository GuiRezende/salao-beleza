import fs from "fs"
import Servico from "../model/servico.js"
import Agendamento from "../model/agendamento.js"

async function getAll() {
    const listaServicos = await Servico.find({});
    return listaServicos;
}

async function getServicoById(id) {
    const servicoEncontrado = await Servico.findById(id);
    return servicoEncontrado;
}

async function getServicoByNome(nome) {
    return await Servico.find({
        nomeTipo: { $regex: nome, $options: 'i' }
    })
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
    const possuiAgendamentos = await Agendamento.exists({ 'servicos.servico_id': id })
    if (possuiAgendamentos) {
        const error = new Error('Este serviço possui agendamentos e não pode ser excluído.')
        error.status = 409
        throw error
    }
    const servicoDeletado = await Servico.findByIdAndDelete(id);
    return servicoDeletado;
}

export { 
    getAll, 
    getServicoById, 
    getServicoByNome,
    insertServico, 
    updateServico, 
    deleteById
}
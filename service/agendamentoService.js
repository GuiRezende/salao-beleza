import fs from "fs"
import Agendamento from "../model/agendamento.js"

const CAMPOS_POPULATE = [
    { path: 'cliente_id' },
    { path: 'servicos.servico_id' },
    { path: 'servicos.profissional_id' },
    { path: 'pagamento_id' }
]

async function getAll() {
    const agendamentos = await Agendamento.find().populate(CAMPOS_POPULATE)
    return agendamentos
}

async function getAgendamentoById(id) {
    const agendamento = await Agendamento.findById(id).populate(CAMPOS_POPULATE)
    return agendamento
}

async function insertAgendamento(novoAgendamento) {
    console.log("Novo agendamento recebido:", novoAgendamento)
    const agendamentoCriado = await Agendamento.create(novoAgendamento)
    return agendamentoCriado
}

async function updateAgendamento(id, dadosAtualizados) {
    const agendamento = await Agendamento.findById(id)

    if (!agendamento) {
        throw new Error('Agendamento não encontrado')
    }

    return await Agendamento.findByIdAndUpdate(
        id,
        dadosAtualizados,
        { new: true }
    )
}

async function deleteById(id) {
    const agendamentoDeletado = await Agendamento.findByIdAndDelete(id)
    return agendamentoDeletado
}

export {
    getAll,
    getAgendamentoById,
    insertAgendamento,
    updateAgendamento,
    deleteById
}
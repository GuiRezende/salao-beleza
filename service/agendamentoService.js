import fs from "fs"
import Agendamento from "../model/Agendamento.js"

async function getAll() {
    const agendamentos = await Agendamento.find()
    return agendamentos
}

async function getAgendamentoById(id) {
    const agendamento = await Agendamento.findById(id)
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
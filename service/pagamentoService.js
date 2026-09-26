import fs from "fs"
import Pagamento from "../model/pagamento.js"

async function getAll() {
    const pagamentos = await Pagamento.find()
    return pagamentos
}

async function getPagamentoById(id) {
    console.log("ID recebido para consulta:", id)
    const pagamento = await Pagamento.findById(id.toString())
    return pagamento
}

async function insertPagamento(novoPagamento) {
    console.log("Novo pagamento recebido:", novoPagamento)
    const pagamentoCriado = await Pagamento.create(novoPagamento)
    return pagamentoCriado
}

async function updatePagamento(id, pagamentoAtualizado) {
    const pagamentoEncontrado = await Pagamento.findByIdAndUpdate(id, pagamentoAtualizado, { new: true })
    return pagamentoEncontrado
}

async function deleteById(id) {
    const pagamentoDeletado = await Pagamento.findByIdAndDelete(id)
    return pagamentoDeletado
}

export { 
    getAll, 
    getPagamentoById, 
    insertPagamento, 
    updatePagamento, 
    deleteById
}
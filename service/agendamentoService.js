const fs = require("fs")

function getAll() {
    return JSON.parse(fs.readFileSync("./repository/agendamentoRepository.json"))
}

function getAgendamentoById(id) {}

function insertAgendamento(agendamento) {}

function updateAgendamento(agendamento, id){}

function deleteById(id){}

module.exports = { 
    getAll, 
    getAgendamentoById, 
    insertAgendamento, 
    updateAgendamento, 
    deleteById
}
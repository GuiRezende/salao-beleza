const fs = require("fs")
const AGENDAMENTO_REPOSITORY = "./repository/agendamentoRepository.json"


function getAll() {
    return JSON.parse(fs.readFileSync(AGENDAMENTO_REPOSITORY))
}

function getAgendamentoById(id) {
    const agendamentos = getAll()
    return agendamentos.filter(agendamento => agendamento._id === Number(id));
}

function insertAgendamento(agendamento) { }

function updateAgendamento(agendamento, id) { }

function deleteById(id) {
    let agendamentos = getAll()
    const agendamentosFiltrados = agendamentos.filter(agendamento => agendamento._id !== Number(id));
    fs.writeFileSync(AGENDAMENTO_REPOSITORY, JSON.stringify(agendamentosFiltrados))
}

module.exports = {
    getAll,
    getAgendamentoById,
    insertAgendamento,
    updateAgendamento,
    deleteById
}
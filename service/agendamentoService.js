const fs = require("fs")
const AGENDAMENTO_REPOSITORY = "./repository/agendamentoRepository.json"


function getAll() {
    return JSON.parse(fs.readFileSync(AGENDAMENTO_REPOSITORY))
}

function getAgendamentoById(id) {
    const agendamentos = getAll()
    return agendamentos.filter(agendamento => agendamento._id === Number(id));
}

function insertAgendamento(agendamento) {
    const todosAgendamentos = getAll()
    todosAgendamentos.push(agendamento)
    fs.writeFileSync(AGENDAMENTO_REPOSITORY, JSON.stringify(todosAgendamentos))
 }

function updateAgendamento(agendamento, id) {
    const todosAgendamentos = getAll();
    const index = todosAgendamentos.findIndex(a => a._id === Number(id));
    if (index !== -1) {
        Object.assign(todosAgendamentos[index], agendamento);
        fs.writeFileSync(AGENDAMENTO_REPOSITORY, JSON.stringify(todosAgendamentos, null, 2)); // Adicionei indentação para legibilidade
    } else {
        throw new Error(`Agendamento com ID ${id} não encontrado.`);
    }
}

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
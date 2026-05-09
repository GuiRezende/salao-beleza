const { getAll, getAgendamentoById, insertAgendamento, updateAgendamento, deleteById } = require("../service/agendamentoService")

function getAgendamentos(req, res) {
    try {
        const agendamentos = getAll()
        res.send(agendamentos)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO LISTAR OS AGENDAMENTOS: " + error.message)
    }
}

function getAgendamento(req, res) {
}

function postAgendamento(req, res) {
}

function patchAgendamento(req, res) {
}

function deleteAgendamento(req, res) {
}

module.exports = {
    getAgendamentos,
    getAgendamento,
    postAgendamento,
    patchAgendamento,
    deleteAgendamento
}
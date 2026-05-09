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
    try {
        const id = req.params.id
        const agendamento = getAgendamentoById(id)
        res.send(agendamento)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO CONSULTAR AGENDAMENTO: " + error.message)
    }
}

function postAgendamento(req, res) {
}

function patchAgendamento(req, res) {
}

function deleteAgendamento(req, res) {
    try {
        const id = req.params.id
        deleteById(id)
        res.send("Agendamento deletado com sucesso")
    } catch (error) {
        res.status(500)
        res.send("ERRO AO REMOVER AGENDAMENTO: " + error.message)
    }
}

module.exports = {
    getAgendamentos,
    getAgendamento,
    postAgendamento,
    patchAgendamento,
    deleteAgendamento
}
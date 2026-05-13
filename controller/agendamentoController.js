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
        const agendamento = getAgendamentoById(req.params.id)
        res.send(agendamento)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO CONSULTAR AGENDAMENTO: " + error.message)
    }
}

function postAgendamento(req, res) {
    try {
        insertAgendamento(req.body)
        res.send("Agendamento inserido com sucesso")
    } catch (error) {
        res.status(500)
        res.send("ERRO AO INSERIR AGENDAMENTO: " + error.message)
    }
}

function patchAgendamento(req, res) {
    try {
        updateAgendamento(req.body, req.params.id)
        res.send("Agendamento atualizado com sucesso")
    } catch (error) {
        res.status(500)
        res.send("ERRO AO ATUALIZAR AGENDAMENTO: " + error.message)
    }
}

function deleteAgendamento(req, res) {
    try {
        deleteById(req.params.id)
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
import { getAll, getAgendamentoById, insertAgendamento, updateAgendamento, deleteById } from "../service/agendamentoService.js"

async function getAgendamentos(req, res) {
    try {
        const agendamentos = await getAll()
        res.send(agendamentos)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO LISTAR OS AGENDAMENTOS: " + error.message)
    }
}

async function getAgendamento(req, res) {
    try {
        const agendamento = await getAgendamentoById(req.params.id)
        res.send(agendamento)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO CONSULTAR AGENDAMENTO: " + error.message)
    }
}

async function postAgendamento(req, res) {
    try {
        const agendamento = await insertAgendamento(req.body)
        res.send("Agendamento inserido com sucesso")
    } catch (error) {
        res.status(500)
        res.send("ERRO AO INSERIR AGENDAMENTO: " + error.message)
    }
}

async function patchAgendamento(req, res) {
    try {
        const agendamento = await updateAgendamento(req.params.id, req.body)
        res.send("Agendamento atualizado com sucesso")
    } catch (error) {
        res.status(500)
        res.send("ERRO AO ATUALIZAR AGENDAMENTO: " + error.message)
    }
}

async function deleteAgendamento(req, res) {
    try {
        await deleteById(req.params.id)
        res.send("Agendamento deletado com sucesso")
    } catch (error) {
        res.status(500)
        res.send("ERRO AO REMOVER AGENDAMENTO: " + error.message)
    }
}

export {
    getAgendamentos,
    getAgendamento,
    postAgendamento,
    patchAgendamento,
    deleteAgendamento
}
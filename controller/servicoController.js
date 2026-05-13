const { getAll, getServicoById, insertServico, updateServico, deleteById } = require("../service/servicoService")

function getServicos(req, res) {
    try {
        const servicos = getAll()
        res.send(servicos)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO LISTAR SERVICOS: " + error.message)
    }
}

function getServico(req, res) {
    try {
        const id = req.params.id
        const servico = getServicoById(id)
        res.send(servico)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO CONSULTAR SERVICO: " + error.message)
    }
}

function postServico(req, res) {
    try {
        const body = req.body
        insertServico(body)
        res.send("Servico inserido com sucesso")
    } catch (error) {
        res.status(500)
        res.send("ERRO AO INSERIR SERVICO: " + error.message)
    }
}

function patchServico(req, res) {
    try {
        updateServico(req.body, req.params.id)
        res.send("Servico atualizado com sucesso")
    } catch (error) {
        res.status(500)
        res.send("ERRO AO ATUALIZAR SERVICO: " + error.message)
    }
}

function deleteServico(req, res) {
    try {
        const id = req.params.id
        deleteById(id)
        res.send("Servico deletado(a) com sucesso")
    } catch (error) {
        res.status(500)
        res.send("ERRO AO REMOVER SERVICO: " + error.message)
    }
}

module.exports = {
    getServicos,
    getServico,
    postServico,
    patchServico,
    deleteServico
}
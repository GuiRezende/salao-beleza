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
}

function patchServico(req, res) {
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
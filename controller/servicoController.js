import { getAll, getServicoById, getServicoByNome, insertServico, updateServico, deleteById } from "../service/servicoService.js"

async function getServicos(req, res) {
    try {
        const servicos = await getAll()
        res.send(servicos)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO LISTAR SERVICOS: " + error.message)
    }
}

async function getServico(req, res) {
    try {
        const id = req.params.id
        const servico = await getServicoById(id)
        res.send(servico)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO CONSULTAR SERVICO: " + error.message)
    }
}

async function getServicoPorNome(req, res) {
    try {
        const nome = req.params.nome
        const servico = await getServicoByNome(nome)
        res.send(servico)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO CONSULTAR SERVICO: " + error.message)
    }
}

async function postServico(req, res) {
    try {
        const body = req.body
        const servico = await insertServico(body)
        res.send(servico)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO INSERIR SERVICO: " + error.message)
    }
}

async function patchServico(req, res) {
    try {
        const servico = await updateServico(req.params.id, req.body)
        res.send(servico)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO ATUALIZAR SERVICO: " + error.message)
    }
}

async function deleteServico(req, res) {
    try {
        const id = req.params.id
        await deleteById(id)
        res.send("Servico deletado(a) com sucesso")
    } catch (error) {
        res.status(500)
        res.send("ERRO AO REMOVER SERVICO: " + error.message)
    }
}

export {
    getServicos,
    getServico,
    getServicoPorNome,
    postServico,
    patchServico,
    deleteServico
}
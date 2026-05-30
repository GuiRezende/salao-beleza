import { getAll, getProfissionalById, insertProfissional, updateProfissional, deleteById } from "../service/profissionalService.js"

async function getProfissionais(req, res) {
    try {
        const profissionais = await getAll()
        res.send(profissionais)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO LISTAR PROFISSIONAIS: " + error.message)
    }
}

async function getProfissional(req, res) {
    try {
        const id = req.params.id
        const profissional = await getProfissionalById(id)
        res.send(profissional)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO CONSULTAR PROFISSIONAL: " + error.message)
    }
}

async function postProfissional(req, res) {
    try {
        const body = req.body
        const profissional = await insertProfissional(body)
        res.send(profissional)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO INSERIR PROFISSIONAL: " + error.message)
    }
}

async function patchProfissional(req, res) {
    try {
        const profissional = await updateProfissional(req.params.id, req.body)
        res.send(profissional)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO ATUALIZAR PROFISSIONAL: " + error.message)
    }
}

async function deleteProfissional(req, res) {
    try {
        const id = req.params.id
        deleteById(id)
        res.send("Profissional deletado(a) com sucesso")
    } catch (error) {
        res.status(500)
        res.send("ERRO AO REMOVER PROFISSIONAL: " + error.message)
    }
}

export {
    getProfissionais,
    getProfissional,
    postProfissional,
    patchProfissional,
    deleteProfissional
}
import { getAll, getPagamentoById, insertPagamento, updatePagamento, deleteById } from "../service/pagamentoService.js"

async function getPagamentos(req, res) {
    try {
        const pagamentos = await getAll()
        res.send(pagamentos)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO LISTAR OS PAGAMENTOS: " + error.message)
    }
}

async function getPagamento(req, res) {
    try {
        const id = req.params.id
        const pagamento = await getPagamentoById(id)
        console.log(pagamento)
        res.send(pagamento)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO CONSULTAR PAGAMENTO: " + error.message)
    }
}

async function postPagamento(req, res) {
    try {
        const body = req.body
        const pagamento = await insertPagamento(body)
        res.send(pagamento)
        console.log("Pagamento inserido com sucesso")
    } catch (error) {
        res.status(500)
        res.send("ERRO AO INSERIR PAGAMENTO: " + error.message)
    }
}

function patchPagamento(req, res) {
    try {
        updatePagamento(req.body, req.params.id)
        res.send("Pagamento atualizado com sucesso")
    } catch (error) {
        res.status(500)
        res.send("ERRO AO ATUALIZAR PAGAMENTO: " + error.message)
    }
}

function deletePagamento(req, res) {
    try {
        const id = req.params.id
        deleteById(id)
        res.send("Pagamento deletado com sucesso")
    } catch (error) {
        res.status(500)
        res.send("ERRO AO REMOVER PAGAMENTO: " + error.message)
    }
}

export {
    getPagamentos,
    getPagamento,
    postPagamento,
    patchPagamento,
    deletePagamento
}
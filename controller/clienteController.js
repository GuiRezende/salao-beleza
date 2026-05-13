const { getAll, getClienteById, insertCliente, updateCliente, deleteById } = require("../service/clienteService")

function getClientes(req, res) {
    try {
        const clientes = getAll()
        res.send(clientes)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO LISTAR OS CLIENTES: " + error.message)
    }
}

function getCliente(req, res) {
    try {
        const id = req.params.id
        const cliente = getClienteById(id)
        res.send(cliente)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO CONSULTAR CLIENTE: " + error.message)
    }
}

function postCliente(req, res) {
    try {
        const body = req.body
        insertCliente(body)
        res.send("Cliente inserido com sucesso")
    } catch (error) {
        res.status(500)
        res.send("ERRO AO INSERIR CLIENTE: " + error.message)
    }
}

function patchCliente(req, res) {
    try {
        updateCliente(req.body, req.params.id)
        res.send("Cliente atualizado com sucesso")
    } catch (error) {
        res.status(500)
        res.send("ERRO AO ATUALIZAR CLIENTE: " + error.message)
    }
}

function deleteCliente(req, res) {
    try {
        const id = req.params.id
        deleteById(id)
        res.send("Cliente deletado com sucesso")
    } catch (error) {
        res.status(500)
        res.send("ERRO AO REMOVER CLIENTE: " + error.message)
    }
}

module.exports = {
    getClientes,
    getCliente,
    postCliente,
    patchCliente,
    deleteCliente
}
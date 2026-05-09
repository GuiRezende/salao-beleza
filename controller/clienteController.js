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
}

function postCliente(req, res) {
}

function patchCliente(req, res) {
}

function deleteCliente(req, res) {
}

module.exports = {
    getClientes,
    getCliente,
    postCliente,
    patchCliente,
    deleteCliente
}
const fs = require("fs")
const CLIENTE_REPOSITORY = "./repository/clienteRepository.json"


function getAll() {
    return JSON.parse(fs.readFileSync("./repository/clienteRepository.json"))
}

function getClienteById(id) {
    const clientes = getAll()
    return clientes.filter(cliente => cliente._id === Number(id));
}

function insertCliente(cliente) { }

function updateCliente(cliente, id) { }

function deleteById(id) {
    let clientes = getAll()
    const clientesFiltrados = clientes.filter(cliente => cliente._id !== Number(id));
    fs.writeFileSync(CLIENTE_REPOSITORY, JSON.stringify(clientesFiltrados))
}

module.exports = {
    getAll,
    getClienteById,
    insertCliente,
    updateCliente,
    deleteById
}
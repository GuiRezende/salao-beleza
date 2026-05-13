const fs = require("fs")
const CLIENTE_REPOSITORY = "./repository/clienteRepository.json"


function getAll() {
    return JSON.parse(fs.readFileSync("./repository/clienteRepository.json"))
}

function getClienteById(id) {
    const clientes = getAll()
    return clientes.filter(cliente => cliente._id === id);
}

function insertCliente(cliente) {
    const todosClientes = getAll()
    todosClientes.push(cliente)
    fs.writeFileSync(CLIENTE_REPOSITORY, JSON.stringify(todosClientes, null, 2))
}

function updateCliente(cliente, id) {
    const todosClientes = getAll();
    const index = todosClientes.findIndex(c => c._id === id);
    if (index !== -1) {
        Object.assign(todosClientes[index], cliente);
        fs.writeFileSync(CLIENTE_REPOSITORY, JSON.stringify(todosClientes, null, 2)); // Adicionei indentação para legibilidade
    } else {
        throw new Error(`Cliente com ID ${id} não encontrado.`);
    }
 }

function deleteById(id) {
    let clientes = getAll()
    const clientesFiltrados = clientes.filter(cliente => cliente._id !== id);
    fs.writeFileSync(CLIENTE_REPOSITORY, JSON.stringify(clientesFiltrados, null, 2))
}

module.exports = {
    getAll,
    getClienteById,
    insertCliente,
    updateCliente,
    deleteById
}
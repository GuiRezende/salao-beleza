const fs = require("fs")

function getAll() {
    return JSON.parse(fs.readFileSync("./repository/clienteRepository.json"))
}

function getClienteById(id) {}

function insertCliente(cliente) {}

function updateCliente(cliente, id){}

function deleteById(id){}

module.exports = { 
    getAll, 
    getClienteById, 
    insertCliente, 
    updateCliente, 
    deleteById
}
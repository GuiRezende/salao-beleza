const fs = require("fs")

function getAll() {
    return JSON.parse(fs.readFileSync("./repository/filaEsperaRepository.json"))
}

function getFilaEsperaById(id) {}

function insertFilaEspera(filaEspera) {}

function updateFilaEspera(filaEspera, id){}

function deleteById(id){}

module.exports = { 
    getAll, 
    getFilaEsperaById, 
    insertFilaEspera, 
    updateFilaEspera, 
    deleteById
}
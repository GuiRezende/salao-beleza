const fs = require("fs")
const FILA_ESPERA_REPOSITORY = "./repository/filaEsperaRepository.json"


function getAll() {
    return JSON.parse(fs.readFileSync(FILA_ESPERA_REPOSITORY))
}

function getFilaEsperaById(id) {
    const filas = getAll()
    return filas.filter(fila => fila._id === Number(id));
}

function insertFilaEspera(filaEspera) {}

function updateFilaEspera(filaEspera, id){}

function deleteById(id){
    let filas = getAll()
    const filasFiltradas = fila.filter(fila => fila._id !== Number(id));
    fs.writeFileSync(FILA_ESPERA_REPOSITORY, JSON.stringify(filasFiltradas))    
}

module.exports = { 
    getAll, 
    getFilaEsperaById, 
    insertFilaEspera, 
    updateFilaEspera, 
    deleteById
}
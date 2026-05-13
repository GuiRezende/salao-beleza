const fs = require("fs")
const FILA_ESPERA_REPOSITORY = "./repository/filaEsperaRepository.json"


function getAll() {
    return JSON.parse(fs.readFileSync(FILA_ESPERA_REPOSITORY))
}

function getFilaEsperaById(id) {
    const filas = getAll()
    return filas.filter(fila => fila._id === Number(id));
}

function insertFilaEspera(filaEspera) {
    const todasFilas = getAll()
    todasFilas.push(filaEspera)
    fs.writeFileSync(FILA_ESPERA_REPOSITORY, JSON.stringify(todasFilas, null, 2));
}

function updateFilaEspera(filaEspera, id) {
    const todasFilas = getAll();
    const index = todasFilas.findIndex(f => f._id === Number(id));
    if (index !== -1) {
        Object.assign(todasFilas[index], filaEspera);
        fs.writeFileSync(FILA_ESPERA_REPOSITORY, JSON.stringify(todasFilas, null, 2));
    } else {
        throw new Error(`Fila de espera com ID ${id} não encontrada.`);
    }
}

function deleteById(id) {
    let filas = getAll()
    const filasFiltradas = filas.filter(fila => fila._id !== Number(id));
    fs.writeFileSync(FILA_ESPERA_REPOSITORY, JSON.stringify(filasFiltradas, null, 2));
}

module.exports = {
    getAll,
    getFilaEsperaById,
    insertFilaEspera,
    updateFilaEspera,
    deleteById
}
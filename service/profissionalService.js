const fs = require("fs")

function getAll() {
    return JSON.parse(fs.readFileSync("./repository/profissionalRepository.json"))
}

function getProfissionalById(id) {}

function insertProfissional(profissional) {}

function updateProfissional(profissional, id){}

function deleteById(id){}

module.exports = { 
    getAll, 
    getProfissionalById, 
    insertProfissional, 
    updateProfissional, 
    deleteById
}
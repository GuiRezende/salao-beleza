const fs = require("fs")
const PROFISSIONAL_REPOSITORY = "./repository/profissionalRepository.json"

function getAll() {
    return JSON.parse(fs.readFileSync(PROFISSIONAL_REPOSITORY))
}

function getProfissionalById(id) {
    const profissionais = getAll()
    return profissionais.filter(profissional => profissional._id === Number(id));
}

function insertProfissional(profissional) {}

function updateProfissional(profissional, id){}

function deleteById(id){
    let profissionais = getAll()
    const profissionaisFiltradas = profissionais.filter(profissional => profissional._id !== Number(id));
    fs.writeFileSync(PROFISSIONAL_REPOSITORY, JSON.stringify(profissionaisFiltradas))    
}

module.exports = { 
    getAll, 
    getProfissionalById, 
    insertProfissional, 
    updateProfissional, 
    deleteById
}
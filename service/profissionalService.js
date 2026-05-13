const fs = require("fs")
const PROFISSIONAL_REPOSITORY = "./repository/profissionalRepository.json"

function getAll() {
    return JSON.parse(fs.readFileSync(PROFISSIONAL_REPOSITORY))
}

function getProfissionalById(id) {
    const profissionais = getAll()
    return profissionais.filter(profissional => profissional._id === id);
}

function insertProfissional(profissional) {
    const todosProfissionais = getAll()
    todosProfissionais.push(profissional)
    fs.writeFileSync(PROFISSIONAL_REPOSITORY, JSON.stringify(todosProfissionais, null, 2));
}

function updateProfissional(profissional, id){
    const todosProfissionais = getAll();
    const index = todosProfissionais.findIndex(p => p._id === id);
    if (index !== -1) {
        Object.assign(todosProfissionais[index], profissional);
        fs.writeFileSync(PROFISSIONAL_REPOSITORY, JSON.stringify(todosProfissionais, null, 2));
    } else {
        throw new Error(`Profissional com ID ${id} não encontrado.`);
    }
}

function deleteById(id){
    let profissionais = getAll()
    const profissionaisFiltradas = profissionais.filter(profissional => profissional._id !== id);
    fs.writeFileSync(PROFISSIONAL_REPOSITORY, JSON.stringify(profissionaisFiltradas, null, 2))    
}

module.exports = { 
    getAll, 
    getProfissionalById, 
    insertProfissional, 
    updateProfissional, 
    deleteById
}
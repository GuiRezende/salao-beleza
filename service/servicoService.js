const fs = require("fs")
const SERVICO_REPOSITORY = "./repository/servicoRepository.json"

function getAll() {
    return JSON.parse(fs.readFileSync(SERVICO_REPOSITORY))
}

function getServicoById(id) {
    const servicos = getAll()
    return servicos.filter(servico => servico._id === Number(id));
}

function insertServico(servico) {
    const todosServicos = getAll()
    todosServicos.push(servico)
    fs.writeFileSync(SERVICO_REPOSITORY, JSON.stringify(todosServicos))
}

function updateServico(servico, id){
    let servicos = getAll()
    const index = servicos.findIndex(s => s._id === Number(id));
    if (index !== -1) {
        Object.assign(servicos[index], servico);
        fs.writeFileSync(SERVICO_REPOSITORY, JSON.stringify(servicos, null, 2));
    } else {
        throw new Error(`Servico com ID ${id} não encontrado.`);
    }
}

function deleteById(id){
    let servicos = getAll()
    const servicosFiltrados = servicos.filter(servico => servico._id !== Number(id));
    fs.writeFileSync(SERVICO_REPOSITORY, JSON.stringify(servicosFiltrados))    
}

module.exports = { 
    getAll, 
    getServicoById, 
    insertServico, 
    updateServico, 
    deleteById
}
const fs = require("fs")
const SERVICO_REPOSITORY = "./repository/servicoRepository.json"

function getAll() {
    return JSON.parse(fs.readFileSync(SERVICO_REPOSITORY))
}

function getServicoById(id) {
    const servicos = getAll()
    return servicos.filter(servico => servico._id === Number(id));
}

function insertServico(servico) {}

function updateServico(servico, id){}

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
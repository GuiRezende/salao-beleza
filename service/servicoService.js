const fs = require("fs")

function getAll() {
    return JSON.parse(fs.readFileSync("./repository/servicoRepository.json"))
}

function getServicoById(id) {}

function insertServico(servico) {}

function updateServico(servico, id){}

function deleteById(id){}

module.exports = { 
    getAll, 
    getServicoById, 
    insertServico, 
    updateServico, 
    deleteById
}
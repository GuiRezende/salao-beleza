import fs from "fs"
import Endereco from '../model/endereco.js'
import Profissional from '../model/profissional.js'
import Agendamento from '../model/agendamento.js'

async function getAll() {
    const listaProfissionais = await Profissional.find({}).populate('endereco_id');
    return listaProfissionais;
}

async function getProfissionalById(id) {
    const profissionalEncontrado = await Profissional.findById(id).populate('endereco_id');
    return profissionalEncontrado;
}

async function insertProfissional(novoProfissional) {
  const { endereco: dadosEndereco, ...dadosProfissional } = novoProfissional

  const enderecoCriado = await Endereco.create(dadosEndereco)

  const profissionalCriado = await Profissional.create({
    ...dadosProfissional,
    endereco_id: enderecoCriado._id
  })

  return profissionalCriado
}

async function updateProfissional(id, dadosAtualizados) {
    const profissional = await Profissional.findById(id)

    if (!profissional) {
        throw new Error('Profissional não encontrado')
    }

    const { endereco, ...dadosProfissional } = dadosAtualizados

    if (endereco) {
        await Endereco.findByIdAndUpdate(
            profissional.endereco_id,
            endereco
        )
    }

    return await Profissional.findByIdAndUpdate(
        id,
        dadosProfissional,
        { new: true }
    )
}

async function deleteById(id) {
    const possuiAgendamentos = await Agendamento.exists({ 'servicos.profissional_id': id })
    if (possuiAgendamentos) {
        const error = new Error('Este profissional possui agendamentos e não pode ser excluído.')
        error.status = 409
        throw error
    }
    const profissionalDeletado = await Profissional.findByIdAndDelete(id);
    return profissionalDeletado;
}

export { 
    getAll, 
    getProfissionalById, 
    insertProfissional, 
    updateProfissional, 
    deleteById
}
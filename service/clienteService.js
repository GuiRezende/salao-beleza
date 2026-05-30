import fs from "fs"
import Cliente from '../model/Cliente.js'
import Endereco from '../model/Endereco.js'

async function getAll() {
    const listaClientes = await Cliente.find({});
    return listaClientes;
}

async function getClienteById(id) {
    const clienteEncontrado = await Cliente.findById(id);
    return clienteEncontrado;
}

async function getClienteByNome(nome) {
    return await Cliente.find({
        nome: { $regex: nome, $options: 'i' }
    })
}

async function insertCliente(novoCliente) {
  const { endereco: dadosEndereco, ...dadosCliente } = novoCliente

  const enderecoCriado = await Endereco.create(dadosEndereco)

  const clienteCriado = await Cliente.create({
    ...dadosCliente,
    endereco_id: enderecoCriado._id
  })

  return clienteCriado
}

async function updateCliente(cpf, dadosAtualizados) {
  const cliente = await Cliente.findById(cpf)

  if (!cliente) {
    throw new Error('Cliente não encontrado')
  }

  const { endereco, ...dadosCliente } = dadosAtualizados

  if (endereco) {
    await Endereco.findByIdAndUpdate(
      cliente.endereco_id,
      endereco
    )
  }

  return await Cliente.findByIdAndUpdate(
    cpf,
    dadosCliente,
    { new: true }
  )
}

async function deleteById(id) {
    const clienteDeletado = await cliente.findByIdAndDelete(id);
    return clienteDeletado;
}

export {
    getAll,
    getClienteById,
    getClienteByNome,
    insertCliente,
    updateCliente,
    deleteById
}
import { getAll, getClienteById, insertCliente, updateCliente, deleteById } from "../service/clienteService.js"

async function getClientes(req, res) {
    try {
        const clientes = await getAll()
        res.send(clientes)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO LISTAR OS CLIENTES: " + error.message)
    }
}

async function getCliente(req, res) {
    try {
        const id = req.params.id
        const cliente = await getClienteById(id)
        res.send(cliente)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO CONSULTAR CLIENTE: " + error.message)
    }
}

async function postCliente(req, res) {
    try {
        const body = req.body
        const cliente = await insertCliente(body)
        res.send(cliente) 
        console.log("Cliente inserido com sucesso")
    } catch (error) {
        res.status(500)
        res.send("ERRO AO INSERIR CLIENTE: " + error.message)
    }
}

async function patchCliente(req, res) {
    try {
        const cliente = await updateCliente(req.params.id, req.body)
        res.send(cliente)
    } catch (error) {
        res.status(500)
        res.send("ERRO AO ATUALIZAR CLIENTE: " + error.message)
    }
}

async function deleteCliente(req, res) {
    try {
        const id = req.params.id
        await deleteById(id)
        res.send("Cliente deletado com sucesso")
    } catch (error) {
        res.status(500)
        res.send("ERRO AO REMOVER CLIENTE: " + error.message)
    }
}

export {
    getClientes,
    getCliente,
    postCliente,
    patchCliente,
    deleteCliente
}
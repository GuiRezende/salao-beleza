const express = require("express")
const app = express()

const rotaServico = require("./route/servico")
const rotaCliente = require("./route/cliente")
const rotaProfissional = require("./route/profissional")
const rotaFilaEspera = require("./route/filaEspera")
const rotaAgendamento = require("./route/agendamento")

app.use(express.json())
app.use('/servicos', rotaServico)
app.use('/clientes', rotaClientes)
app.use('/profissional', rotaProfissional)
app.use('/fila-espera', rotaFilaEspera)
app.use('/agendamento', rotaAgendamento)

const port = 8000

app.listen(port, () => {
    console.log(`Escutando a porta ${port}`)
})

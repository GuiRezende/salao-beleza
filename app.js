const express = require("express")
const app = express()

const rotaServico = require("./route/servicoRoute")
const rotaCliente = require("./route/clienteRoute")
const rotaProfissional = require("./route/profissionalRoute")
const rotaFilaEspera = require("./route/filaEsperaRoute")
const rotaAgendamento = require("./route/agendamentoRoute")

app.use(express.json())
app.use('/servico', rotaServico)
app.use('/cliente', rotaCliente)
app.use('/profissional', rotaProfissional)
app.use('/fila-espera', rotaFilaEspera)
app.use('/agendamento', rotaAgendamento)

const port = 8000

app.listen(port, () => {
    console.log(`Escutando a porta ${port}`)
})

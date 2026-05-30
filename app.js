import 'dotenv/config'
import express from "express"
const app = express()

import rotaServico from "./route/servicoRoute.js"
import rotaCliente from "./route/clienteRoute.js"
import rotaProfissional from "./route/profissionalRoute.js"
import rotaFilaEspera from "./route/filaEsperaRoute.js"
import rotaAgendamento from "./route/agendamentoRoute.js"
import rotaPagamento from "./route/pagamentoRoute.js"

import connectDb from "./config/connectDb.js"

await connectDb()

app.use(express.json())
app.use('/servico', rotaServico)
app.use('/cliente', rotaCliente)
app.use('/profissional', rotaProfissional)
app.use('/fila-espera', rotaFilaEspera)
app.use('/agendamento', rotaAgendamento)
app.use('/pagamento', rotaPagamento)

const port = 8000

app.listen(port, () => {
    console.log(`Escutando a porta ${port}`)
})

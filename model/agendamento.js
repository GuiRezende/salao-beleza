import mongoose from 'mongoose';

const agendamentoSchema = new mongoose.Schema(
    {
        dataHoraInicio: Date,
        dataHoraFim: Date,
        dataSolicitacao: Date,
        status: String,
        valorTotal: Number,
        cliente_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cliente'
        },
        servicos: [
            {
                tempoDuracao: Number,
                servico_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Servico'
                },
                profissional_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Profissional'
                }
            }
        ],
        statusPagamento: String,
        pagamento_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pagamento'
        }
    }
);

const Agendamento = mongoose.model("agendamentos", agendamentoSchema)
export default Agendamento
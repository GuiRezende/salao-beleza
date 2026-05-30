import mongoose from 'mongoose';

const pagamentoSchema = new mongoose.Schema(
    {
        codPagamento: Number,
        formaPagamento: String
    }
)

const Pagamento = mongoose.model("pagamentos", pagamentoSchema)
export default Pagamento
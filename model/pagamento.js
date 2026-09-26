import mongoose from 'mongoose';

const pagamentoSchema = new mongoose.Schema(
    {
        codPagamento: Number,
        formaPagamento: String
    }
)

const Pagamento = mongoose.model("Pagamento", pagamentoSchema, "pagamentos")
export default Pagamento
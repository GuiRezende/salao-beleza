const normalizarStatusAgendamento = (status) => {
  const valor = String(status ?? '').trim().toLowerCase()
  return valor === 'realizado' ? 'concluido' : valor
}

export function normalizarAgendamento(agendamento) {
  return {
    _id: agendamento._id,
    dataHoraInicio: agendamento.dataHoraInicio,
    dataHoraFim: agendamento.dataHoraFim,
    dataSolicitacao: agendamento.dataSolicitacao,
    status: normalizarStatusAgendamento(agendamento.status),
    valorTotal: agendamento.valorTotal,
    statusPagamento: String(agendamento.statusPagamento ?? '').trim().toLowerCase(),
    cliente: agendamento.cliente_id,
    pagamento: agendamento.pagamento_id,
    servicos: (agendamento.servicos ?? []).map((item) => ({
      tempoDuracao: item.tempoDuracao,
      servico: item.servico_id,
      profissional: item.profissional_id,
    })),
  }
}

export function normalizarCliente(cliente) {
  return { ...cliente, endereco: cliente.endereco_id }
}

export function normalizarProfissional(profissional) {
  return { ...profissional, endereco: profissional.endereco_id }
}
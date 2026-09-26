import { Plus } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import {
  atualizarAgendamento,
  buscarClientes,
  buscarProfissionais,
  buscarServicos,
  criarAgendamento,
} from '../services/api'
import { formatCurrency } from '../utils/format'
import { Button } from './Button'
import { FormField, Input, Select } from './FormField'
import { Modal } from './Modal'

const LINHA_VAZIA = { servicoId: '', profissionalId: '' }

function agora16() {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 16)
}

function paraDataHoraLocal(iso) {
  const data = new Date(iso)
  data.setMinutes(data.getMinutes() - data.getTimezoneOffset())
  return data.toISOString().slice(0, 16)
}

export function AgendamentoFormModal({ open, agendamento, onClose, onSalvo }) {
  const [clientes, setClientes] = useState([])
  const [servicos, setServicos] = useState([])
  const [profissionais, setProfissionais] = useState([])
  const [carregandoOpcoes, setCarregandoOpcoes] = useState(true)

  const [clienteId, setClienteId] = useState(() => agendamento?.cliente?._id ?? '')
  const [dataHora, setDataHora] = useState(() =>
    agendamento?.dataHoraInicio ? paraDataHoraLocal(agendamento.dataHoraInicio) : agora16(),
  )
  const [status, setStatus] = useState(() => agendamento?.status ?? 'pendente')
  const [statusPagamento, setStatusPagamento] = useState(() => agendamento?.statusPagamento ?? 'pendente')
  const [linhas, setLinhas] = useState(() => agendamento
    ? agendamento.servicos.map((item) => ({
        servicoId: item.servico?._id ?? '',
        profissionalId: item.profissional?._id ?? '',
      }))
    : [LINHA_VAZIA])
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    Promise.all([buscarClientes(), buscarServicos(), buscarProfissionais()])
      .then(([c, s, p]) => {
        setClientes(c)
        setServicos(s)
        setProfissionais(p)
      })
      .catch((error) => setErro(error.message))
      .finally(() => setCarregandoOpcoes(false))
  }, [])

  const servicoPorId = useMemo(() => new Map(servicos.map((s) => [s._id, s])), [servicos])

  const resumo = useMemo(() => {
    const validas = linhas.filter((l) => l.servicoId)
    const duracaoTotal = validas.reduce((soma, l) => soma + (servicoPorId.get(l.servicoId)?.tempoDuracao ?? 0), 0)
    const valorTotal = validas.reduce((soma, l) => soma + (servicoPorId.get(l.servicoId)?.valor ?? 0), 0)
    return { duracaoTotal, valorTotal }
  }, [linhas, servicoPorId])

  const fechar = () => {
    if (salvando) return
    setClienteId('')
    setDataHora(agora16())
    setStatus('pendente')
    setStatusPagamento('pendente')
    setLinhas([LINHA_VAZIA])
    setErro(null)
    onClose()
  }

  const atualizarLinha = (index, campo, valor) => {
    setLinhas((atual) => atual.map((linha, i) => (i === index ? { ...linha, [campo]: valor } : linha)))
  }

  const adicionarLinha = () => setLinhas((atual) => [...atual, LINHA_VAZIA])
  const removerLinha = (index) => setLinhas((atual) => (atual.length > 1 ? atual.filter((_, i) => i !== index) : atual))

  const enviar = async (event) => {
    event.preventDefault()
    const validas = linhas.filter((l) => l.servicoId && l.profissionalId)
    if (!clienteId || !dataHora || validas.length === 0) {
      setErro('Selecione cliente, data/hora e ao menos um serviço com profissional.')
      return
    }

    const dataHoraInicio = new Date(dataHora)
    const dataHoraFim = new Date(dataHoraInicio.getTime() + resumo.duracaoTotal * 60 * 1000)

    setSalvando(true)
    setErro(null)
    try {
      const dados = {
        dataHoraInicio: dataHoraInicio.toISOString(),
        dataHoraFim: dataHoraFim.toISOString(),
        dataSolicitacao: agendamento?.dataSolicitacao ?? new Date().toISOString(),
        status,
        valorTotal: resumo.valorTotal,
        cliente_id: clienteId,
        servicos: validas.map((l) => ({
          tempoDuracao: servicoPorId.get(l.servicoId)?.tempoDuracao ?? 0,
          servico_id: l.servicoId,
          profissional_id: l.profissionalId,
        })),
        statusPagamento,
        ...(agendamento?.pagamento?._id ? { pagamento_id: agendamento.pagamento._id } : {}),
      }
      if (agendamento) await atualizarAgendamento(agendamento._id, dados)
      else await criarAgendamento(dados)
      onSalvo?.()
      fechar()
    } catch (error) {
      setErro(error.message)
    } finally {
      setSalvando(false)
    }
  }

  return (
    <Modal open={open} title={agendamento ? 'Editar agendamento' : 'Novo agendamento'} onClose={fechar}>
      {carregandoOpcoes ? (
        <p className="py-8 text-center text-sm text-muted-foreground">Carregando clientes, serviços e profissionais…</p>
      ) : (
        <form onSubmit={enviar} className="flex flex-col gap-4">
          {erro && (
            <p role="alert" className="rounded-lg bg-warning/10 px-3 py-2 text-sm text-warning">
              {erro}
            </p>
          )}

          <FormField label="Cliente *">
            <Select value={clienteId} onChange={(e) => setClienteId(e.target.value)} required>
              <option value="">Selecione…</option>
              {clientes.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.nome}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField label="Data e hora de início *">
            <Input type="datetime-local" value={dataHora} onChange={(e) => setDataHora(e.target.value)} required />
          </FormField>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Serviços *</p>
            {linhas.map((linha, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex items-end gap-2">
                  <div className="min-w-0 flex-1">
                    <Select value={linha.servicoId} onChange={(e) => atualizarLinha(index, 'servicoId', e.target.value)}>
                      <option value="">Serviço…</option>
                      {servicos.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.nomeTipo} — {formatCurrency(s.valor)}
                        </option>
                      ))}
                  </Select>
                    </div>
                  <div className="min-w-0 flex-1">
                    <Select
                      value={linha.profissionalId}
                      onChange={(e) => atualizarLinha(index, 'profissionalId', e.target.value)}
                    >
                      <option value="">Profissional…</option>
                      {profissionais.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.nome}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
                {linhas.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removerLinha(index)}
                    className="self-end"
                  >
                    Remover serviço
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="secondary" size="sm" icon={Plus} onClick={adicionarLinha} className="self-start">
              Adicionar serviço
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Status do agendamento">
              <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="pendente">Pendente</option>
                <option value="confirmado">Confirmado</option>
                <option value="concluido">Concluído</option>
              </Select>
            </FormField>
            <FormField label="Status do pagamento">
              <Select value={statusPagamento} onChange={(e) => setStatusPagamento(e.target.value)}>
                <option value="pendente">Pendente</option>
                <option value="pago">Pago</option>
              </Select>
            </FormField>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-surface px-3 py-2 text-sm">
            <span className="text-muted-foreground">Duração total: {resumo.duracaoTotal} min</span>
            <span className="font-semibold">{formatCurrency(resumo.valorTotal)}</span>
          </div>

          <div className="mt-2 flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={fechar} disabled={salvando}>
              Cancelar
            </Button>
            <Button type="submit" disabled={salvando}>
              {salvando ? 'Salvando…' : agendamento ? 'Salvar alterações' : 'Salvar agendamento'}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  )
}

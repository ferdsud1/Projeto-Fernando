import { Contratacao } from '../entity/Contratacao';
import { ContratacaoRepository } from '../repository/ContratacaoRepository';
import { BuffetRepository } from '../repository/BuffetRepository';

export class ContratacaoService {
  private contratacaoRepo: ContratacaoRepository;
  private buffetRepo: BuffetRepository;

  constructor() {
    this.contratacaoRepo = new ContratacaoRepository();
    this.buffetRepo = new BuffetRepository();
  }

  async cadastrarContratacao(
    id_cliente: number,
    id_buffet: number,
    quantidade_pessoas: number,
    data_evento: Date,
    horario_evento: string
  ): Promise<void> {
    const buffet = await this.buffetRepo.buscarPorId(id_buffet); // ajustei também aqui para chamar findById (o nome correto no seu repo)

    if (!buffet) {
      throw new Error('Buffet não encontrado.');
    }

    const preco_total = buffet.getPrecoPorPessoa() * quantidade_pessoas;

    const novaContratacao = new Contratacao(
      id_cliente,
      id_buffet,
      quantidade_pessoas,
      preco_total,
      data_evento,
      horario_evento
    );

    await this.contratacaoRepo.salvar(novaContratacao);
  }

  async listarContratacoes(): Promise<Contratacao[]> {
    return await this.contratacaoRepo.listarTodas();
  }

  async buscarPorId(id: number): Promise<Contratacao | null> {
    return await this.contratacaoRepo.buscarPorId(id);
  }

  async excluirContratacao(id: number): Promise<void> {
    await this.contratacaoRepo.excluir(id);
  }
}

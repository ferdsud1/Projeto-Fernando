import * as readlineSync from 'readline-sync';
import { ContratacaoService } from '../service/ContratacaoService';
import { Contratacao } from '../entities/Contratacao';

export class ContratacaoView {
  private contratacaoService: ContratacaoService;

  constructor(contratacaoService: ContratacaoService) {
    this.contratacaoService = contratacaoService;
  }

  async criarContratacao() {
    const clienteId = parseInt(readlineSync.question('ID do Cliente: '));
    const buffetId = parseInt(readlineSync.question('ID do Buffet: '));
    const quantidadePessoas = parseInt(readlineSync.question('Quantidade de Pessoas: '));
    const dataEvento = new Date(readlineSync.question('Data do Evento (YYYY-MM-DD): '));

    const buffet = await this.buffet.detalhesBuffet(buffetId);
    if (!buffet) {
      console.log('Buffet não encontrado!');
      return;
    }

    const valorTotal = buffet.preco_por_pessoa * quantidadePessoas;
    const valorAdiantamento = valorTotal * 0.4;

    const contratacao = new Contratacao(0, clienteId, buffetId, quantidadePessoas, valorTotal, valorAdiantamento, dataEvento);
    await this.contratacaoService.criarContratacao(contratacao);
    console.log('Contratação criada com sucesso!');
  }
}

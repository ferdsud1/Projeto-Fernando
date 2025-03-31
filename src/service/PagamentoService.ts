import * as readlineSync from 'readline-sync';
import { ContratacaoService } from '../services/ContratacaoService'; // Serviço de Contratação

export class PagamentoView {
  private contratacaoService = new ContratacaoService();

  // Exibe o pagamento do cliente
  async exibirPagamento(idBuffet: number, numeroPessoas: number): Promise<void> {
    // Calcula o valor total da contratação com base no buffet e número de pessoas
    const valorTotal = await this.contratacaoService.calcularValorTotal(idBuffet, numeroPessoas);

    // Calcula 40% do valor total (adiantamento)
    const adiantamento = valorTotal * 0.40;

    // Exibe os detalhes do pagamento
    console.log(`Valor total da contratação: R$ ${valorTotal.toFixed(2)}`);
    console.log(`Adiantamento (40%): R$ ${adiantamento.toFixed(2)}`);

    // Pergunta ao cliente se deseja realizar o pagamento
    const pagar = readlineSync.keyInYNStrict('Deseja realizar o pagamento de 40% agora? (S/N): ');

    if (pagar) {
      // Aqui podemos verificar se o cliente fez o pagamento de fato
      const pagamentoConfirmado = readlineSync.keyInYNStrict(`Confirmar pagamento de R$ ${adiantamento.toFixed(2)}? (S/N): `);
      
      if (pagamentoConfirmado) {
        console.log(`Pagamento de R$ ${adiantamento.toFixed(2)} realizado com sucesso!`);
        // Aqui podemos atualizar a situação do contrato ou do pagamento no banco de dados
      } else {
        console.log('O pagamento não foi confirmado. O contrato não será firmado.');
      }
    } else {
      console.log('O pagamento não foi realizado. O contrato não será firmado.');
    }
  }
}
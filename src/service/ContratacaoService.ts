import { BuffetRepository } from '../repositories/BuffetRepository';

export class ContratacaoService {
  private buffetRepository = new BuffetRepository();

  // Método para calcular o valor total da contratação
  async calcularValorTotal(idBuffet: number, numeroPessoas: number): Promise<number> {
    // Obtém os detalhes do buffet selecionado
    const buffet = await this.buffetRepository.getById(idBuffet);
    if (!buffet) {
      throw new Error('Buffet não encontrado!');
    }

    // Calcula o valor total de acordo com o número de pessoas e o valor por pessoa
    return buffet.preco_por_pessoa * numeroPessoas;
  }
}

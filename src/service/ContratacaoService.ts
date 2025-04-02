import { BuffetRepository } from '../repository/BuffetRepository';
import { Buffet } from '../entity/CadastroBuffet';  // Garantindo que Buffet seja tipado corretamente

export class ContratacaoService {
  private buffetRepository = new BuffetRepository();

  // Método para calcular o valor total da contratação
  async calcularValorTotal(idBuffet: number, numeroPessoas: number): Promise<number> {
    try {
      // Obtém os detalhes do buffet selecionado
      const buffet: Buffet | null = await this.buffetRepository.getById(idBuffet);

      // Se o buffet não for encontrado, lança um erro
      if (!buffet) {
        throw new Error(`Buffet com ID ${idBuffet} não encontrado!`);
      }

      // Calcula o valor total de acordo com o número de pessoas e o valor por pessoa
      return buffet.getPrecoPorPessoa() * numeroPessoas;
      ;
    } catch (error) {
      // Caso haja qualquer erro, o erro é propagado
      throw new Error(`Erro ao calcular o valor total da contratação: ${error.message}`);
    }
  }
}

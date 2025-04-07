import { Buffet } from '../entity/CadastroBuffet';
import { BuffetRepository } from '../repository/BuffetRepository';

export class BuffetService {
  private proximoId = 1;

  constructor(private buffetRepository: BuffetRepository) {}

  async listarBuffets(): Promise<Buffet[]> {
    return this.buffetRepository.getAll();
  }

  async cadastrarBuffet(
    nome: string,
    capacidade: number,
    precoPorPessoa: number,
    descricao: string
  ): Promise<Buffet> {
    // Validação simples (você pode melhorar conforme quiser)
    if (!nome || capacidade <= 0 || precoPorPessoa <= 0) {
      throw new Error('Dados inválidos para cadastro.');
    }

    const buffet = new Buffet(
      this.proximoId++,
      nome,
      capacidade,
      precoPorPessoa,
      descricao
    );

    await this.buffetRepository.save(buffet);
    return buffet;
  }

  async buscarBuffetPorId(id: number): Promise<Buffet | null> {
    return this.buffetRepository.findById(id);
  }

  async atualizarBuffet(id: number, buffetAtualizado: Buffet): Promise<boolean> {
    const buffetExistente = await this.buffetRepository.findById(id);
    if (!buffetExistente) {
      return false;
    }

    return this.buffetRepository.update(id, buffetAtualizado);
  }

  async deletarBuffet(id: number): Promise<boolean> {
    return this.buffetRepository.delete(id);
  }
}

import { Pool } from 'pg';
import { BuffetRepository } from '../repository/BuffetRepository';  // Importando o BuffetRepository
import { Buffet } from '../entity/CadastroBuffet';

export class BuffetService {
  private pool: Pool;
  private repository: BuffetRepository;  // Corrigido para BuffetRepository

  constructor() {
    this.pool = new Pool();  // Certifique-se de configurar o pool corretamente
    this.repository = new BuffetRepository();  // Agora está correto
  }

  // Listar todos os buffets
  async listarBuffets(): Promise<Buffet[]> {
    const buffets = await this.repository.listarBuffets();
    if (buffets.length === 0) {
      throw new Error("Nenhum buffet encontrado.");
    }
    return buffets;
  }

  // Buscar buffet pelo ID
  async buscarPorId(id: number): Promise<Buffet> {
    const buffet = await this.repository.buscarPorId(id);
    if (!buffet) {
      throw new Error(`Buffet com ID ${id} não encontrado.`);
    }
    return buffet;
  }

  // Inserir um novo buffet
  async inserirBuffet(buffet: Buffet): Promise<void> {
    const query = `
      INSERT INTO projeto.buffets (nome, capacidade, descricao, preco) 
      VALUES ($1, $2, $3, $4)
    `;
    await this.pool.query(query, [buffet.getNome(), buffet.getCapacidade(), buffet.getDescricao(), buffet.getPrecoPorPessoa()]);
  }

  // Deletar um buffet
  async deletarBuffet(id: number): Promise<void> {
    const buffet = await this.buscarPorId(id); // Verifica se o buffet existe
    await this.repository.deletarBuffet(id);
    console.log(`Buffet com ID ${id} deletado com sucesso!`);
  }

  // Atualizar buffet
  public async atualizarBuffet(buffet: Buffet): Promise<void> {
    // Atualiza o buffet no repositório ou banco de dados
    try {
      // Supondo que o repositório ou função de banco de dados já está implementado
      await this.repository.atualizarBuffet(
        buffet.getId(),
        buffet.getNome(),
        buffet.getDescricao(),  // Método correto para acessar a descrição
        buffet.getCapacidade(),
        buffet.getPrecoPorPessoa()
      );
    } catch (error) {
      throw new Error("Erro ao atualizar buffet: " + error.message);
    }
  }}
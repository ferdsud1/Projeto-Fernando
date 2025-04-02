import { Pool } from 'pg';
import { Contratacao } from '../entity/Contratacao';
import { Database } from './Database';

export class ContratacaoRepository {
  private pool: Pool;

  constructor() {
    this.pool = Database.iniciarConexao();
  }

  // Criar nova contratação
  public async inserirContratacao(
    cliente_id: number,
    buffet_id: number,
    quantidade_pessoas: number,
    valor_total: number,
    valor_adiantamento: number,
    data_evento: Date
  ): Promise<number> {
    const query = `INSERT INTO projeto.contratacoes (cliente_id, buffet_id, quantidade_pessoas, valor_total, valor_adiantamento, data_evento) 
                   VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_contratacao`;

    const result = await this.pool.query(query, [
      cliente_id,
      buffet_id,
      quantidade_pessoas,
      valor_total,
      valor_adiantamento,
      data_evento,
    ]);

    return result.rows[0].id_contratacao;
  }

  // Buscar uma contratação pelo ID (método getById)
  public async getById(id: number): Promise<Contratacao | null> {
    const query = 'SELECT * FROM projeto.contratacoes WHERE id_contratacao = $1';
    const result = await this.pool.query(query, [id]);

    if (result.rowCount === 0) {
      return null; // Retorna null caso não encontre a contratação
    }

    const row = result.rows[0];  // Atribuindo diretamente o primeiro elemento
    return new Contratacao(
      row.id_contratacao,
      row.cliente_id,
      row.buffet_id,
      row.quantidade_pessoas,
      row.valor_total,
      row.valor_adiantamento,
      row.data_evento,
      row.pago
    );
  }

  // Listar todas as contratações
  public async listarContratacoes(): Promise<Contratacao[]> {
    const query = 'SELECT * FROM projeto.contratacoes';
    const result = await this.pool.query(query);

    const listaContratacoes: Contratacao[] = result.rows.map(row => new Contratacao(
      row.id_contratacao,
      row.cliente_id,
      row.buffet_id,
      row.quantidade_pessoas,
      row.valor_total,
      row.valor_adiantamento,
      row.data_evento,
      row.pago
    ));

    return listaContratacoes;
  }

  // Método para atualizar uma contratação
  public async atualizarContratacao(
    contratacao: Contratacao
  ): Promise<void> {
    const query = `UPDATE projeto.contratacoes SET 
                   cliente_id = $1, 
                   buffet_id = $2, 
                   quantidade_pessoas = $3, 
                   valor_total = $4, 
                   valor_adiantamento = $5, 
                   data_evento = $6, 
                   pago = $7 
                   WHERE id_contratacao = $8`;

    const result = await this.pool.query(query, [
      contratacao.cliente_id,
      contratacao.buffet_id,
      contratacao.quantidade_pessoas,
      contratacao.valor_total,
      contratacao.valor_adiantamento,
      contratacao.data_evento,
      contratacao.pago,
      contratacao.id_contratacao,
    ]);

    if (result.rowCount === 0) {
      throw new Error(`Nenhuma contratação encontrada com o ID ${contratacao.id_contratacao}`);
    }
  }

  // Método para deletar uma contratação
  public async deletarContratacao(id: number): Promise<void> {
    const query = 'DELETE FROM projeto.contratacoes WHERE id_contratacao = $1';
    const result = await this.pool.query(query, [id]);

    if (result.rowCount === 0) {
      throw new Error(`Nenhuma contratação encontrada com o ID ${id}`);
    }
  }
}

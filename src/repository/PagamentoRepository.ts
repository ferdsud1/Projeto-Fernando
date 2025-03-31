import { Pool } from 'pg';
import { Pagamento } from "../entity/Pagamento";
import { Database } from './Database';

export class PagamentoRepository {
  private pool: Pool;

  constructor() {
    this.pool = Database.iniciarConexao();
  }

  // Criar novo pagamento
  public async inserirPagamento(
    contratacao_id: number,
    valor_pago: number,
    data_pagamento: Date
  ): Promise<void> {
    const query = 'INSERT INTO projeto.pagamentos (contratacao_id, valor_pago, data_pagamento) VALUES ($1, $2, $3)';
    await this.pool.query(query, [contratacao_id, valor_pago, data_pagamento]);
  }

  // Buscar um pagamento pelo ID
  public async buscarPorId(id: number): Promise<Pagamento> {
    const query = 'SELECT * FROM projeto.pagamentos WHERE id_pagamento = $1';
    const result = await this.pool.query(query, [id]);

    if (result.rowCount === 0) {
      throw new Error(`Nenhum pagamento encontrado com o ID ${id}`);
    }

    const row = result.rows[0];
    return new Pagamento(
      row.id_pagamento,
      row.contratacao_id,
      row.valor_pago,
      row.data_pagamento
    );
  }

  // Listar todos os pagamentos
  public async listarPagamentos(): Promise<Pagamento[]> {
    const query = 'SELECT * FROM projeto.pagamentos';
    const result = await this.pool.query(query);

    const listaPagamentos: Pagamento[] = [];
    for (const row of result.rows) {
      const pagamento = new Pagamento(
        row.id_pagamento,
        row.contratacao_id,
        row.valor_pago,
        row.data_pagamento
      );
      listaPagamentos.push(pagamento);
    }

    return listaPagamentos;
  }

  // Método para atualizar um pagamento (opcional)
  public async atualizarPagamento(
    pagamento: Pagamento
  ): Promise<void> {
    const query = `UPDATE projeto.pagamentos SET 
                   contratacao_id = $1, 
                   valor_pago = $2, 
                   data_pagamento = $3
                   WHERE id_pagamento = $4`;

    const result = await this.pool.query(query, [
      pagamento.contratacao_id,
      pagamento.valor_pago,
      pagamento.data_pagamento,
      pagamento.id_pagamento,
    ]);

    if (result.rowCount === 0) {
      throw new Error(`Nenhum pagamento encontrado com o ID ${pagamento.id_pagamento}`);
    }
  }

  // Método para deletar um pagamento
  public async deletarPagamento(id: number): Promise<void> {
    const query = 'DELETE FROM projeto.pagamentos WHERE id_pagamento = $1';
    const result = await this.pool.query(query, [id]);

    if (result.rowCount === 0) {
      throw new Error(`Nenhum pagamento encontrado com o ID ${id}`);
    }
  }
}
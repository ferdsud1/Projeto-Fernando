import { Buffet } from '../entity/CadastroBuffet';
import { pool } from './Database'; // conexão com o banco

export class BuffetRepository {
  async listarBuffets(): Promise<Buffet[]> {
    const result = await pool.query('SELECT * FROM projeto.buffets');
    return result.rows.map(row => {
      return new Buffet(
        row.id,
        row.nome_buffet,
        row.capacidade,
        row.preco_por_pessoa,
        row.descricao_buffet
      );
    });
  }

  async buscarPorId(id: number): Promise<Buffet | null> {
    const result = await pool.query('SELECT * FROM projeto.buffets WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return new Buffet(
      row.id,
      row.nome_buffet,
      row.capacidade,
      row.preco_por_pessoa,
      row.descricao_buffet
    );
  }

  async inserirBuffet(buffet: Buffet): Promise<void> {
    await pool.query(`
      INSERT INTO projeto.buffets
      (nome_buffet, capacidade, preco_por_pessoa, descricao_buffet)
      VALUES ($1, $2, $3, $4)
    `, [
      buffet.getNome(),
      buffet.getCapacidade(),
      buffet.getPrecoPorPessoa(),
      buffet.getDescricao()
    ]);
  }

  async atualizarBuffet(buffet: Buffet): Promise<void> {
    await pool.query(`
      UPDATE projeto.buffets SET
        nome_buffet = $1,
        capacidade = $2,
        preco_por_pessoa = $3,
        descricao_buffet = $4
      WHERE id = $5
    `, [
      buffet.getNome(),
      buffet.getCapacidade(),
      buffet.getPrecoPorPessoa(),
      buffet.getDescricao(),
      buffet.getId()
    ]);
  }

  async deletarBuffet(id: number): Promise<void> {
    await pool.query('DELETE FROM projeto.buffets WHERE id = $1', [id]);
  }
}

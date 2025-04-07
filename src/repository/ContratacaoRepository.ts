import { Pool } from 'pg';
import { Contratacao } from '../entity/Contratacao';

const pool = new Pool({
  user: 'seu_usuario',
  host: 'localhost',
  database: 'projeto',
  password: 'sua_senha',
  port: 5432,
});

export class ContratacaoRepository {
  async salvar(contratacao: Contratacao): Promise<void> {
    const query = `
      INSERT INTO projeto.contratacoes 
      (id_cliente, id_buffet, quantidade_pessoas, preco_total, data_evento, horario_evento) 
      VALUES ($1, $2, $3, $4, $5, $6)
    `;

    const values = [
      contratacao.id_cliente,
      contratacao.id_buffet,
      contratacao.quantidade_pessoas,
      contratacao.preco_total,
      contratacao.data_evento,
      contratacao.horario_evento,
    ];

    await pool.query(query, values);
  }

  async listarTodas(): Promise<Contratacao[]> {
    const resultado = await pool.query('SELECT * FROM projeto.contratacoes');

    return resultado.rows.map(row => new Contratacao(
      row.id_cliente,
      row.id_buffet,
      row.quantidade_pessoas,
      row.preco_total,
      new Date(row.data_evento),
      row.horario_evento,
      row.id_contratacoes
    ));
  }

  async buscarPorId(id: number): Promise<Contratacao | null> {
    const resultado = await pool.query(
      'SELECT * FROM projeto.contratacoes WHERE id_contratacoes = $1',
      [id]
    );

    const row = resultado.rows[0];
    if (!row) return null;

    return new Contratacao(
      row.id_cliente,
      row.id_buffet,
      row.quantidade_pessoas,
      row.preco_total,
      new Date(row.data_evento),
      row.horario_evento,
      row.id_contratacoes
    );
  }

  async buscarPorCliente(id_cliente: number): Promise<Contratacao[]> {
    const resultado = await pool.query(
      'SELECT * FROM projeto.contratacoes WHERE id_cliente = $1',
      [id_cliente]
    );

    return resultado.rows.map(row => new Contratacao(
      row.id_cliente,
      row.id_buffet,
      row.quantidade_pessoas,
      row.preco_total,
      new Date(row.data_evento),
      row.horario_evento,
      row.id_contratacoes
    ));
  }

  async excluir(id: number): Promise<void> {
    await pool.query('DELETE FROM projeto.contratacoes WHERE id_contratacoes = $1', [id]);
  }
}

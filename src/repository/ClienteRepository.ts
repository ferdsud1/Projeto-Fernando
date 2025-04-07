import { CadastroCliente } from '../entity/CadastroCliente';
import { pool } from './Database'; // conexão com o banco

export class ClienteRepository {
  async listarClientes(): Promise<CadastroCliente[]> {
    const result = await pool.query('SELECT * FROM projeto.cadastroclientes');
    return result.rows.map(row => {
      const cliente = new CadastroCliente();
      cliente.setId(row.id);
      cliente.setNome(row.nome);
      cliente.setCpf(row.cpf);
      cliente.setDataNascimento(new Date(row.datanascimento));
      cliente.setTelefone(row.telefone);
      cliente.setEmail(row.email);
      cliente.setRuaNumero(row.rua_numero);
      cliente.setBairroCidade(row.bairro_cidade);
      return cliente;
    });
  }

  async buscarPorId(id: number): Promise<CadastroCliente | null> {
    const result = await pool.query('SELECT * FROM projeto.cadastroclientes WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    const cliente = new CadastroCliente();
    cliente.setId(row.id);
    cliente.setNome(row.nome);
    cliente.setCpf(row.cpf);
    cliente.setDataNascimento(new Date(row.datanascimento));
    cliente.setTelefone(row.telefone);
    cliente.setEmail(row.email);
    cliente.setRuaNumero(row.rua_numero);
    cliente.setBairroCidade(row.bairro_cidade);
    return cliente;
  }

  async inserirCliente(cliente: CadastroCliente): Promise<void> {
    await pool.query(`
      INSERT INTO projeto.cadastroclientes
      (nome, cpf, datanascimento, telefone, email, rua_numero, bairro_cidade)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, [
      cliente.getNome(),
      cliente.getCpf(),
      cliente.getDataNascimento(),
      cliente.getTelefone(),
      cliente.getEmail(),
      cliente.getRuaNumero(),
      cliente.getBairroCidade()
    ]);
  }

  async deletarCliente(id: number): Promise<void> {
    await pool.query('DELETE FROM projeto.cadastroclientes WHERE id = $1', [id]);
  }

  async atualizarCliente(cliente: CadastroCliente): Promise<void> {
    await pool.query(`
      UPDATE projeto.cadastroclientes SET
        telefone = $1,
        email = $2,
        rua_numero = $3,
        bairro_cidade = $4
      WHERE id = $5
    `, [
      cliente.getTelefone(),
      cliente.getEmail(),
      cliente.getRuaNumero(),
      cliente.getBairroCidade(),
      cliente.getId()
    ]);
  }
}

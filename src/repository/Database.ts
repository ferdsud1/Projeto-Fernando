import { Pool } from "pg";

export class Database {
  static pool: Pool;

  // Iniciar a conexão com o banco de dados
  static iniciarConexao(): Pool {
    if (!this.pool) {
      this.pool = new Pool({
        user: 'postgres',
        password: '1234',
        host: 'localhost',
        database: 'cadastroclientes',
        port: 5432,
      });
    }

    return this.pool;
  }

  // Fechar a conexão com o banco de dados (para garantir que as conexões sejam liberadas)
  static async fecharConexao(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      console.log("Conexão com o banco de dados fechada.");
    }
  }
}

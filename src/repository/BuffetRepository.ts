import { Database } from "./Database";
import { Buffet } from "../entity/CadastroBuffet";
import { Pool } from "pg";

export class BuffetRepository {
    private pool: Pool;

    constructor() {
        this.pool = Database.iniciarConexao();
    }

    // Listar todos os buffets
    async listarBuffets(): Promise<Buffet[]> {
        const query = "SELECT * FROM projeto.buffets ORDER BY id_buffet ASC";
        const result = await this.pool.query(query);

        return result.rows.map(row => new Buffet(
            row.id_buffet,              // id do buffet
            row.nome_buffet,            // nome do buffet
            row.capacidade,             // capacidade
            row.preco_por_pessoa,       // preço por pessoa
            row.descricao_buffet        // descrição do buffet
        ));
    }

    // Buscar buffet pelo ID
    async buscarPorId(id: number): Promise<Buffet> {
        const query = "SELECT * FROM projeto.buffets WHERE id_buffet = $1";
        const result = await this.pool.query(query, [id]);

        if (result.rowCount === 0) {
            throw new Error(`Nenhum buffet encontrado com o ID ${id}`);
        }

        const row = result.rows[0];
        return new Buffet(
            row.id_buffet,          // id do buffet
            row.nome_buffet,        // nome do buffet
            row.capacidade,         // capacidade
            row.preco_por_pessoa,   // preço por pessoa
            row.descricao_buffet    // descrição do buffet
        );
    }

    // Método getById, similar ao buscarPorId
    async getById(id: number): Promise<Buffet | null> {
        const query = "SELECT * FROM projeto.buffets WHERE id_buffet = $1";
        const result = await this.pool.query(query, [id]);

        if (result.rowCount === 0) {
            return null; // Retorna null caso não encontre o buffet
        }

        const row = result.rows[0];
        return new Buffet(
            row.id_buffet,          // id do buffet
            row.nome_buffet,        // nome do buffet
            row.capacidade,         // capacidade
            row.preco_por_pessoa,   // preço por pessoa
            row.descricao_buffet    // descrição do buffet
        );
    }

    // Inserir um novo buffet
    async inserirBuffet(
        nome: string, 
        capacidade: number, 
        descricao: string, 
        preco: number
    ): Promise<void> {
        const query = `
            INSERT INTO projeto.buffets (nome_buffet, capacidade, descricao_buffet, preco_por_pessoa)
            VALUES ($1, $2, $3, $4)
        `;
        await this.pool.query(query, [nome, capacidade, descricao, preco]);
    }

    // Deletar um buffet
    async deletarBuffet(id: number): Promise<void> {
        const query = "DELETE FROM projeto.buffets WHERE id_buffet = $1";
        const result = await this.pool.query(query, [id]);

        if (result.rowCount === 0) {
            throw new Error(`Nenhum buffet encontrado com o ID ${id}`);
        }
    }

    // Atualizar buffet
    async atualizarBuffet(
        id: number, 
        nome: string, 
        capacidade: number, 
        descricao: string, 
        preco: number
    ): Promise<void> {
        const query = `
            UPDATE projeto.buffets
            SET nome_buffet = $1, capacidade = $2, descricao_buffet = $3, preco_por_pessoa = $4
            WHERE id_buffet = $5
        `;
        await this.pool.query(query, [nome, capacidade, descricao, preco, id]);
    }
}

import { Database } from "./Database";
import { CadastroCliente } from "../entity/CadastroCliente";
import { Pool } from "pg";

export class ClienteRepository {
    private pool: Pool;

    constructor() {
        this.pool = Database.iniciarConexao();
    }

    async listarClientes(): Promise<CadastroCliente[]> {
        const query = "SELECT * FROM PROJETO.CADASTROCLIENTES";
        const result = await this.pool.query(query);

        const listaClientes: CadastroCliente[] = [];

        for (const row of result.rows) {
           // console.log(row)
            const cliente = new CadastroCliente(row.nome, row.cpf, row.datanascimento, row.telefone, row.email, row.rua_numero, row.bairro_cidade, row.id);
            listaClientes.push(cliente);
        }

        return listaClientes;
    }

    public async buscarPorId(id: number): Promise<CadastroCliente> {
        const query = "SELECT * FROM PROJETO.CADASTROCLIENTES WHERE ID=$1";
        const result = await this.pool.query(query, [id]);
        if (result.rowCount === 0) {
            throw new Error(`Nenhum cliente encontrado com o ID ${id}`);
        }

           
            const cliente = new CadastroCliente(result.rows[0].nome, result.rows[0].cpf, result.rows[0]. datanascimento, result.rows[0].telefone, result.rows[0].email, result.rows[0].rua_numero,result.rows[0].bairro_cidade,result.rows[0].id);


        return cliente;
    }

    public async inserirCliente(
        nome: string,
        email: string,
        telefone: string,
        cpf: string,
        dataNascimento: Date,  
        rua_numero: string,
        bairro_cidade: string
    ) {

        const query = "INSERT INTO PROJETO.CADASTROCLIENTES(nome, email, telefone, cpf, dataNascimento, rua_numero, bairro_cidade) VALUES ($1, $2, $3, $4, $5, $6, $7)";
        

        await this.pool.query(query, [nome, email, telefone, cpf, dataNascimento, rua_numero, bairro_cidade]);
    }
    
    public async deletarCliente(id: number): Promise<void> {
        const query = `
            DELETE FROM PROJETO.CADASTROCLIENTES
            WHERE id = $1
        `;

        const result = await this.pool.query(query, [id]);

        if (result.rowCount === 0) {
            throw new Error(`Nenhum cliente encontrado com o ID ${id}`);
        }
    }

    public async atualizarCliente(
        id: number,
        email: string,
        telefone: string,
        rua_numero: string,
        bairro_cidade: string
    ): Promise<void> {
        const query = `
            UPDATE PROJETO.CADASTROCLIENTES
            SET email = $1, telefone = $2, rua_numero = $3, bairro_cidade = $4
            WHERE id = $5
        `;

        const result = await this.pool.query(query, [email, telefone, rua_numero, bairro_cidade, id]);

        if (result.rowCount === 0) {
            throw new Error(`Nenhum cliente encontrado com o ID ${id}`);
        }
    }
}
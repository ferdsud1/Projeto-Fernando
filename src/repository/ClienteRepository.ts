

import { Database } from "./Database";
import { CadastroCliente} from "../entity/CadastroCliente";
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
            const cliente = new CadastroCliente(row.nome, row.cpf, row.telefone, row.email, row.rua_numero, row.bairro_cidade, row.id); 
          console.log(cliente)
            listaClientes.push(cliente);

        }


        return listaClientes;
    }

    public async buscarPorId(id: number): Promise<CadastroCliente[]> {
        let query = "SELECT*FROM PROJETO.CADASTROCLIENTES WHERE ID=$1"
        let result = await this.pool.query(query, [id])
        const listarClientes: CadastroCliente[] = [];

        for (const row of result.rows) {

            const cliente = new CadastroCliente(row.nome, row.cpf, row.telefone, row.email, row.rua_numero, row.bairro_cidade, row.id)
            listarClientes.push(cliente)

        }
        return listarClientes
    }
    public async inserirCliente(nome:string,email: string, telefone: string, cpf: string, rua_numero:string, bairro_cidade:string){
        console.log(email)
        console.log(telefone)
    let query= "INSERT INTO PROJETO.CADASTROCLIENTES(nome, email,telefone, cpf, rua_numero, bairro_cidade) Values ($1,$2,$3,$4,$5,$6)";
    await this.pool.query(query,[nome,email,telefone,cpf, rua_numero, bairro_cidade]);

    }
    public async deletarCliente(id: number): Promise<void> {
        let query = "DELETE FROM PROJETO.CADASTROCLIENTES WHERE id = $1 RETURNING *";
        const result = await this.pool.query(query, [id]);
    
        if (result.rowCount === 0) {
            throw new Error(`Nenhum cliente encontrado com o ID ${id}`);
        }
    }
}
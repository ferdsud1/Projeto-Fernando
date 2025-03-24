import { CadastroCliente } from "../entity/CadastroCliente";
import { ClienteRepository } from "../repository/ClienteRepository";

export class ClienteService {
  private repo: ClienteRepository;

  constructor() {
    this.repo = new ClienteRepository();
  }

  async listarClientes(): Promise<CadastroCliente[]> {
    const clientes = await this.repo.listarClientes();
    if (clientes.length === 0) {
      throw new Error("Cliente não encontrado");
    }
   // console.table(clientes);
    return clientes;
  }

  public async buscarPorId(id: number): Promise<CadastroCliente> {
    const lista = await this.repo.buscarPorId(id);
    if (lista.length === 0) {
      throw new Error("Cliente não encontrado");
    }
    return lista[0];
  }

  public async inserirClientes(
    nome: string,
    email: string,
    telefone: string,
    cpf: string,
    rua_numero: string,
    bairro_cidade: string
  ): Promise<void> {
    await this.repo.inserirCliente(nome, email, telefone, cpf, rua_numero, bairro_cidade);
    console.log("Cliente inserido com sucesso!");
  }

  public async deletarCliente(id: number): Promise<void> {
    await this.buscarPorId(id); // Verifica se o cliente existe antes de excluir
    await this.repo.deletarCliente(id);
    console.log(`Cliente com ID ${id} deletado com sucesso!`);
  }
  public async verificarContratos(idCliente: number): Promise<any[]> {
    const result = await this.db.query(
        "SELECT * FROM contratacoes WHERE id_cliente = $1",
        [idCliente]
    );
    return result.rows;
}

  public async atualizarCliente(
    id: number,
    email?: string,
    telefone?: string,
    rua_numero?: string,
    bairro_cidade?: string
  ): Promise<void> {
    const cliente = await this.buscarPorId(id); // Verifica se o cliente existe

    // Mantém os dados antigos caso os novos não sejam fornecidos
    const novoEmail = email || cliente.getEmail();
    const novoTelefone = telefone || cliente.getTelefone();
    const novaRuaNumero = rua_numero || cliente.getRua_numero();
    const novoBairroCidade = bairro_cidade || cliente.getBairro_cidade();

    await this.repo.atualizarCliente(
      id, novoEmail, novoTelefone, novaRuaNumero, novoBairroCidade
    );

    console.log(`Cliente com ID ${id} atualizado com sucesso!`);
  }
}
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
      throw new Error("Nenhum cliente encontrado.");
    }
    return clientes;
  }

  public async buscarPorId(id: number): Promise<CadastroCliente> {
    const cliente = await this.repo.buscarPorId(id); 
    if (!cliente) {
      throw new Error(`Cliente com ID ${id} não encontrado.`);
    }
    return cliente; 
  }
  

  public async inserirClientes(
    { nome, email, telefone, cpf, dataNascimento, rua_numero, bairro_cidade }: 
    { nome: string; email: string; telefone: string; cpf: string; dataNascimento: Date; rua_numero: string; bairro_cidade: string; }
  ): Promise<void> {
    // Validação de CPF, email e telefone poderiam ser feitas aqui
    await this.repo.inserirCliente(nome, email, telefone, cpf, dataNascimento, rua_numero, bairro_cidade);
    console.log("Cliente inserido com sucesso!");
  }

  public async deletarCliente(id: number): Promise<void> {
    const cliente = await this.buscarPorId(id); // Verifica se o cliente existe
    await this.repo.deletarCliente(id);
    console.log(`Cliente com ID ${id} deletado com sucesso!`);
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
    await this.repo.atualizarCliente(id, novoEmail, novoTelefone, novaRuaNumero, novoBairroCidade);
    console.log(`Cliente com ID ${id} atualizado com sucesso!`);
  }
}
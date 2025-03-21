import { CadastroCliente } from "../entity/CadastroCliente";
import { ClienteRepository } from "../repository/ClienteRepository"


export class ClienteService {

  private repo: ClienteRepository;

  constructor() {
    this.repo = new ClienteRepository();
  }

  async listarClientes(): Promise<CadastroCliente[]> {
    console.table(this.repo.listarClientes())
    return await this.repo.listarClientes()
  }
  public async buscarPorId(id: number): Promise<CadastroCliente[]> {
    let lista: CadastroCliente[] = [];
    lista = await this.repo.buscarPorId(id);
    if (lista.length == 0) {
      throw new Error("nao Encontrei")
    }
    return lista;
  }
  public async inserirClientes(nome: string, email: string, telefone: string, cpf: string, rua_numero: any, bairro_cidade: any) {
    await this.repo.inserirCliente(nome, email, telefone, cpf, rua_numero, bairro_cidade);


  }
  public async deletarCliente(id: number): Promise<void> {
    await this.repo.deletarCliente(id);
   
}

}
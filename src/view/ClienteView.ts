import promptSync from 'prompt-sync';
import { ClienteService } from '../service/ClienteService';
export class ClienteView {
    private clienteService: ClienteService;
    private prompt: promptSync;

    constructor() {
        this.clienteService = new ClienteService();
        this.prompt = promptSync();
    }
    public async exibirMenu(): Promise<void> {
        let opcao: string;

        console.log("+--------------------------------+");
        console.log("|          Cliente Menu          |");
        console.log("+--------------------------------+");
        console.log("| 1. Inserir Clientes           |");
        console.log("| 2. Listar Clientes             |");
        console.log("| 3. Buscar Cliente por ID       |");
        console.log("| 4. Deletar Cliente             |");
        console.log("| 0. Sair                        |");
        console.log("+--------------------------------+");
        opcao = await this.prompt('Escolha uma opção: ');

        switch (opcao) {
            case '1':
                const nome =  this.prompt('Nome do Cliente: ');
                const email =  this.prompt('Email do Cliente: ');
                const telefone =  this.prompt('Telefone do Cliente: ');
                const cpf= this.prompt('CPF do Cliente: ')
                const rua_numero=this.prompt('Digite a rua e numero: ');
                const bairro_cidade=this.prompt('Digite o bairro e cidade: ')

                await this.clienteService.inserirClientes(nome, email, telefone,cpf, rua_numero, bairro_cidade);
                this.exibirMenu()
                break;
            case '2':
                console.table(await this.clienteService.listarClientes());
                this.exibirMenu()
                break;
            case '3':
                const idBusca = this.prompt('ID do Cliente: ');
                console.log(await this.clienteService.buscarPorId(Number(idBusca)));
                this.exibirMenu()
                break;
                case '4':
                    const idCliente = this.prompt("Digite o ID do cliente que deseja deletar: ");
                    await this.clienteService.deletarCliente(Number(idCliente));
                    console.log("Cliente deletado com sucesso!");
                    this.exibirMenu();
                    break;
            case '0':
                console.log("Saindo...");
                break;
            default:
                console.log("Opção inválida! Tente novamente.");
                this.exibirMenu()

        }
    }
}




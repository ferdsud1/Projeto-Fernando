import promptSync from 'prompt-sync';
import { ClienteService } from '../service/ClienteService';
import { error } from 'console';

export class ClienteView {
    private clienteService: ClienteService;
    private prompt: any;

    constructor() {
        this.clienteService = new ClienteService();
        this.prompt = promptSync();
    }

    public async exibirMenu(): Promise<void> {
        let opcao: string;

        console.log("+--------------------------------+");
        console.log("|          Cliente Menu          |");
        console.log("+--------------------------------+");
        console.log("| 1. Inserir Cliente             |");
        console.log("| 2. Listar Clientes             |");
        console.log("| 3. Buscar Cliente por ID       |");
        console.log("| 4. Deletar Cliente             |");
        console.log("| 5. Atualizar Cliente           |");
        console.log("| 0. Sair                        |");
        console.log("+--------------------------------+");

        opcao = this.prompt('Escolha uma opção: ');

        switch (opcao) {
            case '1':
                const nome = this.prompt('Nome do Cliente: ');
                const email = this.prompt('Email do Cliente: ');
                const telefone = this.prompt('Telefone do Cliente: ');
                const cpf = this.prompt('CPF do Cliente: ');
                const rua_numero = this.prompt('Digite a rua e número: ');
                const bairro_cidade = this.prompt('Digite o bairro e cidade: ');

                await this.clienteService.inserirClientes(nome, email, telefone, cpf, rua_numero, bairro_cidade);
                console.log("Cliente inserido com sucesso!");
                await this.exibirMenu();
                break;

            case '2':
                try {
                    console.table(await this.clienteService.listarClientes());
                } catch (error) {
                    console.log(error.message);

                }
                await this.exibirMenu();
                break;

            case '3':
                const idBusca = this.prompt('ID do Cliente: ');
                console.log(await this.clienteService.buscarPorId(Number(idBusca)));
                await this.exibirMenu();
                break;

            case '4':
                const idCliente = this.prompt("Digite o ID do cliente que deseja deletar: ");
                try {
                    await this.clienteService.deletarCliente(Number(idCliente));
                    console.log("Cliente deletado com sucesso!");
                } catch (error) {
                    console.log(error.message); // Exibe o erro caso o cliente não seja encontrado
                }
                await this.exibirMenu();
                break;

            case '5':
                const idAtualiza = Number(this.prompt("Digite o ID do cliente que deseja atualizar: "));

                try {
                    // Verifica se o ID existe
                    await this.clienteService.buscarPorId(idAtualiza);
                } catch (error) {
                    console.log("Erro: Cliente não encontrado!");
                    await this.exibirMenu();
                    return;
                }


                const novoEmail = this.prompt("Novo email (deixe em branco para não alterar): ");
                const novoTelefone = this.prompt("Novo telefone (deixe em branco para não alterar): ");
                const novaRuaNumero = this.prompt("Nova rua e número (deixe em branco para não alterar): ");
                const novoBairroCidade = this.prompt("Novo bairro e cidade (deixe em branco para não alterar): ");

                await this.clienteService.atualizarCliente(
                    idAtualiza,
                    novoEmail || undefined,
                    novoTelefone || undefined,
                    novaRuaNumero || undefined,
                    novoBairroCidade || undefined
                );

                console.log("Cliente atualizado com sucesso!");
                await this.exibirMenu();
                break;
            case '0':
                console.log("Saindo...");
                break;

            default:
                console.log("Opção inválida! Tente novamente.");
                await this.exibirMenu();
        }
    }
}
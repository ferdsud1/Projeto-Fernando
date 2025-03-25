import promptSync from 'prompt-sync';
import { ClienteService } from '../service/ClienteService';


export class ClienteView {
    private clienteService: ClienteService;
    private prompt: any;

    constructor() {
        this.clienteService = new ClienteService();
        this.prompt = promptSync();
    }

    public async exibirMenu(): Promise<void> {
        let opcao: string;
    
        while (true) {
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
                    await this.inserirCliente();
                    break;
    
                case '2':
                    await this.listarClientes();
                    break;
    
                case '3':
                    await this.buscarClientePorId();
                    break;
    
                case '4':
                    await this.deletarCliente();
                    break;
    
                case '5':
                    await this.atualizarCliente();
                    break;
    
                case '0':
                    console.log("Saindo...");
                    return; 
    
                default:
                    console.log("Opção inválida! Tente novamente.");
            }
        }
    }
    
    private async inserirCliente(): Promise<void> {
        const nome = this.prompt('Nome do Cliente: ');
        const email = this.prompt('Email do Cliente: ');
        const telefone = this.prompt('Telefone do Cliente: ');
        const cpf = this.prompt('CPF do Cliente: ');
        const dataNascimento = this.prompt('Data de nascimento (DD/MM/AAAA): ');
        const rua_numero = this.prompt('Digite a rua e número: ');
        const bairro_cidade = this.prompt('Digite o bairro e cidade: ');
    
        // Validação de idade
        const [dia, mes, ano] = dataNascimento.split('/').map(Number);
        const dataNasc = new Date(ano, mes - 1, dia);
        const hoje = new Date();
        const idade = hoje.getFullYear() - dataNasc.getFullYear();
    
        if (
            idade < 18 ||
            (idade === 18 && hoje.getMonth() < dataNasc.getMonth()) ||
            (idade === 18 && hoje.getMonth() === dataNasc.getMonth() && hoje.getDate() < dataNasc.getDate())
        ) {
            console.log("Erro: Cliente deve ter pelo menos 18 anos para se cadastrar.");
            return;
        }
    
        await this.clienteService.inserirClientes({ nome, email, telefone, cpf, dataNascimento, rua_numero, bairro_cidade });
        console.log("Cliente inserido com sucesso!");
    }
    
    private async listarClientes(): Promise<void> {
        try {
            const clientes = await this.clienteService.listarClientes();
    
            if (clientes.length === 0) {
                console.log("Nenhum cliente cadastrado.");
            } else {
                console.table(clientes);
            }
        } catch (error) {
            console.log("Erro ao listar clientes:", error.message);
        }
    }
    
    private async buscarClientePorId(): Promise<void> {
        const idBusca = this.prompt('ID do Cliente: ');
        console.log(await this.clienteService.buscarPorId(Number(idBusca)));
    }
    
    private async deletarCliente(): Promise<void> {
        const idCliente = this.prompt("Digite o ID do cliente que deseja deletar: ");
        try {
            await this.clienteService.deletarCliente(Number(idCliente));
            console.log("Cliente deletado com sucesso!");
        } catch (error) {
            console.log(error.message); // Exibe o erro caso o cliente não seja encontrado
        }
    }
    
    private async atualizarCliente(): Promise<void> {
        const idAtualiza = Number(this.prompt("Digite o ID do cliente que deseja atualizar: "));
        try {
            await this.clienteService.buscarPorId(idAtualiza);
        } catch (error) {
            console.log("Erro: Cliente não encontrado!");
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
    }
}    
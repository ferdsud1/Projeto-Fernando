import promptSync from 'prompt-sync';
import { BuffetService } from '../service/BuffetService';
import { Buffet } from '../entity/CadastroBuffet';

export class BuffetView {
  private buffetService: BuffetService;
  private prompt: any;

  constructor() {
    this.buffetService = new BuffetService();
    this.prompt = promptSync();
  }

  // Exibir o menu de buffets
  public async exibirMenu(): Promise<void> {
    let opcao: string;

    while (true) {
      console.log("+--------------------------------+");
      console.log("|          Buffet Menu           |");
      console.log("+--------------------------------+");
      console.log("| 1. Inserir Buffet             |");
      console.log("| 2. Listar Buffets             |");
      console.log("| 3. Buscar Buffet por ID       |");
      console.log("| 4. Deletar Buffet             |");
      console.log("| 5. Atualizar Buffet           |");
      console.log("| 0. Sair                       |");
      console.log("+--------------------------------+");

      opcao = this.prompt('Escolha uma opção: ');

      switch (opcao) {
        case '1':
          await this.inserirBuffet();
          break;

        case '2':
          await this.listarBuffets();
          break;

        case '3':
          await this.buscarBuffetPorId();
          break;

        case '4':
          await this.deletarBuffet();
          break;

        case '5':
          await this.atualizarBuffet();
          break;

        case '0':
          console.log("Saindo...");
          return;

        default:
          console.log("Opção inválida! Tente novamente.");
      }
    }
  }

  // Inserir um novo buffet
  private async inserirBuffet(): Promise<void> {
    const nome = this.prompt('Nome do Buffet: ');
    const capacidade = parseInt(this.prompt('Capacidade: '));
    
    // Validar e tratar precoPorPessoa
    let precoPorPessoa = this.prompt('Preço por pessoa: ');
    precoPorPessoa = precoPorPessoa.trim() === '' ? 0 : parseFloat(precoPorPessoa);

    // Verificar se o valor de precoPorPessoa é válido
    if (isNaN(precoPorPessoa) || precoPorPessoa <= 0) {
      console.log("Por favor, insira um preço por pessoa válido.");
      return;
    }

    const descricao = this.prompt('Descrição do Buffet: ');

    const buffet = new Buffet(0, nome, capacidade, precoPorPessoa, descricao);
    try {
      await this.buffetService.inserirBuffet(buffet);
      console.log('Buffet inserido com sucesso!');
    } catch (error) {
      console.log("Erro ao inserir buffet:", error.message);
    }
  }

  // Listar todos os buffets
  private async listarBuffets(): Promise<void> {
    try {
      const buffets = await this.buffetService.listarBuffets();

      if (buffets.length === 0) {
        console.log("Nenhum buffet cadastrado.");
      } else {
        console.table(buffets);
      }
    } catch (error) {
      console.log("Erro ao listar buffets:", error.message);
    }
  }

  // Buscar buffet pelo ID
  private async buscarBuffetPorId(): Promise<void> {
    const idBusca = this.prompt('ID do Buffet: ');
    try {
      const buffet = await this.buffetService.buscarPorId(Number(idBusca));
      if (!buffet) {
        console.log("Buffet não encontrado! Verifique o ID informado e tente novamente.");
        return;
      }
      console.table([buffet]);  // Exibir como uma tabela para melhor visualização
    } catch (error) {
      console.log("Erro ao buscar buffet:", error.message);
    }
  }

  // Deletar um buffet
  private async deletarBuffet(): Promise<void> {
    const idBuffet = this.prompt("Digite o ID do buffet que deseja deletar: ");
    try {
      await this.buffetService.deletarBuffet(Number(idBuffet));
      console.log("Buffet deletado com sucesso!");
    } catch (error) {
      console.log(error.message); // Exibe o erro caso o buffet não seja encontrado
    }
  }

  // Atualizar as informações de um buffet
  private async atualizarBuffet(): Promise<void> {
    const id = parseInt(this.prompt('ID do Buffet a ser atualizado: '));

    try {
      const buffetAtual = await this.buffetService.buscarPorId(id);

      if (!buffetAtual) {
        console.log('Buffet não encontrado!');
        return;
      }

      // Exibir os valores atuais para o usuário
      const nome = this.prompt(`Novo nome do Buffet (atual: ${buffetAtual.getNome()}): `);
      const capacidade = this.prompt(`Nova capacidade (atual: ${buffetAtual.getCapacidade()}): `);
      
      // Validar e tratar precoPorPessoa
      let precoPorPessoa = this.prompt(`Novo preço por pessoa (atual: ${buffetAtual.getPrecoPorPessoa()}): `);
      precoPorPessoa = precoPorPessoa.trim() === '' ? buffetAtual.getPrecoPorPessoa() : parseFloat(precoPorPessoa);

      // Verificar se o valor de precoPorPessoa é válido
      if (isNaN(precoPorPessoa) || precoPorPessoa <= 0) {
        console.log("Por favor, insira um preço por pessoa válido.");
        return;
      }

      const descricao = this.prompt(`Nova descrição do Buffet (atual: ${buffetAtual.getDescricao()}): `);

      // Usar o valor atual caso o campo esteja vazio
      const novoNome = nome.trim() === '' ? buffetAtual.getNome() : nome;
      const novaCapacidade = capacidade.trim() === '' ? buffetAtual.getCapacidade() : parseInt(capacidade);
      const novaDescricao = descricao.trim() === '' ? buffetAtual.getDescricao() : descricao;

      // Cria uma nova instância do Buffet com os dados atualizados
      const buffetAtualizado = new Buffet(
        id,
        novoNome,
        novaCapacidade,
        precoPorPessoa,
        novaDescricao
      );

      await this.buffetService.atualizarBuffet(buffetAtualizado);
      console.log('Buffet atualizado com sucesso!');
    } catch (error) {
      console.log('Erro ao atualizar buffet:', error.message);
    }
  }
}

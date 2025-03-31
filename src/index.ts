import * as readlineSync from 'readline-sync';
import { ClienteView } from './view/ClienteView';
import { BuffetView } from './view/BuffetView';
import { PagamentoView } from './view/PagamentoView';

async function main() {
  const clienteView = new ClienteView();
  const buffetView = new BuffetView();
  const pagamentoView = new PagamentoView();

  let continuar = true;

  while (continuar) {
    console.log('\nMenu Principal:');
    console.log('1 - Cadastro de Cliente');
    console.log('2 - Buffets');
    console.log('3 - Pagamento');
    console.log('4 - Sair');

    const opcao = readlineSync.question('Escolha uma opção: ');

    switch (opcao) {
      case '1':
        await clienteView.exibirMenu(); // Acessa o menu de Cliente
        break;
      case '2':
        await buffetView.exibirMenu(); // Acessa o menu de Buffet
        break;
      case '3':
        const idBuffet = parseInt(readlineSync.question('Digite o ID do buffet escolhido: '));
        const numeroPessoas = parseInt(readlineSync.question('Digite o número de pessoas: '));
        await pagamentoView.exibirPagamento(idBuffet, numeroPessoas); // Acessa o menu de Pagamento
        break;
      case '4':
        continuar = false;
        console.log('Programa encerrado.');
        break;
      default:
        console.log('Opção inválida. Tente novamente.');
    }
  }
}

main();

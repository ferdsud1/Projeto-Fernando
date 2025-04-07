import inquirer from 'inquirer';
import { ClienteService } from '../service/ClienteService';
import { ClienteRepository } from '../repository/ClienteRepository';
import { CadastroCliente } from '../entity/CadastroCliente';

import chalk from 'chalk';
import figlet from 'figlet';
import ora from 'ora';

// Instanciando o ClienteRepository e ClienteService
const clienteRepository = new ClienteRepository();
const clienteService = new ClienteService();

async function exibirTitulo() {
  console.clear();
  console.log(
    chalk.cyanBright(
      figlet.textSync('Menu Cliente', {
        font: 'Standard',
        horizontalLayout: 'default',
      })
    )
  );
  console.log(chalk.gray('='.repeat(50)));
}

export async function menuCliente() {
  await exibirTitulo();

  const spinner = ora('Carregando menu cliente...').start();
  await new Promise((resolve) => setTimeout(resolve, 800));
  spinner.succeed(chalk.green('Menu cliente carregado!'));

  const { opcao } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcao',
      message: chalk.yellowBright('\nEscolha uma opção para o cliente:'),
      choices: [
        new inquirer.Separator(chalk.gray('─── Opções Cliente ───')),
        '📋 Listar clientes',
        '➕ Cadastrar cliente',
        '🔍 Buscar cliente por ID',
        '✏️ Atualizar cliente',
        '🗑️ Deletar cliente',
        new inquirer.Separator(),
        '🚪 Voltar ao menu principal',
      ],
    },
  ]);

  switch (opcao) {
    case '📋 Listar clientes':
      await listarClientes();
      break;
    case '➕ Cadastrar cliente':
      await cadastrarCliente();
      break;
    case '🔍 Buscar cliente por ID':
      await buscarClientePorId();
      break;
    case '✏️ Atualizar cliente':
      await atualizarCliente();
      break;
    case '🗑️ Deletar cliente':
      await deletarCliente();
      break;
    case '🚪 Voltar ao menu principal':
      console.log(chalk.cyanBright('\nVoltando ao menu principal...'));
      return;
  }

  await inquirer.prompt([
    {
      type: 'input',
      name: 'continuar',
      message: chalk.cyan('\nPressione Enter para continuar...'),
    },
  ]);

  await menuCliente();
}

// ====================== FUNÇÕES ======================

async function listarClientes() {
  try {
    const clientes = await clienteService.listarClientes();
    if (clientes.length === 0) {
      console.log(chalk.red('Nenhum cliente cadastrado.'));
    } else {
      console.log(chalk.cyanBright('Clientes cadastrados:'));
      console.table(clientes);
    }
  } catch (error) {
    console.log(chalk.red('Erro ao listar clientes:', error));
  }
}

async function cadastrarCliente() {
  try {
    const respostas = await inquirer.prompt([
      { type: 'input', name: 'nome', message: 'Nome do cliente:' },
      { type: 'input', name: 'cpf', message: 'CPF do cliente:' },
      { type: 'input', name: 'datanascimento', message: 'Data de nascimento (YYYY-MM-DD):' },
      { type: 'input', name: 'telefone', message: 'Telefone do cliente:' },
      { type: 'input', name: 'email', message: 'Email do cliente:' },
      { type: 'input', name: 'rua_numero', message: 'Rua e número:' },
      { type: 'input', name: 'bairro_cidade', message: 'Bairro e cidade:' },
    ]);

    const cliente = new CadastroCliente();
    cliente.setNome(respostas.nome);
    cliente.setCpf(respostas.cpf);
    cliente.setDataNascimento(new Date(respostas.datanascimento));
    cliente.setTelefone(respostas.telefone);
    cliente.setEmail(respostas.email);
    cliente.setRuaNumero(respostas.rua_numero);
    cliente.setBairroCidade(respostas.bairro_cidade);

    const mensagem = await clienteService.inserirCliente(cliente);
    console.log(chalk.green(mensagem));
  } catch (error) {
    console.log(chalk.red('Erro ao cadastrar cliente:', error));
  }
}

async function buscarClientePorId() {
  try {
    const { id } = await inquirer.prompt([
      { type: 'input', name: 'id', message: 'Digite o ID do cliente:' }
    ]);

    const cliente = await clienteService.buscarPorId(Number(id));

    if (!cliente) {
      console.log(chalk.red('❌ Cliente não encontrado.'));
    } else {
      console.log(chalk.cyanBright('\nCliente encontrado:'));
      console.table([cliente]);
    }
  } catch (error) {
    console.log(chalk.red('Erro ao buscar cliente por ID:', error));
  }
}

async function atualizarCliente() {
  try {
    const { id } = await inquirer.prompt([
      { type: 'input', name: 'id', message: 'Digite o ID do cliente que deseja atualizar:' }
    ]);

    const clienteExistente = await clienteService.buscarPorId(Number(id));
    if (!clienteExistente) {
      console.log(chalk.red('❌ Cliente não encontrado.'));
      return;
    }

    const respostas = await inquirer.prompt([
      { type: 'input', name: 'nome', message: `Nome (${clienteExistente.getNome()}):` },
      { type: 'input', name: 'cpf', message: `CPF (${clienteExistente.getCpf()}):` },
      { type: 'input', name: 'datanascimento', message: `Data de nascimento (${clienteExistente.getDataNascimento().toISOString().split('T')[0]}):` },
      { type: 'input', name: 'telefone', message: `Telefone (${clienteExistente.getTelefone()}):` },
      { type: 'input', name: 'email', message: `Email (${clienteExistente.getEmail()}):` },
      { type: 'input', name: 'rua_numero', message: `Rua e número (${clienteExistente.getRuaNumero()}):` },
      { type: 'input', name: 'bairro_cidade', message: `Bairro e cidade (${clienteExistente.getBairroCidade()}):` },
    ]);

    const clienteAtualizado = new CadastroCliente();
    clienteAtualizado.setId(clienteExistente.getId());
    clienteAtualizado.setNome(respostas.nome || clienteExistente.getNome());
    clienteAtualizado.setCpf(respostas.cpf || clienteExistente.getCpf());
    clienteAtualizado.setDataNascimento(
      respostas.datanascimento ? new Date(respostas.datanascimento) : clienteExistente.getDataNascimento()
    );
    clienteAtualizado.setTelefone(respostas.telefone || clienteExistente.getTelefone());
    clienteAtualizado.setEmail(respostas.email || clienteExistente.getEmail());
    clienteAtualizado.setRuaNumero(respostas.rua_numero || clienteExistente.getRuaNumero());
    clienteAtualizado.setBairroCidade(respostas.bairro_cidade || clienteExistente.getBairroCidade());

    const resultado = await clienteService.atualizarCliente(clienteAtualizado);
    console.log(chalk.green(resultado));
  } catch (error) {
    console.log(chalk.red('Erro ao atualizar cliente:', error));
  }
}

async function deletarCliente() {
  try {
    const { id } = await inquirer.prompt([
      { type: 'input', name: 'id', message: 'Digite o ID do cliente que deseja deletar:' }
    ]);

    const mensagem = await clienteService.deletarCliente(Number(id));
    console.log(chalk.green(mensagem));
  } catch (error) {
    console.log(chalk.red('Erro ao deletar cliente:', error));
  }
}

import inquirer from 'inquirer';
import figlet from 'figlet';
import chalk from 'chalk';
import ora from 'ora';
import { ContratacaoService } from '../service/ContratacaoService';

const contratacaoService = new ContratacaoService();

export async function menuContratacao() {
  console.clear();

  console.log(chalk.cyan(figlet.textSync('Contratacao', { horizontalLayout: 'default' })));

  let sair = false;

  while (!sair) {
    const resposta = await inquirer.prompt([
      {
        type: 'list',
        name: 'opcao',
        message: chalk.yellow('Escolha uma opção:'),
        choices: [
          'Cadastrar Contratação',
          'Listar Contratações',
          'Buscar por ID',
          'Excluir Contratação',
          'Voltar ao Menu Principal',
        ],
      },
    ]);

    switch (resposta.opcao) {
      case 'Cadastrar Contratação':
        await cadastrarContratacao();
        break;
      case 'Listar Contratações':
        await listarContratacoes();
        break;
      case 'Buscar por ID':
        await buscarPorId();
        break;
      case 'Excluir Contratação':
        await excluirContratacao();
        break;
      case 'Voltar ao Menu Principal':
        sair = true;
        break;
    }
  }
}

async function cadastrarContratacao() {
  const respostas = await inquirer.prompt([
    { name: 'id_cliente', message: 'ID do cliente:', type: 'number' },
    { name: 'id_buffet', message: 'ID do buffet:', type: 'number' },
    { name: 'quantidade_pessoas', message: 'Quantidade de pessoas:', type: 'number' },
    { name: 'data_evento', message: 'Data do evento (AAAA-MM-DD):', type: 'input' },
    { name: 'horario_evento', message: 'Horário do evento (HH:MM):', type: 'input' },
  ]);

  const spinner = ora('Salvando contratação...').start();
  try {
    await contratacaoService.cadastrarContratacao(
      respostas.id_cliente,
      respostas.id_buffet,
      respostas.quantidade_pessoas,
      new Date(respostas.data_evento),
      respostas.horario_evento
    );
    spinner.succeed('Contratação cadastrada com sucesso!');
  } catch (error: any) {
    spinner.fail(`Erro ao cadastrar: ${error.message}`);
  }
}

async function listarContratacoes() {
  const spinner = ora('Buscando contratações...').start();
  try {
    const contratacoes = await contratacaoService.listarContratacoes();
    spinner.stop();
    console.table(contratacoes);
  } catch (error) {
    spinner.fail('Erro ao listar contratações.');
  }
}

async function buscarPorId() {
  const { id } = await inquirer.prompt([
    { name: 'id', message: 'ID da contratação:', type: 'number' },
  ]);

  const spinner = ora('Buscando contratação...').start();
  try {
    const contratacao = await contratacaoService.buscarPorId(id);
    spinner.stop();
    if (contratacao) {
      console.log(contratacao);
    } else {
      console.log(chalk.red('Contratação não encontrada.'));
    }
  } catch (error) {
    spinner.fail('Erro ao buscar contratação.');
  }
}

async function excluirContratacao() {
  const { id } = await inquirer.prompt([
    { name: 'id', message: 'ID da contratação para excluir:', type: 'number' },
  ]);

  const spinner = ora('Excluindo contratação...').start();
  try {
    await contratacaoService.excluirContratacao(id);
    spinner.succeed('Contratação excluída com sucesso!');
  } catch (error) {
    spinner.fail('Erro ao excluir contratação.');
  }
}

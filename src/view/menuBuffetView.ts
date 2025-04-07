import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';
import ora from 'ora';

import { Buffet } from '../entity/CadastroBuffet';
import { BuffetRepository } from '../repository/BuffetRepository';
import { BuffetService } from '../service/BuffetService';

const buffetRepository = new BuffetRepository();
const buffetService = new BuffetService(buffetRepository);

export async function menuBuffet(): Promise<void> {
  console.clear();
  console.log(
    chalk.magentaBright(
      figlet.textSync('Menu Buffet', { horizontalLayout: 'default' })
    )
  );

  const { opcao } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcao',
      message: chalk.cyanBright('Selecione uma opção:'),
      choices: [
        '📋 Listar buffets',
        '➕ Cadastrar buffet',
        '🔍 Buscar buffet por ID',
        '✏️ Atualizar buffet',
        '🗑️ Deletar buffet',
        new inquirer.Separator(),
        '🚪 Voltar ao menu principal',
      ],
    },
  ]);

  switch (opcao) {
    case '📋 Listar buffets':
      await listarBuffets();
      break;
    case '➕ Cadastrar buffet':
      await cadastrarBuffet();
      break;
    case '🔍 Buscar buffet por ID':
      await buscarBuffetPorId();
      break;
    case '✏️ Atualizar buffet':
      await atualizarBuffet();
      break;
    case '🗑️ Deletar buffet':
      await deletarBuffet();
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

  await menuBuffet();
}

// ========== FUNÇÕES ==========

async function listarBuffets() {
  const spinner = ora('Buscando buffets...').start();
  try {
    const buffets = await buffetService.listarBuffets();
    spinner.stop();

    if (buffets.length === 0) {
      console.log(chalk.red('Nenhum buffet cadastrado.'));
    } else {
      console.log(chalk.cyanBright('\nBuffets cadastrados:'));
      console.table(
        buffets.map(b => ({
          ID: b.getId(),
          Nome: b.getNome(),
          Capacidade: b.getCapacidade(),
          'Preço por Pessoa (R$)': b.getPrecoPorPessoa(),
          Descrição: b.getDescricao(),
        }))
      );
    }
  } catch (error: any) {
    spinner.stop();
    console.log(chalk.red('Erro ao listar buffets:', error.message));
  }
}

async function cadastrarBuffet() {
  try {
    const respostas = await inquirer.prompt([
      { type: 'input', name: 'nome', message: 'Nome do buffet:' },
      { type: 'number', name: 'capacidade', message: 'Capacidade (número de pessoas):' },
      { type: 'number', name: 'preco', message: 'Preço por pessoa (R$):' },
      { type: 'input', name: 'descricao', message: 'Descrição do buffet:' },
    ]);

    const spinner = ora('Cadastrando buffet...').start();

    const buffet = await buffetService.cadastrarBuffet(
      respostas.nome,
      respostas.capacidade,
      respostas.preco,
      respostas.descricao
    );

    spinner.succeed('✅ Buffet cadastrado com sucesso!');
    console.table([{
      ID: buffet.getId(),
      Nome: buffet.getNome(),
      Capacidade: buffet.getCapacidade(),
      'Preço por Pessoa (R$)': buffet.getPrecoPorPessoa(),
      Descrição: buffet.getDescricao(),
    }]);
  } catch (error: any) {
    ora().stop();
    console.log(chalk.red('Erro ao cadastrar buffet:', error.message));
  }
}



async function buscarBuffetPorId() {
  const spinner = ora();
  try {
    const { id } = await inquirer.prompt([
      { type: 'input', name: 'id', message: 'Digite o ID do buffet:' },
    ]);

    spinner.start(`Buscando buffet com ID ${id}...`);
    const buffet = await buffetService.buscarBuffetPorId(Number(id));
    spinner.stop();

    if (!buffet) {
      console.log(chalk.red('❌ Buffet não encontrado.'));
      return;
    }

    console.log(chalk.cyanBright('\nBuffet encontrado:'));
    console.table([{
      ID: buffet.getId(),
      Nome: buffet.getNome(),
      Capacidade: buffet.getCapacidade(),
      'Preço por Pessoa (R$)': buffet.getPrecoPorPessoa(),
      Descrição: buffet.getDescricao(),
    }]);
  } catch (error: any) {
    spinner.stop();
    console.log(chalk.red('Erro ao buscar buffet por ID:', error.message));
  }
}

async function atualizarBuffet() {
  const spinner = ora();
  try {
    const { id } = await inquirer.prompt([
      { type: 'input', name: 'id', message: 'ID do buffet para atualizar:' },
    ]);

    spinner.start('Buscando buffet...');
    const buffetExistente = await buffetService.buscarBuffetPorId(Number(id));
    spinner.stop();

    if (!buffetExistente) {
      console.log(chalk.red('❌ Buffet não encontrado.'));
      return;
    }

    const respostas = await inquirer.prompt([
      { type: 'input', name: 'nome', message: 'Nome:', default: buffetExistente.getNome() },
      { type: 'number', name: 'capacidade', message: 'Capacidade:', default: buffetExistente.getCapacidade() },
      { type: 'number', name: 'preco', message: 'Preço por pessoa:', default: buffetExistente.getPrecoPorPessoa() },
      { type: 'input', name: 'descricao', message: 'Descrição:', default: buffetExistente.getDescricao() },
    ]);

    spinner.start('Atualizando buffet...');
    const buffetAtualizado = new Buffet(
      buffetExistente.getId(),
      respostas.nome,
      respostas.capacidade,
      respostas.preco,
      respostas.descricao
    );

    const sucesso = await buffetService.atualizarBuffet(buffetAtualizado.getId(), buffetAtualizado);
    spinner.stop();

    if (sucesso) {
      console.log(chalk.green('✅ Buffet atualizado com sucesso!'));
    } else {
      console.log(chalk.red('❌ Não foi possível atualizar o buffet.'));
    }
  } catch (error: any) {
    spinner.stop();
    console.log(chalk.red('Erro ao atualizar buffet:', error.message));
  }
}

async function deletarBuffet() {
  const spinner = ora();
  try {
    const { id } = await inquirer.prompt([
      { type: 'input', name: 'id', message: 'ID do buffet para deletar:' },
    ]);

    const { confirmar } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirmar',
        message: chalk.yellow('Tem certeza que deseja deletar este buffet?'),
        default: false,
      },
    ]);

    if (!confirmar) {
      console.log(chalk.blueBright('❌ Exclusão cancelada.'));
      return;
    }

    spinner.start('Deletando buffet...');
    const sucesso = await buffetService.deletarBuffet(Number(id));
    spinner.stop();

    if (sucesso) {
      console.log(chalk.redBright('⚠️ Buffet deletado com sucesso.'));
    } else {
      console.log(chalk.red('❌ Buffet não encontrado.'));
    }
  } catch (error: any) {
    spinner.stop();
    console.log(chalk.red('Erro ao deletar buffet:', error.message));
  }
}

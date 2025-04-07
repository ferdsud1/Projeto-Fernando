// index.ts

import figlet from 'figlet';
import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';

import { menuCliente } from './view/ClienteView';
import { menuBuffet } from './view/menuBuffetView';
import { menuContratacao } from './view/menuContratacaoView'; // Novo menu importado

async function exibirTituloPrincipal() {
  console.clear();
  console.log(
    chalk.cyanBright(
      figlet.textSync('Sistema de Eventos', {
        font: 'Standard',
        horizontalLayout: 'default',
      })
    )
  );
  console.log(chalk.gray('='.repeat(50)));
}

async function menuPrincipal() {
  await exibirTituloPrincipal();

  const spinner = ora('Carregando menu principal...').start();
  await new Promise((resolve) => setTimeout(resolve, 800));
  spinner.succeed(chalk.green('Menu principal carregado!'));

  const { opcao } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcao',
      message: chalk.yellowBright('\nEscolha uma opção:'),
      choices: [
        new inquirer.Separator(chalk.gray('─── Áreas do Sistema ───')),
        '👤 Menu Cliente',
        '🍽️ Menu Buffet',
        '📅 Menu Contratação',
        new inquirer.Separator(),
        '❌ Sair do sistema',
      ],
    },
  ]);

  switch (opcao) {
    case '👤 Menu Cliente':
      await menuCliente();
      break;
    case '🍽️ Menu Buffet':
      await menuBuffet();
      break;
    case '📅 Menu Contratação':
      await menuContratacao();
      break;
    case '❌ Sair do sistema':
      console.log(chalk.cyanBright('\nSistema finalizado. Até mais! 👋'));
      process.exit();
  }

  await inquirer.prompt([
    {
      type: 'input',
      name: 'voltar',
      message: chalk.cyan('\nPressione Enter para voltar ao menu principal...'),
    },
  ]);

  await menuPrincipal();
}

// Inicia o sistema
menuPrincipal();

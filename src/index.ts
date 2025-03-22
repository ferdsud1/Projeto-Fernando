

import { ClienteView } from './view/ClienteView';
async function main() {
    const clienteView = new ClienteView();

    try {
        clienteView.exibirMenu();

    } catch (error) {
        console.error("Erro:", error.message);
    }


}

main();





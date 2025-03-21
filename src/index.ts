
import { ClienteService } from "./service/ClienteService";

async function main() {
    const clienteService = new ClienteService();

    try {
        console.log("Listando todos os clientes:");
        const clientes = await clienteService.listarClientes();
        console.table(clientes);

        //console.log("\nBuscando cliente com id desejado:");
        //const cliente = await clienteService.buscarPorId(12);
        //console.table(cliente);
        
    } catch (error) {
        console.error("Erro:", error.message);
    }

   
}

main();
import { ClienteView } from './view/ClienteView';

const clienteView = new ClienteView();
clienteView.exibirMenu();

;




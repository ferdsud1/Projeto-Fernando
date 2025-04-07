import { ClienteRepository } from '../repository/ClienteRepository';
import { CadastroCliente } from '../entity/CadastroCliente';

export class ClienteService {
  private clienteRepo: ClienteRepository;

  constructor() {
    this.clienteRepo = new ClienteRepository();
  }

  async listarClientes(): Promise<CadastroCliente[]> {
    return await this.clienteRepo.listarClientes();
  }

  async buscarPorId(id: number): Promise<CadastroCliente> {
    const cliente = await this.clienteRepo.buscarPorId(id);
    if (!cliente) {
      throw new Error(`Cliente com ID ${id} não encontrado.`);
    }
    return cliente;
  }

  async inserirCliente(cliente: CadastroCliente): Promise<string> {
    if (!cliente.getNome().trim()) {
      throw new Error("O nome é obrigatório.");
    }

    if (!this.validarCPF(cliente.getCpf())) {
      throw new Error("CPF inválido.");
    }

    const clientesExistentes = await this.clienteRepo.listarClientes();
    if (clientesExistentes.some(c => c.getCpf() === cliente.getCpf())) {
      throw new Error("Já existe um cliente com este CPF.");
    }

    if (!this.maiorDeIdade(cliente.getDataNascimento())) {
      throw new Error("O cliente deve ter pelo menos 18 anos.");
    }

    if (!this.validarEmail(cliente.getEmail())) {
      throw new Error("E-mail inválido.");
    }

    if (!cliente.getTelefone().trim()) {
      throw new Error("Telefone é obrigatório.");
    }

    if (!cliente.getRuaNumero().trim() || !cliente.getBairroCidade().trim()) {
      throw new Error("Endereço incompleto: rua/número e bairro/cidade são obrigatórios.");
    }

    await this.clienteRepo.inserirCliente(cliente);
    return 'Cliente cadastrado com sucesso.';
  }

  async deletarCliente(id: number): Promise<string> {
    const cliente = await this.clienteRepo.buscarPorId(id);
    if (!cliente) {
      return `❌ Cliente com ID ${id} não encontrado.`;
    }

    await this.clienteRepo.deletarCliente(id);
    return `✅ Cliente com ID ${id} deletado com sucesso.`;
  }

  async atualizarCliente(cliente: CadastroCliente): Promise<string> {
    const existente = await this.clienteRepo.buscarPorId(cliente.getId());
    if (!existente) {
      throw new Error(`Não é possível atualizar: cliente com ID ${cliente.getId()} não encontrado.`);
    }

    // Aqui você pode repetir as mesmas validações se quiser segurança
    await this.clienteRepo.atualizarCliente(cliente);
    return `✅ Cliente com ID ${cliente.getId()} atualizado com sucesso.`;
  }

  // ===== Validações auxiliares =====

  private validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += Number(cpf.charAt(i)) * (10 - i);
    }
    let dig1 = 11 - (soma % 11);
    if (dig1 >= 10) dig1 = 0;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += Number(cpf.charAt(i)) * (11 - i);
    }
    let dig2 = 11 - (soma % 11);
    if (dig2 >= 10) dig2 = 0;

    return dig1 === Number(cpf.charAt(9)) && dig2 === Number(cpf.charAt(10));
  }

  private validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  private maiorDeIdade(data: Date): boolean {
    const hoje = new Date();
    const idade = hoje.getFullYear() - data.getFullYear();
    const m = hoje.getMonth() - data.getMonth();
    const d = hoje.getDate() - data.getDate();

    return idade > 18 || (idade === 18 && (m > 0 || (m === 0 && d >= 0)));
  }
}

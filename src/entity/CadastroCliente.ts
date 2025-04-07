export class CadastroCliente {
  private id: number;
  private nome: string;
  private cpf: string;
  private dataNascimento: Date;
  private telefone: string;
  private email: string;
  private ruaNumero: string;
  private bairroCidade: string;

  private static proximoId = 1;

  constructor() {
    this.id = CadastroCliente.proximoId++;
  }

  // Getters
  public getId(): number {
    return this.id;
  }

  public getNome(): string {
    return this.nome;
  }

  public getCpf(): string {
    return this.cpf;
  }

  public getDataNascimento(): Date {
    return this.dataNascimento;
  }

  public getTelefone(): string {
    return this.telefone;
  }

  public getEmail(): string {
    return this.email;
  }

  public getRuaNumero(): string {
    return this.ruaNumero;
  }

  public getBairroCidade(): string {
    return this.bairroCidade;
  }

  // Setters
  public setId(id: number): void {
    this.id = id;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public setCpf(cpf: string): void {
    // Remove tudo que não for número
    cpf = cpf.replace(/\D/g, '');

    // Se tiver 11 dígitos, formata como 000.000.000-00
    if (cpf.length === 11) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    this.cpf = cpf;
  }

  public setDataNascimento(dataNascimento: Date): void {
    this.dataNascimento = dataNascimento;
  }

  public setTelefone(telefone: string): void {
    this.telefone = telefone;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setRuaNumero(ruaNumero: string): void {
    this.ruaNumero = ruaNumero;
  }

  public setBairroCidade(bairroCidade: string): void {
    this.bairroCidade = bairroCidade;
  }
}

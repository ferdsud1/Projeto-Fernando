export class Buffet {
  constructor(
    private id: number,
    private nome: string,
    private capacidade: number,
    private precoPorPessoa: number,
    private descricao: string
  ) {}

  // Getters
  getId(): number {
    return this.id;
  }

  getNome(): string {
    return this.nome;
  }

  getCapacidade(): number {
    return this.capacidade;
  }

  getPrecoPorPessoa(): number {
    return this.precoPorPessoa;
  }

  getDescricao(): string {
    return this.descricao;
  }

  // Setters
  setNome(nome: string): void {
    this.nome = nome;
  }

  setCapacidade(capacidade: number): void {
    this.capacidade = capacidade;
  }

  setPrecoPorPessoa(preco: number): void {
    this.precoPorPessoa = preco;
  }

  setDescricao(descricao: string): void {
    this.descricao = descricao;
  }
}

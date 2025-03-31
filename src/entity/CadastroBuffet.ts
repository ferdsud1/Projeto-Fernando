// Classe Buffet (exemplo)
export class Buffet {
    private id: number;
    private nome: string;
    private capacidade: number;
    private precoPorPessoa: number;
    private descricao: string;
  
    constructor(
      id: number,
      nome: string,
      capacidade: number,
      precoPorPessoa: number,
      descricao: string
    ) {
      this.id = id;
      this.nome = nome;
      this.capacidade = capacidade;
      this.precoPorPessoa = precoPorPessoa;
      this.descricao = descricao;
    }
  
    // Métodos para acessar os dados
    public getId(): number {
      return this.id;
    }
  
    public getNome(): string {
      return this.nome;
    }
  
    public getCapacidade(): number {
      return this.capacidade;
    }
  
    public getPrecoPorPessoa(): number {
      return this.precoPorPessoa;
    }
  
    public getDescricao(): string {
      return this.descricao;
    }
  }
  
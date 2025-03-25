export class CadastroCliente {
    private id: number;
    private nome: string;
    private cpf: string;
    private dataNascimento: Date
    private telefone: string;
    private email: string;
    private rua_numero: string
    private bairro_cidade: string

    constructor(nome: string, cpf: string,dataNascimento:Date, telefone: string, email: string, rua_numero: string, bairro_cidade: string, id: number) {
        this.id = id
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento=dataNascimento
        this.telefone = telefone
        this.email = email
        this.rua_numero = rua_numero
        this.bairro_cidade = bairro_cidade
    }

    getId(): number {
        return this.id
    }
    getEmail(): string {
        return this.email
    }
    getTelefone(): string {
        return this.telefone
    }
    getRua_numero(): string {
        return this.rua_numero
    }
    getBairro_cidade(): string {
        return this.bairro_cidade
    }
    


}

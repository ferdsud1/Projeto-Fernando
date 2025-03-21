export class CadastroCliente {
    private id: number;
    private nome: string;
    private cpf: string;
    private telefone: string;
    private email: string;
    private rua_numero:string
    private bairro_cidade:string

    constructor(nome: string, cpf: string, telefone:string, email: string, rua_numero: string, bairro_cidade:string, id:number  ) {
        this.id=id
        this.nome = nome;
        this.cpf=cpf;
        this.telefone=telefone
        this.email=email
        this.rua_numero=rua_numero
        this.bairro_cidade=bairro_cidade
    }


}

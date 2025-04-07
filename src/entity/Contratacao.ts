

export class Contratacao {
  public id_contratacoes: number;
  public id_cliente: number;
  public id_buffet: number;
  public quantidade_pessoas: number;
  public preco_total: number;
  public data_evento: Date;
  public horario_evento: string;

  constructor(
    id_cliente: number,
    id_buffet: number,
    quantidade_pessoas: number,
    preco_total: number,
    data_evento: Date,
    horario_evento: string,
    id_contratacoes?: number // opcional, para quando for buscar do banco
  ) {
    this.id_contratacoes = id_contratacoes ?? 0;
    this.id_cliente = id_cliente;
    this.id_buffet = id_buffet;
    this.quantidade_pessoas = quantidade_pessoas;
    this.preco_total = preco_total;
    this.data_evento = data_evento;
    this.horario_evento = horario_evento;
  }
}

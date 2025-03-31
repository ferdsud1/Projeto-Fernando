export class Contratacao {
    constructor(
      public id_contratacao: number,
      public cliente_id: number,
      public buffet_id: number,
      public quantidade_pessoas: number,
      public valor_total: number,
      public valor_adiantamento: number,
      public data_evento: Date,
      public pago: boolean = false
    ) {}
  }
export class Pagamento {
    constructor(
      public id_pagamento: number,
      public contratacao_id: number,
      public valor_pago: number,
      public data_pagamento: Date
    ) {}
  }
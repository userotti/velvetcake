export class OrderLine {

    constructor(
        public $key:string,
        public amount: string,
        public product: string,



      ) {

    }

    static fromJsonList(array): OrderLine[] {
        return array.map(OrderLine.fromJson);
    }

    static fromJson({
        $key,
        amount,
        product}):OrderLine {

        return new OrderLine($key,
        amount,
        product);
    }

    public toStrippedJson():any {

      var stripped = {
        amount: this.amount,
        product: this.product,

      }
      Object.keys(stripped).forEach(key => stripped[key] === undefined && delete stripped[key]);
      return stripped;

    }

    public patchValues(order : any) {

      Object.keys(order).forEach(key => {
        if (order[key] != undefined){
          this[key] = order[key]
        }
      });

    }

}

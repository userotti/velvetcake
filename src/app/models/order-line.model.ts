export class OrderLine {

    constructor(
        public $key:string,
        public quantity: string,
        public product: string,



      ) {

    }

    static fromJsonList(array): OrderLine[] {
        return array.map(OrderLine.fromJson);
    }

    static fromJson({
        $key,
        quantity,
        product}):OrderLine {

        return new OrderLine($key,
        quantity,
        product);
    }

    public toStrippedJson():any {

      var stripped = {
        quantity: this.quantity,
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

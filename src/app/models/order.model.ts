export class Order {

    constructor(
        public $key:string,
        public datetime: string,


      ) {

    }

    static fromJsonList(array): Order[] {
        return array.map(Order.fromJson);
    }

    static fromJson({
        $key,
        datetime}):Order {

        return new Order($key,
        datetime);
    }

    public toStrippedJson():any {

      var stripped = {
        datetime: this.datetime,
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

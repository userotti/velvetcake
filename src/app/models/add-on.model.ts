export class AddOn {

    constructor(
        public $key:string,
        public description: string,
        public price: string) {

    }

    static fromJsonList(array): AddOn[] {
        return array.map(AddOn.fromJson);
    }

    static fromJson({
        $key,
        description,
        price}):AddOn {

        return new AddOn($key,
        description,
        price);
    }

    public toStrippedJson():any {

      var stripped = {
        description: this.description,
        price: this.price
      }

      Object.keys(stripped).forEach(key => stripped[key] === undefined && delete stripped[key]);

      return stripped;

    }

    public patchValues(addOn : any) {

      Object.keys(addOn).forEach(key => {
        if (addOn[key] != undefined){
          this[key] = addOn[key]
        }
      });

    }

}

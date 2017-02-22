export class Address {

    constructor(
        public $key:string,
        public country: string,
        public city: string,
        public streetname: string,
        public streetnumber: string,

      ) {

    }

    static fromJsonList(array): Address[] {
        return array.map(Address.fromJson);
    }

    static fromJson({
        $key,
        country,
        city,
        streetname,
        streetnumber}):Address {

        return new Address($key,
          country,
          city,
          streetname,
          streetnumber);
    }

    public toStrippedJson():any {

      var stripped = {
        country: this.country,
        city: this.city,
        streetname: this.streetname,
        streetnumber: this.streetnumber,

      }
      Object.keys(stripped).forEach(key => stripped[key] === undefined && delete stripped[key]);
      return stripped;

    }

    public patchValues(address : any) {

      Object.keys(address).forEach(key => {
        if (address[key] != undefined){
          this[key] = address[key]
        }
      });

    }

}

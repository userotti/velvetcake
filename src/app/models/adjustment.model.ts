export class Adjustment {

    constructor(
        public $key:string,
        public description: string,
        public detail: string) {

    }

    static fromJsonList(array): Adjustment[] {
        return array.map(Adjustment.fromJson);
    }

    static fromJson({
        $key,
        description,
        detail}):Adjustment {

        return new Adjustment($key,
        description,
        detail);
    }

    public toStrippedJson():any {

      var stripped = {
        description: this.description,
        detail: this.detail
      }

      Object.keys(stripped).forEach(key => stripped[key] === undefined && delete stripped[key]);

      return stripped;

    }

    public patchValues(adjustment : any) {

      Object.keys(adjustment).forEach(key => {
        if (adjustment[key] != undefined){
          this[key] = adjustment[key]
        }
      });

    }

}

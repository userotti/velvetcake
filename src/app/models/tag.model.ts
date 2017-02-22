export class Tag {

    constructor(
        public $key:string,
        public description: string) {

    }

    static fromJsonList(array): Tag[] {
        return array.map(Tag.fromJson);
    }

    static fromJson({
        $key,
        description}):Tag {

        return new Tag($key,
        description);
    }

    public toStrippedJson():any {

      var stripped = {
        description: this.description,
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

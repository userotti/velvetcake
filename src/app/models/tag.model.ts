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

}

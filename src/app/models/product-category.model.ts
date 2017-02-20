export class ProductCategory {

    constructor(
        public $key:string,
        public description: string,
        public detail: string) {

    }

    static fromJsonList(array): ProductCategory[] {
        return array.map(ProductCategory.fromJson);
    }

    static fromJson({
        $key,
        description,
        detail}):ProductCategory {

        return new ProductCategory($key,
        description,
        detail);
    }

}

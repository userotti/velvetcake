export class Product {


    constructor(
        public $key:string,
        public description: string,
        public thumbnail_url: string,
        public detail: string,
        public diameter: number,
        public price: string,
        public product_category: string) {

    }



    static fromJsonList(array): Product[] {
        return array.map(Product.fromJson);
    }

    static fromJson({
        $key,
        description,
        thumbnail_url,
        detail,
        diameter,
        price,
        product_category}):Product {

        return new Product($key,
        description,
        thumbnail_url,
        detail,
        diameter,
        price,
        product_category);
    }




}

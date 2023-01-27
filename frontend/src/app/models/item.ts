export class Item{
    constructor(
        public productId:number,
        public quantity:number,
        public totalPerProduct:number,
        public cartId:number,
        public itemId?:number,
        public price?:number,
        public productName?:string
    ){}
}

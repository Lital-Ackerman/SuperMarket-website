export class Order{
    constructor(
      public userId?:number,
      public cartId?:number,
      public orderSum?:number,
      public shipCity?:string,
      public shipStreet?:string,
      public shipDate?:Date,
      public orderDate:Date=new Date(),
      public creditCard?:number,
      public payLastDigits?:number,
      // public isCompleted?:number,
      public orderId?:number,
      ){}
}

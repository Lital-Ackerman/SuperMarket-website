

class Cart{
    constructor(userId){
            this.userId= userId;
            this.cartDate= new Date();
            this.isCompleted= 0
    }  
}

module.exports= Cart;
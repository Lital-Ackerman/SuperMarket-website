const Joi= require("joi");

class Product{
    constructor(product){
        this.productName=product.productName;
        this.categoryId= product.categoryId;
        this.price= product.price;
        this.image= product.image;
        this.productId= product.productId;
    }

    static #validateSchema= Joi.object({
        productName: Joi.string().required().min(2).max(20),
        price: Joi.number().required().positive().min(1).max(10000),
        image: Joi.string().allow(),
        categoryId: Joi.number().integer().required().positive(),
        productId: Joi.number().integer().positive().allow()
    })

    validate(){
        const result= Product.#validateSchema.validate(this, {abortEarly: false});
        return result.error ? result.error.details.map(err => err.message) : null;

    }
}

    module.exports= Product;
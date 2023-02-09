export class Product{
    constructor(
        public productId?:number,
        public productName?:string,
        public categoryId?:number|string,
        public categoryName?:string,
        public price?:number,
        public image?:string,
        public imageFile?:FileList) { }

        static convertToFormData(product:Product) {
          const fd=new FormData();
          fd.append("productName", product.productName);
          fd.append("categoryId", product.categoryId.toString());
          fd.append("price", product.price.toString());
          if(product.productId) fd.append("productId", product.productId.toString());
          // fd.append("image", product.image);
          if (product.imageFile)
              fd.append("imageFile", product.imageFile.item(0));
          return fd;
      }
}

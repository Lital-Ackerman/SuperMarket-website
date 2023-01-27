const bll= require("../bll/users-logic");


class User{
    constructor(user){
            this.firstName=user.firstName;
            this.lastName= user.lastName;
            this.userId= user.userId;
            this.username= user.username;
            this.password= user.password;
            this.city= user.city;
            this.street= user.street;
            this.role= 0;
    }

     async validateDouble(){
        let isExist= await bll.getAlreadyRegister(this.username);
        if (isExist.length>0)
        return "Username is already exist";
        else return null
    
    }

    
    // validateCredentials(){
    //     const errors={};
    //     if(this.firstName && this.firstName.length<2)
    //     errors.firstName= "first Name should be >2";

    //     if(this.lastName && this.lastName.length<2)
    //     errors.lastName= "last Name should be >2";

    //     if(this.userName && this.userName.length<4)
    //     errors.userName= "UserName should be >3";

    //     if(this.password && this.password.length<6)
    //     errors.password= "Password Should be >5!";

    //     const errorsLength= Object.keys(errors).length
    //     if(errorsLength<=0) return null
    //     else return errors;
    // }
    
}

module.exports= User;
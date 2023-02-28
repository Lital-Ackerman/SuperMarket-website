class User{
    constructor(
        public firstName?:string,
        public lastName?:string,
        public userId?:number,
        public username?:string,
        public password?:string,
        public confirmPassword?:string,
        public city?:string,
        public street?:string,
        public role?:number,

    ){}


    /**
     *Validate that the first form is not empty
     * @returns {Boolean}
     */
    
    filledAllStep1(){
      if(
        (this.userId && this.userId>0) &&
        (this.username&& this.username.length>0) &&
        (this.password && this.password.length>0) &&
        (this.confirmPassword && this.confirmPassword.length>0)
      ) return true
      else return false
    }
}

export default User;

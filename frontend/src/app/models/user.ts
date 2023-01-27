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
}

export default User;

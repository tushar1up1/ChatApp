export class User{
    userName: string;
    password?: string;
    _id?:string;
    newMessage?:boolean = false;
    isTyping?:boolean = false;
    countMessage?:number = 0;
    color?:string;
}
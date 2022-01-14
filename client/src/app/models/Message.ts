export class Message
{
    _id?:string;
    fromId:string;
    toId:string;
    message?:string;
    date?:Date;
    timeStamp?:string;
    typing?:string;

    constructor(fromId:string,toId:string,message?:string,date?:Date)
    {
       this.fromId = fromId;
       this.toId = toId;
       this.message = message;
       this.date = date;
    }
}
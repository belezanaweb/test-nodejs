import { Message } from "./Message";

export class Process{

    private request;
    private response;

    constructor(request,response){
        this.request = request;
        this.response = response;
    }

    run(callbackSuccess: (body?) => Message){
        let message = null;
        if(this.request.body){
            message = callbackSuccess(this.request);
        }else{
            message = callbackSuccess();
        }
        this.response.statusCode = message.statusCode;
        this.response.send(message.payload);
    }
}
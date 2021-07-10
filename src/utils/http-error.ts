export class HttpError extends Error {

    message: string;
    status: number; 

    constructor(status: number, message: string){
        super();
        this.status = status;
        this.message = message;
    }

}

export class Message{
    public statusCode:number;
    public payload: any;

    setPayloadErrorMessage(error: Error){
        this.payload = error.message ;
    }
}
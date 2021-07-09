export class Logger {

    static info(message: string, args?: any[]){
        console.info(message, args);
    }

    static error(message: string, args?: any[]){
        console.error(message, args);
    }
}
interface Log {
    level: LogLevel;
    message: string;
    data?: string;
}

enum LogLevel {
    INFO = 'INFO',
    ERROR = 'ERROR'
}

export class Logger {

    static info(message: string, args?: any[]){
        const log: Log = {
            level: LogLevel.INFO,
            message, 
            data: JSON.stringify(args)
        }
        console.log(log);
    }

    static error(message: string, args?: any[]){
        const log: Log = {
            level: LogLevel.ERROR,
            message, 
            data: JSON.stringify(args)
        }
        console.log(log);
    }
}
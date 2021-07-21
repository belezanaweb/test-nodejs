import {
    createLogger,
    format,
    transports,
} from 'winston';

const logFormat = format.printf((log) => {
    const {
        level,
        message,
        metadata,
        timestamp,
    } = log;

    let result = `[${level}] ${timestamp}: ${message}`;

    if (metadata && Object.keys(metadata).length !== 0) {
        result += `\n${JSON.stringify(metadata, null, 2)}`;
    }

    return result;
});

export default createLogger({
    exitOnError: false,
    format: format.combine(
        format((info) => ({
            ...info,
            level: info.level.toUpperCase(),
        }))(),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss Z',
        }),
        format.metadata({
            fillExcept: [
                'level',
                'message',
                'timestamp',
            ],
        }),
    ),
    level: `${process.env.LOG_LEVEL || 'http'}`.toLowerCase(),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                logFormat,
            ),
        }),
    ],
});

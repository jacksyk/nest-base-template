import { LoggerService } from '@nestjs/common';
import * as chalk from 'chalk';
import * as dayjs from 'dayjs';
import { createLogger, format, Logger, transports } from 'winston';
import 'winston-daily-rotate-file';

export const optionObject: Record<string, any> = {
  level: 'debug',
  format: format.json(),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ context, level, message, time }) => {
          /**
           * message {
             context: 'RouterExplorer',
             time: '2024-05-02 18:44:13',
             level: '\x1B[32minfo\x1B[39m',
             message: 'Mapped {/user/:id, DELETE} route',
             [Symbol(level)]: 'info',
             [Symbol(splat)]: [ { context: 'RouterExplorer', time: '2024-05-02 18:44:13' } ],
             [Symbol(message)]: '{"context":"RouterExplorer","level":"info","message":"Mapped {/user/:id, DELETE} route","time":"2024-05-02 18:44:13"}'}
           *
           */
          const appStr = chalk.green(`[NEST]`);
          const contextStr = chalk.yellow(`[${context}]`);
          return `${appStr} ${time} ${level} ${contextStr} ${message} `;
        }),
      ),
    }),
    new transports.DailyRotateFile({
      level: 'debug',
      dirname: 'log',
      filename: '%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '1k',
    }),
  ],
};

export class MyLogger implements LoggerService {
  private logger: Logger;

  constructor(options) {
    this.logger = createLogger(options);
  }

  log(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    this.logger.log('info', message, { context, time });
  }

  error(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    this.logger.log('info', message, { context, time });
  }

  warn(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    this.logger.log('info', message, { context, time });
  }
}

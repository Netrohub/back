import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import pino from 'pino';

@Injectable()
export class LoggerService implements NestLoggerService {
  private logger: pino.Logger;

  constructor() {
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    this.logger = pino({
      level: process.env.LOG_LEVEL || (isDevelopment ? 'debug' : 'info'),
      transport: isDevelopment
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          }
        : undefined,
      formatters: {
        level: (label) => {
          return { level: label.toUpperCase() };
        },
      },
      redact: {
        paths: [
          'req.headers.authorization',
          'req.headers.cookie',
          'password',
          'token',
          'access_token',
          'refresh_token',
          'secret',
          'apiKey',
          'api_key',
        ],
        remove: true,
      },
    });
  }

  log(message: string, context?: string, meta?: any) {
    const logData: any = { msg: message, context };
    if (meta) {
      Object.assign(logData, meta);
    }
    this.logger.info(logData);
  }

  error(message: string, trace?: string, context?: string, meta?: any) {
    const logData: any = { msg: message, context, trace };
    if (meta) {
      Object.assign(logData, meta);
    }
    this.logger.error(logData);
  }

  warn(message: string, context?: string, meta?: any) {
    const logData: any = { msg: message, context };
    if (meta) {
      Object.assign(logData, meta);
    }
    this.logger.warn(logData);
  }

  debug(message: string, context?: string, meta?: any) {
    const logData: any = { msg: message, context };
    if (meta) {
      Object.assign(logData, meta);
    }
    this.logger.debug(logData);
  }

  verbose(message: string, context?: string, meta?: any) {
    const logData: any = { msg: message, context };
    if (meta) {
      Object.assign(logData, meta);
    }
    this.logger.trace(logData);
  }
}


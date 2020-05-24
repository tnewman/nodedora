import {AsyncLocalStorage} from 'async_hooks';
import Koa from 'koa';
import pino from 'pino';
import pinoHttp from 'pino-http';
import {v4 as uuidv4} from 'uuid';

const REQUEST_ID_HEADER = 'X-Request-ID';

const loggerStorage = new AsyncLocalStorage<pino.Logger>();

export function koaLogger() {
  return async (ctx: Koa.DefaultContext, next: () => Promise<any>) => {
    const requestId = ctx.get(REQUEST_ID_HEADER) || uuidv4();

    const logger = pino().child({
      requestId,
    });

    const httpLogger = pinoHttp({
        logger,
    });

    return loggerStorage.run(logger, async () => {
      await next();

      ctx.set(REQUEST_ID_HEADER, requestId);

      httpLogger(ctx.req, ctx.res);
    });
  };
}

export function logger(): pino.Logger {
  const logger = loggerStorage.getStore();

  if (!logger) {
    return pino().child({
      requestId: null,
    });
  }

  return logger;
}

export default logger;

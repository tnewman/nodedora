import Koa from 'koa';
import Router from 'koa-router';

import logger from './logger';

const app = new Koa();
const router = new Router();

router.get('/', (ctx): void => {
    ctx.body = { message: 'hello!' };
});

app
    .use(async (ctx, next): Promise<void> => {
        await next();
        logger.info({
            method: ctx.req.method,
            path: ctx.req.url,
            status: ctx.res.statusCode,
        });
    })
    .use(router.routes())
    .use(router.allowedMethods());

export default app;

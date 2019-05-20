import Koa from 'koa';

import logger from './logger';
import Router from './router';

export default class App extends Koa {
    constructor(router: Router) {
        super();
    
        this.use(async (ctx, next): Promise<void> => {
            await next();
            logger.info({
                method: ctx.req.method,
                path: ctx.req.url,
                status: ctx.res.statusCode,
            });
        });

        this.use(router.routes())
        this.use(router.allowedMethods());
    }
}

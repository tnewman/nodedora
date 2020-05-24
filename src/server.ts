import Koa from 'koa';
import {koaLogger, logger} from './logger';

const app = new Koa();

app.use(koaLogger());

app.use((ctx, next) => {
    logger().info('middleware');
    return next();
});

app.use((ctx) => {
    logger().info('test request');
    ctx.body = 'test';
});

app.listen(8000);

import KoaRouter from 'koa-router';
import Service from './service';


export default class Router extends KoaRouter {

    constructor(service: Service) {
        super();

        this.get('/stations', async (ctx) => {
            ctx.body = await service.listStations();
        });
    }
}

import { AppService } from './app.service';
import {App} from './configs/express';

const appService = new AppService();

export const AppRouters = () => {
    // gets
    App.get('/', (_, res) : any  => {
        return res.send(appService.helloword());
    });
}
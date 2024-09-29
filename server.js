import express from 'express';
import startServer from './libs/boot';
import injectRoutes from './routes';
import injectMiddlewares from './libs/middlewares';

const boot = require('./libs/boot');
const server = express();

injectMiddlewares(server);
injectRoutes(server);
startServer(server);

export default server;
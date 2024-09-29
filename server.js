import express from 'express';
import startServer from './libs/boot'; // Keep consistent ES6 imports
import injectRoutes from './routes';
import injectMiddlewares from './libs/middlewares';

const server = express();

injectMiddlewares(server);  // Inject middlewares (e.g., body parsers, logging)
injectRoutes(server);       // Inject application routes
startServer(server);        // Start the server

export default server;

// routes/index.js
import AppController from '../controllers/AppController.js'; // Ensure you use .js if your module is in ESM format

const injectRoutes = (api) => {
  api.get('/status', AppController.getStatus);
  api.get('/stats', AppController.getStats);
};

export default injectRoutes;

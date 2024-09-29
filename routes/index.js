// routes/index.js
import AppController from '../controllers/AppController.js';
import UsersController from '../controllers/UsersController.js'; // Import the UsersController

const injectRoutes = (api) => {
  api.get('/status', AppController.getStatus);
  api.get('/stats', AppController.getStats);

  // New POST /users endpoint
  api.post('/users', UsersController.postNew);
};

export default injectRoutes;

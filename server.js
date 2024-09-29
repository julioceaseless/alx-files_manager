// server.js
import express from 'express';
import injectRoutes from './routes/index.js'; // Ensure you use .js if your module is in ESM format

const app = express();
const PORT = process.env.PORT || 5000;

injectRoutes(app); // Load routes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

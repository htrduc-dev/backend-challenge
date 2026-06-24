
import express from 'express';
import taskRoutes from './routes/task.routes';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Crude Server API is running' });
});

app.use('/tasks', taskRoutes);

export default app;
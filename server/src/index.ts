import express from 'express';
import cors from 'cors';
import { TaskService } from './services/TaskService.js';
import { TaskController } from './controllers/TaskController.js';
import { buildTaskRoutes } from './routes/taskRoutes.js';
import { seedTasks } from './seed.js';

const app = express();
app.use(cors());
app.use(express.json());

const taskService = new TaskService(seedTasks);
const taskController = new TaskController(taskService);
app.use('/api/tasks', buildTaskRoutes(taskController));

app.get('/api/health', (_req, res) => res.json({ ok: true }));

const PORT = Number(process.env.PORT ?? 4000);
app.listen(PORT, () => {
	console.log(`API ready on http://localhost:${PORT}`);
});

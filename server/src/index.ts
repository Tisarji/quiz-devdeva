import express from 'express';
import cors from 'cors';
import { TaskService } from './q1-tasks/services/TaskService.js';
import { TaskController } from './q1-tasks/controllers/TaskController.js';
import { buildTaskRoutes } from './q1-tasks/routes/taskRoutes.js';
import { seedTasks } from './q1-tasks/seed.js';
import { MetricService } from './q2-metrics/services/MetricService.js';
import { MetricController } from './q2-metrics/controllers/MetricController.js';
import { buildMetricRoutes } from './q2-metrics/routes/metricRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

const taskService = new TaskService(seedTasks);
const taskController = new TaskController(taskService);
app.use('/api/tasks', buildTaskRoutes(taskController));

const metricService = new MetricService();
const metricController = new MetricController(metricService);
app.use('/api/metrics', buildMetricRoutes(metricController));

app.get('/api/health', (_req, res) => res.json({ ok: true }));

const PORT = Number(process.env.PORT ?? 4000);
app.listen(PORT, () => {
	console.log(`API ready on http://localhost:${PORT}`);
});

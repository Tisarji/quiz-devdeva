import { Router } from 'express';
import { MetricController } from '../controllers/MetricController.js';

export function buildMetricRoutes(controller: MetricController): Router {
	const router = Router();
	router.get('/daily', controller.daily);
	return router;
}

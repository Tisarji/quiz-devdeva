import { Request, Response } from 'express';
import { MetricService } from '../services/MetricService.js';

export class MetricController {
	constructor(private readonly service: MetricService) {}

	daily = (_req: Request, res: Response) => {
		res.json({ items: this.service.daily() });
	};
}

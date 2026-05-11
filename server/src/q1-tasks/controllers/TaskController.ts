import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService.js';
import { TaskPriority, TaskStatus } from '../models/Task.js';

export class TaskController {
	constructor(private readonly service: TaskService) {}

	list = (req: Request, res: Response) => {
		const result = this.service.list({
			search: (req.query.search as string) ?? '',
			priority: (req.query.priority as TaskPriority | 'All') ?? 'All',
			status: (req.query.status as TaskStatus | 'All') ?? 'All',
			page: req.query.page ? Number(req.query.page) : undefined,
			pageSize: req.query.pageSize ? Number(req.query.pageSize) : undefined,
		});
		res.json(result);
	};

	getOne = (req: Request, res: Response) => {
		const task = this.service.getById(req.params.id);
		if (!task) return res.status(404).json({ message: 'Task not found' });
		res.json(task);
	};

	create = (req: Request, res: Response) => {
		const created = this.service.create(req.body);
		res.status(201).json(created);
	};

	update = (req: Request, res: Response) => {
		const updated = this.service.update(req.params.id, req.body);
		if (!updated) return res.status(404).json({ message: 'Task not found' });
		res.json(updated);
	};

	remove = (req: Request, res: Response) => {
		const ok = this.service.remove(req.params.id);
		if (!ok) return res.status(404).json({ message: 'Task not found' });
		res.status(204).send();
	};
}

import { TaskPriority, TaskProps, TaskStatus } from '../models/Task';

export interface TaskQuery {
	search?: string;
	priority?: TaskPriority | 'All';
	status?: TaskStatus | 'All';
	page?: number;
	pageSize?: number;
}

export interface TaskListResult {
	items: TaskProps[];
	total: number;
	page: number;
	pageSize: number;
	totalPages: number;
}

export class TaskService {
	constructor(private readonly baseUrl: string = '/api/tasks') {}

	async list(query: TaskQuery = {}): Promise<TaskListResult> {
		const params = new URLSearchParams();
		if (query.search) params.set('search', query.search);
		if (query.priority) params.set('priority', query.priority);
		if (query.status) params.set('status', query.status);
		if (query.page) params.set('page', String(query.page));
		if (query.pageSize) params.set('pageSize', String(query.pageSize));

		const res = await fetch(`${this.baseUrl}?${params.toString()}`);
		if (!res.ok) throw new Error('Failed to load tasks');
		return res.json();
	}

	async create(input: Omit<TaskProps, 'id'>): Promise<TaskProps> {
		const res = await fetch(this.baseUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(input),
		});
		if (!res.ok) throw new Error('Failed to create task');
		return res.json();
	}

	async update(id: string, patch: Partial<TaskProps>): Promise<TaskProps> {
		const res = await fetch(`${this.baseUrl}/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(patch),
		});
		if (!res.ok) throw new Error('Failed to update task');
		return res.json();
	}
}

export const taskService = new TaskService();

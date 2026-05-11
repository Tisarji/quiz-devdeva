import { Task, TaskPriority, TaskProps, TaskStatus } from '../models/Task.js';

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
	private tasks: Task[] = [];

	constructor(seed: TaskProps[] = []) {
		this.tasks = seed.map((t) => new Task(t));
	}

	list(query: TaskQuery = {}): TaskListResult {
		const { search = '', priority = 'All', status = 'All' } = query;

		const keyword = search.trim().toLowerCase();
		const filtered = this.tasks.filter((t) => {
			const matchKeyword =
				!keyword ||
				t.title.toLowerCase().includes(keyword) ||
				t.priority.toLowerCase().includes(keyword) ||
				t.status.toLowerCase().includes(keyword) ||
				t.tag.toLowerCase().includes(keyword);
			const matchPriority = priority === 'All' || t.priority === priority;
			const matchStatus = status === 'All' || t.status === status;
			return matchKeyword && matchPriority && matchStatus;
		});

		const total = filtered.length;

		if (!query.pageSize) {
			return {
				items: filtered.map((t) => t.toJSON()),
				total,
				page: 1,
				pageSize: total,
				totalPages: 1,
			};
		}

		const pageSize = Math.max(1, query.pageSize);
		const page = Math.max(1, query.page ?? 1);
		const totalPages = Math.max(1, Math.ceil(total / pageSize));
		const safePage = Math.min(page, totalPages);
		const start = (safePage - 1) * pageSize;
		const items = filtered.slice(start, start + pageSize).map((t) => t.toJSON());

		return { items, total, page: safePage, pageSize, totalPages };
	}

	getById(id: string): TaskProps | null {
		const found = this.tasks.find((t) => t.id === id);
		return found ? found.toJSON() : null;
	}

	create(input: Omit<TaskProps, 'id'>): TaskProps {
		const task = new Task({ ...input, id: this.nextId() });
		this.tasks.unshift(task);
		return task.toJSON();
	}

	update(id: string, patch: Partial<TaskProps>): TaskProps | null {
		const found = this.tasks.find((t) => t.id === id);
		if (!found) return null;
		found.update(patch);
		return found.toJSON();
	}

	remove(id: string): boolean {
		const before = this.tasks.length;
		this.tasks = this.tasks.filter((t) => t.id !== id);
		return this.tasks.length < before;
	}

	private nextId(): string {
		return `t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
	}
}

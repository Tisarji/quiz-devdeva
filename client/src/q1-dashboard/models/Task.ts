export type TaskStatus = 'To Do' | 'In Progress' | 'Done';
export type TaskPriority = 'Low Priority' | 'Medium Priority' | 'High Priority';

export type StatusVariant = 'todo' | 'inProgress' | 'done';
export type PriorityVariant = 'low' | 'medium' | 'high';

export interface TaskProps {
	id: string;
	title: string;
	project: string;
	tag: string;
	priority: TaskPriority;
	status: TaskStatus;
	date: string;
	progress: number;
	assigneeAvatar: string;
}

export class Task {
	id: string;
	title: string;
	project: string;
	tag: string;
	priority: TaskPriority;
	status: TaskStatus;
	date: string;
	progress: number;
	assigneeAvatar: string;

	constructor(props: TaskProps) {
		this.id = props.id;
		this.title = props.title;
		this.project = props.project;
		this.tag = props.tag;
		this.priority = props.priority;
		this.status = props.status;
		this.date = props.date;
		this.progress = props.progress;
		this.assigneeAvatar = props.assigneeAvatar;
	}

	statusVariant(): StatusVariant {
		if (this.status === 'To Do') return 'todo';
		if (this.status === 'In Progress') return 'inProgress';
		return 'done';
	}

	priorityVariant(): PriorityVariant {
		if (this.priority === 'High Priority') return 'high';
		if (this.priority === 'Medium Priority') return 'medium';
		return 'low';
	}

	formatDate(): string {
		if (!this.date) return '';
		const d = new Date(this.date);
		if (Number.isNaN(d.getTime())) return this.date;
		return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}
}

export function todayIso(): string {
	return new Date().toISOString().slice(0, 10);
}

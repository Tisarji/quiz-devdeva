export type TaskStatus = 'To Do' | 'In Progress' | 'Done';
export type TaskPriority = 'Low Priority' | 'Medium Priority' | 'High Priority';

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

	update(patch: Partial<TaskProps>): void {
		Object.assign(this, patch);
	}

	toJSON(): TaskProps {
		return {
			id: this.id,
			title: this.title,
			project: this.project,
			tag: this.tag,
			priority: this.priority,
			status: this.status,
			date: this.date,
			progress: this.progress,
			assigneeAvatar: this.assigneeAvatar,
		};
	}
}

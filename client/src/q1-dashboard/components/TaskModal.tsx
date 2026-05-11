import { CloseOutlined } from '@ant-design/icons';
import { useEffect, useState, type ReactNode } from 'react';
import { Task, TaskPriority, TaskProps, TaskStatus, todayIso } from '../models/Task';
import * as S from '../styles/TaskModal.styles';

interface Props {
	task: Task | null;
	mode: 'view' | 'create';
	onClose: () => void;
	onSave: (data: Omit<TaskProps, 'id'> & { id?: string }) => void;
}

const emptyTemplate = (): Omit<TaskProps, 'id'> => ({
	title: '',
	project: 'Web App Redesign',
	tag: 'Feature',
	priority: 'Medium Priority',
	status: 'To Do',
	date: todayIso(),
	progress: 0,
	assigneeAvatar: 'https://i.pravatar.cc/64?img=15',
});

export default function TaskModal({ task, mode, onClose, onSave }: Props) {
	const [form, setForm] = useState<Omit<TaskProps, 'id'>>(emptyTemplate);

	useEffect(() => {
		if (task) {
			const { id: _id, ...rest } = task;
			setForm(rest);
		} else {
			setForm(emptyTemplate());
		}
	}, [task]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [onClose]);

	const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
		setForm((p) => ({ ...p, [k]: v }));

	const handleSave = () => onSave({ ...form, id: task?.id });

	return (
		<S.Overlay onClick={onClose}>
			<S.Dialog onClick={(e) => e.stopPropagation()}>
				<S.Header>
					<S.Title>{mode === 'create' ? 'New Task' : 'Task Detail'}</S.Title>
					<S.CloseButton onClick={onClose}>
						<CloseOutlined />
					</S.CloseButton>
				</S.Header>

				<S.Body>
					<Field label="Task">
						<S.Input
							value={form.title}
							onChange={(e) => set('title', e.target.value)}
							placeholder="Task title"
						/>
					</Field>

					<S.Row>
						<Field label="Tag">
							<S.Input
								value={form.tag}
								onChange={(e) => set('tag', e.target.value)}
							/>
						</Field>
						<Field label="Date">
							<S.Input
								type="date"
								value={form.date}
								onChange={(e) => set('date', e.target.value)}
							/>
						</Field>
					</S.Row>

					<S.Row>
						<Field label="Priority">
							<S.Select
								value={form.priority}
								onChange={(e) =>
									set('priority', e.target.value as TaskPriority)
								}
							>
								<option value="Low">Low</option>
								<option value="Medium Priority">Medium Priority</option>
								<option value="High Priority">High Priority</option>
							</S.Select>
						</Field>
						<Field label="Status">
							<S.Select
								value={form.status}
								onChange={(e) =>
									set('status', e.target.value as TaskStatus)
								}
							>
								<option value="To Do">To Do</option>
								<option value="In Progress">In Progress</option>
								<option value="Done">Done</option>
							</S.Select>
						</Field>
					</S.Row>

					<Field label="Progress">
						<S.ProgressRow>
							<S.Range
								type="range"
								min={0}
								max={100}
								step={1}
								value={form.progress}
								$progress={form.progress}
								onChange={(e) =>
									set('progress', Number(e.target.value))
								}
							/>
							<S.ProgressValue>{form.progress}%</S.ProgressValue>
						</S.ProgressRow>
					</Field>

					<Field label="Assignee Avatar URL">
						<S.AvatarRow>
							<S.AvatarPreview src={form.assigneeAvatar} alt="" />
							<S.Input
								value={form.assigneeAvatar}
								onChange={(e) => set('assigneeAvatar', e.target.value)}
							/>
						</S.AvatarRow>
					</Field>
				</S.Body>

				<S.Footer>
					<S.SecondaryButton onClick={onClose}>Close</S.SecondaryButton>
					<S.PrimaryButton onClick={handleSave} disabled={!form.title.trim()}>
						{mode === 'create' ? 'Save' : 'Update'}
					</S.PrimaryButton>
				</S.Footer>
			</S.Dialog>
		</S.Overlay>
	);
}

function Field({ label, children }: { label: string; children: ReactNode }) {
	return (
		<S.Field>
			<S.FieldLabel>{label}</S.FieldLabel>
			{children}
		</S.Field>
	);
}

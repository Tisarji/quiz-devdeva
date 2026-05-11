import { useDroppable } from '@dnd-kit/core';
import type { ReactNode } from 'react';
import type { StatusVariant, TaskStatus } from '../models/Task';
import { Task } from '../models/Task';
import * as S from '../styles/Board.styles';
import { SkeletonColumn } from './Skeleton';
import TaskCard from './TaskCard';

interface Props {
	tasks: Task[];
	loading: boolean;
	draggingId: string | null;
	onSelect: (t: Task) => void;
}

const columns: { key: TaskStatus; variant: StatusVariant; title: string }[] = [
	{ key: 'To Do', variant: 'todo', title: 'To Do' },
	{ key: 'In Progress', variant: 'inProgress', title: 'In Progress' },
	{ key: 'Done', variant: 'done', title: 'Done' },
];

export default function Board({ tasks, loading, draggingId, onSelect }: Props) {
	return (
		<S.Grid>
			{columns.map((col) => {
				const items = tasks.filter((t) => t.status === col.key);
				return (
					<DroppableColumn key={col.key} status={col.key} variant={col.variant}>
						<S.ColumnHeader>
							<S.ColumnTitle $variant={col.variant}>
								{col.title}
							</S.ColumnTitle>
							<S.Count>{items.length}</S.Count>
						</S.ColumnHeader>
						<S.ColumnList>
							{loading && <SkeletonColumn count={2} />}
							{!loading && items.length === 0 && (
								<S.Empty>Drop here</S.Empty>
							)}
							{!loading &&
								items.map((t) => (
									<TaskCard
										key={t.id}
										task={t}
										isDragging={t.id === draggingId}
										onClick={() => onSelect(t)}
									/>
								))}
						</S.ColumnList>
					</DroppableColumn>
				);
			})}
		</S.Grid>
	);
}

interface DroppableColumnProps {
	status: TaskStatus;
	variant: StatusVariant;
	children: ReactNode;
}

function DroppableColumn({ status, variant, children }: DroppableColumnProps) {
	const { setNodeRef, isOver } = useDroppable({ id: status });
	return (
		<S.Column ref={setNodeRef} $variant={variant} $isOver={isOver}>
			{children}
		</S.Column>
	);
}

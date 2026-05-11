import type { StatusVariant, TaskStatus } from '../models/Task';
import { Task } from '../models/Task';
import * as S from '../styles/components/Board.styles';
import { SkeletonColumn } from './Skeleton';
import TaskCard from './TaskCard';

interface Props {
	tasks: Task[];
	loading: boolean;
	onSelect: (t: Task) => void;
}

const columns: { key: TaskStatus; variant: StatusVariant; title: string }[] = [
	{ key: 'To Do', variant: 'todo', title: 'To Do' },
	{ key: 'In Progress', variant: 'inProgress', title: 'In Progress' },
	{ key: 'Done', variant: 'done', title: 'Done' },
];

export default function Board({ tasks, loading, onSelect }: Props) {
	return (
		<S.Grid>
			{columns.map((col) => {
				const items = tasks.filter((t) => t.status === col.key);
				return (
					<S.Column key={col.key} $variant={col.variant}>
						<S.ColumnHeader>
							<S.ColumnTitle $variant={col.variant}>
								{col.title}
							</S.ColumnTitle>
							<S.Count>{items.length}</S.Count>
						</S.ColumnHeader>
						<S.ColumnList>
							{loading && <SkeletonColumn count={2} />}
							{!loading && items.length === 0 && (
								<S.Empty>No tasks here</S.Empty>
							)}
							{!loading &&
								items.map((t) => (
									<TaskCard
										key={t.id}
										task={t}
										onClick={() => onSelect(t)}
									/>
								))}
						</S.ColumnList>
					</S.Column>
				);
			})}
		</S.Grid>
	);
}

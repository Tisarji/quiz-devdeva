import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../models/Task';
import * as S from '../styles/TaskCard.styles';

interface Props {
	task: Task;
	isDragging?: boolean;
	onClick: () => void;
}

export default function TaskCard({ task, isDragging, onClick }: Props) {
	const statusVariant = task.statusVariant();
	const priorityVariant = task.priorityVariant();

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		isDragging: isDraggingNow,
	} = useDraggable({ id: task.id });

	const style = {
		transform: CSS.Translate.toString(transform),
	};

	return (
		<S.Card
			ref={setNodeRef}
			style={style}
			$variant={statusVariant}
			$isDragging={isDragging || isDraggingNow}
			onClick={onClick}
			{...listeners}
			{...attributes}
		>
			<S.TopRow>
				<S.Tag>{task.tag}</S.Tag>
				<S.Dot />
				<S.PriorityText $variant={priorityVariant}>
					{task.priority}
				</S.PriorityText>
			</S.TopRow>

			<S.Title>{task.title}</S.Title>
			<S.Subtitle>{task.project}</S.Subtitle>

			<S.MetaRow>
				<span>{task.formatDate()}</span>
				<S.Dot />
				<S.StatusPill $variant={statusVariant}>{task.status}</S.StatusPill>
			</S.MetaRow>

			<S.Footer>
				<S.ProgressWrap>
					<S.ProgressLabel>
						<span>Progress</span>
						<span>{task.progress}%</span>
					</S.ProgressLabel>
					<S.ProgressTrack>
						<S.ProgressFill
							$progress={task.progress}
							$variant={statusVariant}
						/>
					</S.ProgressTrack>
				</S.ProgressWrap>
				<S.Avatar src={task.assigneeAvatar} alt="" />
			</S.Footer>
		</S.Card>
	);
}

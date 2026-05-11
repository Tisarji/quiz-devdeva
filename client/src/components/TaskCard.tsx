import { Task } from '../models/Task';
import * as S from '../styles/components/TaskCard.styles';

interface Props {
	task: Task;
	onClick: () => void;
}

export default function TaskCard({ task, onClick }: Props) {
	const statusVariant = task.statusVariant();
	const priorityVariant = task.priorityVariant();

	return (
		<S.Card onClick={onClick}>
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

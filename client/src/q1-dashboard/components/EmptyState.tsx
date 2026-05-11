import { InboxOutlined } from '@ant-design/icons';
import * as S from '../styles/EmptyState.styles';

interface Props {
	title?: string;
	hint?: string;
	onReset?: () => void;
}

export default function EmptyState({
	title = 'No tasks found',
	hint = 'Try changing filters or create a new task.',
	onReset,
}: Props) {
	return (
		<S.Wrap>
			<S.IconCircle>
				<InboxOutlined />
			</S.IconCircle>
			<S.Title>{title}</S.Title>
			<S.Hint>{hint}</S.Hint>
			{onReset && (
				<S.ResetButton onClick={onReset}>Clear all filters</S.ResetButton>
			)}
		</S.Wrap>
	);
}

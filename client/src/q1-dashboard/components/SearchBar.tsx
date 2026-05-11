import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { TaskPriority, TaskStatus } from '../models/Task';
import * as S from '../styles/SearchBar.styles';

interface Props {
	search: string;
	priority: TaskPriority | 'All';
	status: TaskStatus | 'All';
	total: number;
	onSearch: (v: string) => void;
	onPriority: (v: TaskPriority | 'All') => void;
	onStatus: (v: TaskStatus | 'All') => void;
	onClear: () => void;
}

export default function SearchBar({
	search,
	priority,
	status,
	total,
	onSearch,
	onPriority,
	onStatus,
	onClear,
}: Props) {
	const hasFilters = Boolean(search) || priority !== 'All' || status !== 'All';

	return (
		<S.Wrap>
			<S.Row>
				<S.InputWrap>
					<S.Input
						value={search}
						onChange={(e) => onSearch(e.target.value)}
						placeholder="Search tasks"
					/>
					<S.Icon>
						<SearchOutlined />
					</S.Icon>
					{search && (
						<S.ClearInputButton
							onClick={() => onSearch('')}
							aria-label="Clear search"
						>
							<CloseOutlined />
						</S.ClearInputButton>
					)}
				</S.InputWrap>

				<S.Select
					value={priority}
					onChange={(e) =>
						onPriority(e.target.value as TaskPriority | 'All')
					}
				>
					<option value="All">All Priorities</option>
					<option value="Low">Low</option>
					<option value="Medium Priority">Medium Priority</option>
					<option value="High Priority">High Priority</option>
				</S.Select>

				<S.Select
					value={status}
					onChange={(e) => onStatus(e.target.value as TaskStatus | 'All')}
				>
					<option value="All">All Statuses</option>
					<option value="To Do">To Do</option>
					<option value="In Progress">In Progress</option>
					<option value="Done">Done</option>
				</S.Select>

				{hasFilters && (
					<S.ClearAllButton onClick={onClear}>Clear</S.ClearAllButton>
				)}
			</S.Row>

			<S.ResultText>
				{total === 0
					? 'No matching tasks'
					: `${total} task${total === 1 ? '' : 's'}`}
			</S.ResultText>
		</S.Wrap>
	);
}

import { PlusOutlined } from '@ant-design/icons';
import {
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from '../../shared/hooks/useDebounce';
import { Task, TaskPriority, TaskProps, TaskStatus } from '../models/Task';
import { taskService } from '../services/TaskService';
import * as S from '../styles/Dashboard.styles';
import Board from './Board';
import EmptyState from './EmptyState';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';

const PAGE_SIZE = 6;
const COLUMN_STATUSES: TaskStatus[] = ['To Do', 'In Progress', 'Done'];

export default function Dashboard() {
	const [search, setSearch] = useState('');
	const [priority, setPriority] = useState<TaskPriority | 'All'>('All');
	const [status, setStatus] = useState<TaskStatus | 'All'>('All');
	const [page, setPage] = useState(1);
	const [allItems, setAllItems] = useState<TaskProps[]>([]);
	const [loading, setLoading] = useState(false);

	const [selected, setSelected] = useState<Task | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState<'view' | 'create'>('view');
	const [draggingId, setDraggingId] = useState<string | null>(null);

	const debouncedSearch = useDebounce(search, 250);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 6 },
		}),
	);

	useEffect(() => {
		let cancelled = false;
		setLoading(true);
		taskService
			.list({ search: debouncedSearch, priority, status })
			.then((res) => {
				if (cancelled) return;
				setAllItems(res.items);
			})
			.finally(() => !cancelled && setLoading(false));
		return () => {
			cancelled = true;
		};
	}, [debouncedSearch, priority, status]);

	useEffect(() => {
		setPage(1);
	}, [debouncedSearch, priority, status]);

	const total = allItems.length;
	const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

	useEffect(() => {
		if (page > totalPages) setPage(totalPages);
	}, [page, totalPages]);

	const pageItems = useMemo(() => {
		const start = (page - 1) * PAGE_SIZE;
		return allItems.slice(start, start + PAGE_SIZE);
	}, [allItems, page]);

	const tasks = useMemo(
		() => pageItems.map((p) => new Task(p)),
		[pageItems],
	);

	const draggingTask = useMemo(() => {
		if (!draggingId) return null;
		const found = allItems.find((t) => t.id === draggingId);
		return found ? new Task(found) : null;
	}, [allItems, draggingId]);

	const openTask = (t: Task) => {
		setSelected(t);
		setModalMode('view');
		setModalOpen(true);
	};

	const openCreate = () => {
		setSelected(null);
		setModalMode('create');
		setModalOpen(true);
	};

	const reload = async () => {
		const res = await taskService.list({
			search: debouncedSearch,
			priority,
			status,
		});
		setAllItems(res.items);
	};

	const handleSave = async (
		data: Omit<TaskProps, 'id'> & { id?: string },
	) => {
		const { id, ...rest } = data;
		if (id) await taskService.update(id, rest);
		else await taskService.create(rest);
		setModalOpen(false);
		await reload();
	};

	const handleClear = () => {
		setSearch('');
		setPriority('All');
		setStatus('All');
	};

	const handleDragStart = (event: DragStartEvent) => {
		setDraggingId(String(event.active.id));
	};

	const handleDragEnd = (event: DragEndEvent) => {
		setDraggingId(null);
		const { active, over } = event;
		if (!over) return;

		const taskId = String(active.id);
		const target = String(over.id) as TaskStatus;
		if (!COLUMN_STATUSES.includes(target)) return;

		const current = allItems.find((t) => t.id === taskId);
		if (!current || current.status === target) return;

		const previousStatus = current.status;
		const nextProgress = target === 'Done' ? 100 : current.progress;

		setAllItems((prev) =>
			prev.map((t) =>
				t.id === taskId
					? { ...t, status: target, progress: nextProgress }
					: t,
			),
		);

		taskService
			.update(taskId, { status: target, progress: nextProgress })
			.catch(() => {
				setAllItems((prev) =>
					prev.map((t) =>
						t.id === taskId
							? {
									...t,
									status: previousStatus,
									progress: current.progress,
								}
							: t,
					),
				);
			});
	};

	const isEmpty = !loading && total === 0;
	const hasFilters =
		Boolean(debouncedSearch) || priority !== 'All' || status !== 'All';

	return (
		<>
			<S.PageHeader>
				<S.PageTitleRow>
					<S.PageTitle>Dashboard</S.PageTitle>
					<S.PageCount>
						{total} task{total === 1 ? '' : 's'}
					</S.PageCount>
				</S.PageTitleRow>
				<S.NewButton onClick={openCreate}>
					<PlusOutlined />
					New Task
				</S.NewButton>
			</S.PageHeader>

			<SearchBar
				search={search}
				priority={priority}
				status={status}
				onSearch={setSearch}
				onPriority={setPriority}
				onStatus={setStatus}
				onClear={handleClear}
			/>

			{isEmpty ? (
				<EmptyState
					title={hasFilters ? 'No matching tasks' : 'No tasks yet'}
					hint={
						hasFilters
							? 'Try adjusting your filters or clear them all.'
							: 'Create your first task to get started.'
					}
					onReset={hasFilters ? handleClear : undefined}
				/>
			) : (
				<DndContext
					sensors={sensors}
					onDragStart={handleDragStart}
					onDragEnd={handleDragEnd}
					onDragCancel={() => setDraggingId(null)}
				>
					<Board
						tasks={tasks}
						loading={loading}
						draggingId={draggingId}
						onSelect={openTask}
					/>
					<DragOverlay dropAnimation={null}>
						{draggingTask && (
							<TaskCard task={draggingTask} onClick={() => {}} />
						)}
					</DragOverlay>
				</DndContext>
			)}

			{totalPages > 1 && (
				<Pagination
					page={page}
					totalPages={totalPages}
					onChange={setPage}
				/>
			)}

			{modalOpen && (
				<TaskModal
					task={selected}
					mode={modalMode}
					onClose={() => setModalOpen(false)}
					onSave={handleSave}
				/>
			)}
		</>
	);
}

import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import Board from './components/Board';
import EmptyState from './components/EmptyState';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';
import Sidebar from './components/Sidebar';
import TaskModal from './components/TaskModal';
import Topbar from './components/Topbar';
import { useDebounce } from './hooks/useDebounce';
import { Task, TaskPriority, TaskProps, TaskStatus } from './models/Task';
import { taskService } from './services/TaskService';
import * as S from './styles/App.styles';

const PAGE_SIZE = 6;

export default function App() {
	const [collapsed, setCollapsed] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [globalSearch, setGlobalSearch] = useState('');
	const [search, setSearch] = useState('');
	const [priority, setPriority] = useState<TaskPriority | 'All'>('All');
	const [status, setStatus] = useState<TaskStatus | 'All'>('All');
	const [page, setPage] = useState(1);
	const [allItems, setAllItems] = useState<TaskProps[]>([]);
	const [loading, setLoading] = useState(false);

	const [selected, setSelected] = useState<Task | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState<'view' | 'create'>('view');

	const rawSearch = search || globalSearch;
	const debouncedSearch = useDebounce(rawSearch, 250);

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
		setGlobalSearch('');
		setPriority('All');
		setStatus('All');
	};

	const isEmpty = !loading && total === 0;
	const hasFilters =
		Boolean(debouncedSearch) || priority !== 'All' || status !== 'All';

	return (
		<S.Layout>
			<Sidebar
				collapsed={collapsed}
				mobileOpen={mobileOpen}
				onToggle={() => setCollapsed((v) => !v)}
				onMobileClose={() => setMobileOpen(false)}
			/>

			<S.Body>
				<Topbar
					value={globalSearch}
					onChange={setGlobalSearch}
					onOpenSidebar={() => setMobileOpen(true)}
				/>

				<S.Main>
					<S.PageHeader>
						<S.PageTitleWrap>
							<S.PageTitle>Dashboard</S.PageTitle>
						</S.PageTitleWrap>
						<S.NewButton onClick={openCreate}>
							<PlusOutlined />
							New Task
						</S.NewButton>
					</S.PageHeader>

					<SearchBar
						search={search}
						priority={priority}
						status={status}
						total={total}
						onSearch={setSearch}
						onPriority={setPriority}
						onStatus={setStatus}
						onClear={handleClear}
					/>

					{isEmpty ? (
						<EmptyState
							title={
								hasFilters ? 'No matching tasks' : 'No tasks yet'
							}
							hint={
								hasFilters
									? 'Try adjusting your filters or clear them all.'
									: 'Create your first task to get started.'
							}
							onReset={hasFilters ? handleClear : undefined}
						/>
					) : (
						<Board
							tasks={tasks}
							loading={loading}
							onSelect={openTask}
						/>
					)}

					{totalPages > 1 && (
						<Pagination
							page={page}
							totalPages={totalPages}
							onChange={setPage}
						/>
					)}
				</S.Main>
			</S.Body>

			{modalOpen && (
				<TaskModal
					task={selected}
					mode={modalMode}
					onClose={() => setModalOpen(false)}
					onSave={handleSave}
				/>
			)}
		</S.Layout>
	);
}

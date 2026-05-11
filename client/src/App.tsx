import { useState } from 'react';
import Dashboard from './q1-dashboard/components/Dashboard';
import DailyGraph from './q2-graph/components/DailyGraph';
import Sidebar, { type View } from './shared/components/Sidebar';
import Topbar from './shared/components/Topbar';
import * as S from './styles/App.styles';

const PAGE_TITLE: Record<View, string> = {
	dashboard: 'Dashboard',
	graph: 'Daily Graph',
};

export default function App() {
	const [view, setView] = useState<View>('dashboard');
	const [collapsed, setCollapsed] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [globalSearch, setGlobalSearch] = useState('');

	return (
		<S.Layout>
			<Sidebar
				view={view}
				collapsed={collapsed}
				mobileOpen={mobileOpen}
				onSelectView={setView}
				onToggle={() => setCollapsed((v) => !v)}
				onMobileClose={() => setMobileOpen(false)}
			/>

			<S.Body>
				<Topbar
					title={PAGE_TITLE[view]}
					value={globalSearch}
					onChange={setGlobalSearch}
					onOpenSidebar={() => setMobileOpen(true)}
				/>

				<S.Main>
					{view === 'dashboard' ? <Dashboard /> : <DailyGraph />}
				</S.Main>
			</S.Body>
		</S.Layout>
	);
}

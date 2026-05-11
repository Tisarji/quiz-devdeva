import {
	AppstoreOutlined,
	CheckSquareOutlined,
	LineChartOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	SettingOutlined,
	TeamOutlined,
} from '@ant-design/icons';
import type { ReactNode } from 'react';
import * as S from '../styles/Sidebar.styles';

export type View = 'dashboard' | 'graph';

interface Props {
	view: View;
	collapsed: boolean;
	mobileOpen: boolean;
	onSelectView: (v: View) => void;
	onToggle: () => void;
	onMobileClose: () => void;
}

interface MenuEntry {
	key: View | string;
	icon: ReactNode;
	label: string;
	view?: View;
}

const menus: MenuEntry[] = [
	{ key: 'dashboard', icon: <AppstoreOutlined />, label: 'Dashboard', view: 'dashboard' },
	{ key: 'graph', icon: <LineChartOutlined />, label: 'Daily Graph', view: 'graph' },
	{ key: 'tasks', icon: <CheckSquareOutlined />, label: 'My Tasks' },
	{ key: 'team', icon: <TeamOutlined />, label: 'Team' },
	{ key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
];

export default function Sidebar({
	view,
	collapsed,
	mobileOpen,
	onSelectView,
	onToggle,
	onMobileClose,
}: Props) {
	const handleClick = (m: MenuEntry) => {
		if (m.view) {
			onSelectView(m.view);
			onMobileClose();
		}
	};

	return (
		<>
			<S.Backdrop $visible={mobileOpen} onClick={onMobileClose} />
			<S.Aside $collapsed={collapsed} $mobileOpen={mobileOpen}>
				<S.Header>
					{!collapsed && (
						<S.Brand>
							<S.BrandLogo>T</S.BrandLogo>
							<S.BrandName>TaskFlow</S.BrandName>
						</S.Brand>
					)}
					<S.ToggleButton
						onClick={onToggle}
						title={collapsed ? 'Expand' : 'Collapse'}
					>
						{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
					</S.ToggleButton>
				</S.Header>

				<S.Nav>
					{menus.map((m) => (
						<S.NavItem
							key={m.key}
							$active={m.view === view}
							onClick={() => handleClick(m)}
						>
							<S.NavIcon>{m.icon}</S.NavIcon>
							{!collapsed && <span>{m.label}</span>}
						</S.NavItem>
					))}
				</S.Nav>
			</S.Aside>
		</>
	);
}

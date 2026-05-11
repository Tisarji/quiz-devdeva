import {
	AppstoreOutlined,
	CheckSquareOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	SettingOutlined,
	TeamOutlined,
} from '@ant-design/icons';
import type { ReactNode } from 'react';
import * as S from '../styles/components/Sidebar.styles';

interface Props {
	collapsed: boolean;
	mobileOpen: boolean;
	onToggle: () => void;
	onMobileClose: () => void;
}

const menus: { icon: ReactNode; label: string; active: boolean }[] = [
	{ icon: <AppstoreOutlined />, label: 'Dashboard', active: true },
	{ icon: <CheckSquareOutlined />, label: 'My Tasks', active: false },
	{ icon: <TeamOutlined />, label: 'Team', active: false },
	{ icon: <SettingOutlined />, label: 'Settings', active: false },
];

export default function Sidebar({
	collapsed,
	mobileOpen,
	onToggle,
	onMobileClose,
}: Props) {
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
						<S.NavItem key={m.label} $active={m.active}>
							<S.NavIcon>{m.icon}</S.NavIcon>
							{!collapsed && <span>{m.label}</span>}
						</S.NavItem>
					))}
				</S.Nav>
			</S.Aside>
		</>
	);
}

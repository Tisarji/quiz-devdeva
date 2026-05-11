import { BellOutlined, MenuOutlined, SearchOutlined } from '@ant-design/icons';
import * as S from '../styles/Topbar.styles';

interface Props {
	title: string;
	value: string;
	onChange: (v: string) => void;
	onOpenSidebar: () => void;
}

export default function Topbar({ title, value, onChange, onOpenSidebar }: Props) {
	return (
		<S.Header>
			<S.Left>
				<S.HamburgerButton onClick={onOpenSidebar} aria-label="Open menu">
					<MenuOutlined />
				</S.HamburgerButton>
				<S.Title>{title}</S.Title>
			</S.Left>
			<S.Right>
				<S.SearchWrap>
					<S.SearchInput
						value={value}
						onChange={(e) => onChange(e.target.value)}
						placeholder="Search"
					/>
					<S.SearchIcon>
						<SearchOutlined />
					</S.SearchIcon>
				</S.SearchWrap>
				<S.IconButton aria-label="Notifications">
					<BellOutlined />
				</S.IconButton>
				<S.Avatar>AD</S.Avatar>
			</S.Right>
		</S.Header>
	);
}

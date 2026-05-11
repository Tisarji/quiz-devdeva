import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import * as S from '../styles/Pagination.styles';

interface Props {
	page: number;
	totalPages: number;
	onChange: (p: number) => void;
}

export default function Pagination({ page, totalPages, onChange }: Props) {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
	const prev = () => onChange(Math.max(1, page - 1));
	const next = () => onChange(Math.min(totalPages, page + 1));

	return (
		<S.Wrap>
			<S.ArrowButton onClick={prev} disabled={page === 1}>
				<LeftOutlined />
			</S.ArrowButton>
			{pages.map((p) => (
				<S.PageButton
					key={p}
					$active={p === page}
					onClick={() => onChange(p)}
				>
					{p}
				</S.PageButton>
			))}
			<S.ArrowButton onClick={next} disabled={page === totalPages}>
				<RightOutlined />
			</S.ArrowButton>
		</S.Wrap>
	);
}

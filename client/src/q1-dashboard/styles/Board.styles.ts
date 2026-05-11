import styled from 'styled-components';
import type { StatusVariant } from '../models/Task';

export const Grid = styled.div`
	display: grid;
	gap: 8px;
	grid-template-columns: 1fr;

	@media (min-width: ${({ theme }) => theme.breakpoint.sm}) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (min-width: ${({ theme }) => theme.breakpoint.lg}) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

export const Column = styled.div<{ $variant: StatusVariant; $isOver?: boolean }>`
	display: flex;
	flex-direction: column;
	background: ${({ theme }) => theme.color.surfaceMuted};
	border: 1px solid ${({ theme }) => theme.color.border};
	border-radius: 6px;
	overflow: hidden;
	min-height: 220px;
	transition:
		border-color ${({ theme }) => theme.transition.fast},
		background ${({ theme }) => theme.transition.fast};

	${({ $isOver, theme, $variant }) =>
		$isOver &&
		`
		border-color: ${theme.color[$variant].bar};
		background: ${theme.color[$variant].bg};
	`}
`;

export const ColumnHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px 12px;
	background: ${({ theme }) => theme.color.surface};
	border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

export const ColumnTitle = styled.div<{ $variant: StatusVariant }>`
	display: inline-flex;
	align-items: center;
	gap: 8px;
	font-size: 11px;
	font-weight: 600;
	color: ${({ theme }) => theme.color.textMuted};
	text-transform: uppercase;
	letter-spacing: 0.06em;

	&::before {
		content: '';
		width: 8px;
		height: 8px;
		border-radius: 2px;
		background: ${({ theme, $variant }) => theme.color[$variant].bar};
	}
`;

export const Count = styled.span`
	font-size: 11px;
	font-weight: 600;
	color: ${({ theme }) => theme.color.textMuted};
	background: ${({ theme }) => theme.color.surfaceMuted};
	padding: 2px 8px;
	border-radius: 4px;
	font-variant-numeric: tabular-nums;
`;

export const ColumnList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 6px;
	padding: 8px;
	flex: 1;
`;

export const Empty = styled.div`
	text-align: center;
	font-size: 11px;
	color: ${({ theme }) => theme.color.textSubtle};
	padding: 24px 8px;
	border: 1px dashed ${({ theme }) => theme.color.border};
	border-radius: 4px;
`;

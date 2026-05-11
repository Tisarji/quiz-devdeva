import styled from 'styled-components';
import type { StatusVariant } from '../models/Task';

export const Grid = styled.div`
	display: grid;
	gap: 20px;
	grid-template-columns: 1fr;

	@media (min-width: ${({ theme }) => theme.breakpoint.sm}) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (min-width: ${({ theme }) => theme.breakpoint.lg}) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

export const Column = styled.div<{ $variant: StatusVariant }>`
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 14px;
	border-radius: ${({ theme }) => theme.radius.lg};
	background: ${({ theme, $variant }) => theme.color[$variant].columnBg};
`;

export const ColumnHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 2px 4px;
`;

export const ColumnTitle = styled.div<{ $variant: StatusVariant }>`
	display: inline-flex;
	align-items: center;
	gap: 8px;
	font-size: 13px;
	font-weight: 600;
	color: ${({ theme }) => theme.color.text};
	letter-spacing: -0.01em;

	&::before {
		content: '';
		width: 6px;
		height: 6px;
		border-radius: 9999px;
		background: ${({ theme, $variant }) => theme.color[$variant].bar};
	}
`;

export const Count = styled.span`
	font-size: 12px;
	font-weight: 500;
	color: ${({ theme }) => theme.color.textSubtle};
`;

export const ColumnList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const Empty = styled.div`
	text-align: center;
	font-size: 12px;
	color: ${({ theme }) => theme.color.textSubtle};
	padding: 24px 8px;
`;

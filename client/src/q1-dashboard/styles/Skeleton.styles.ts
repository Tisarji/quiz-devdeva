import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
	0% { background-position: -400px 0; }
	100% { background-position: 400px 0; }
`;

export const Block = styled.div<{ $h?: number; $w?: string; $r?: string }>`
	height: ${({ $h }) => `${$h ?? 12}px`};
	width: ${({ $w }) => $w ?? '100%'};
	border-radius: ${({ $r, theme }) => $r ?? theme.radius.sm};
	background: linear-gradient(
		90deg,
		${({ theme }) => theme.color.surfaceMuted} 0%,
		${({ theme }) => theme.color.border} 50%,
		${({ theme }) => theme.color.surfaceMuted} 100%
	);
	background-size: 800px 100%;
	animation: ${shimmer} 1.4s infinite linear;
`;

export const Card = styled.div`
	background: ${({ theme }) => theme.color.surface};
	border: 1px solid ${({ theme }) => theme.color.border};
	border-radius: ${({ theme }) => theme.radius.lg};
	padding: 12px;
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

import styled, { keyframes } from 'styled-components';
import type { PriorityVariant, StatusVariant } from '../models/Task';

const fadeUp = keyframes`
	from { opacity: 0; transform: translateY(4px); }
	to   { opacity: 1; transform: translateY(0); }
`;

export const Card = styled.div<{
	$isDragging?: boolean;
	$variant: StatusVariant;
}>`
	position: relative;
	width: 100%;
	text-align: left;
	background: ${({ theme }) => theme.color.surface};
	border: 1px solid ${({ theme }) => theme.color.border};
	border-left: 3px solid
		${({ theme, $variant }) => theme.color[$variant].bar};
	border-radius: 4px;
	padding: 10px 12px;
	cursor: grab;
	user-select: none;
	touch-action: none;
	animation: ${fadeUp} 0.2s ease both;
	transition:
		border-color ${({ theme }) => theme.transition.fast},
		box-shadow ${({ theme }) => theme.transition.fast},
		opacity ${({ theme }) => theme.transition.fast};

	&:hover {
		border-color: ${({ theme }) => theme.color.borderStrong};
		border-left-color: ${({ theme, $variant }) =>
			theme.color[$variant].bar};
		box-shadow: ${({ theme }) => theme.shadow.sm};
	}

	&:active {
		cursor: grabbing;
	}

	${({ $isDragging, theme }) =>
		$isDragging &&
		`
		opacity: 0.35;
		box-shadow: ${theme.shadow.md};
	`}
`;

export const TopRow = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;
	margin-bottom: 6px;
`;

export const Tag = styled.span`
	font-size: 10px;
	font-weight: 600;
	color: ${({ theme }) => theme.color.textSubtle};
	text-transform: uppercase;
	letter-spacing: 0.06em;
`;

export const Dot = styled.span`
	width: 3px;
	height: 3px;
	border-radius: 9999px;
	background: ${({ theme }) => theme.color.textSubtle};
`;

export const PriorityText = styled.span<{ $variant: PriorityVariant }>`
	font-size: 10px;
	font-weight: 600;
	color: ${({ theme, $variant }) => theme.color[$variant].text};
	text-transform: uppercase;
	letter-spacing: 0.06em;
`;

export const Title = styled.div`
	font-size: 13px;
	font-weight: 600;
	color: ${({ theme }) => theme.color.text};
	line-height: 1.35;
	letter-spacing: -0.01em;
	margin-bottom: 2px;
`;

export const Subtitle = styled.div`
	font-size: 11px;
	color: ${({ theme }) => theme.color.textMuted};
	margin-bottom: 8px;
`;

export const MetaRow = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;
	font-size: 11px;
	color: ${({ theme }) => theme.color.textMuted};
	margin-bottom: 8px;
`;

export const StatusPill = styled.span<{ $variant: StatusVariant }>`
	display: inline-flex;
	align-items: center;
	gap: 4px;
	padding: 1px 6px;
	border-radius: 3px;
	font-size: 10px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.04em;
	background: ${({ theme, $variant }) => theme.color[$variant].bg};
	color: ${({ theme, $variant }) => theme.color[$variant].text};

	&::before {
		content: '';
		width: 4px;
		height: 4px;
		border-radius: 9999px;
		background: ${({ theme, $variant }) => theme.color[$variant].bar};
	}
`;

export const Footer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 10px;
`;

export const ProgressWrap = styled.div`
	flex: 1;
`;

export const ProgressLabel = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: 10px;
	color: ${({ theme }) => theme.color.textMuted};
	margin-bottom: 3px;
	font-variant-numeric: tabular-nums;
`;

export const ProgressTrack = styled.div`
	height: 3px;
	background: ${({ theme }) => theme.color.surfaceMuted};
	border-radius: 2px;
	overflow: hidden;
`;

export const ProgressFill = styled.div<{
	$progress: number;
	$variant: StatusVariant;
}>`
	height: 100%;
	width: ${({ $progress }) => `${$progress}%`};
	background: ${({ theme, $variant }) => theme.color[$variant].bar};
	border-radius: 2px;
	transition: width ${({ theme }) => theme.transition.base};
`;

export const Avatar = styled.img`
	width: 22px;
	height: 22px;
	border-radius: 9999px;
`;

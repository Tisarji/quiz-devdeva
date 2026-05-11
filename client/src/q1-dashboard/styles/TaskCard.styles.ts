import styled, { keyframes } from 'styled-components';
import type { PriorityVariant, StatusVariant } from '../models/Task';

const fadeUp = keyframes`
	from { opacity: 0; transform: translateY(4px); }
	to   { opacity: 1; transform: translateY(0); }
`;

export const Card = styled.button`
	width: 100%;
	text-align: left;
	background: ${({ theme }) => theme.color.surface};
	border: 1px solid ${({ theme }) => theme.color.border};
	border-radius: ${({ theme }) => theme.radius.lg};
	padding: 14px;
	cursor: pointer;
	animation: ${fadeUp} 0.25s ease both;
	transition:
		border-color ${({ theme }) => theme.transition.fast},
		transform ${({ theme }) => theme.transition.fast};

	&:hover {
		border-color: ${({ theme }) => theme.color.borderStrong};
	}

	&:active {
		transform: scale(0.995);
	}
`;

export const TopRow = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;
	margin-bottom: 8px;
`;

export const Tag = styled.span`
	font-size: 11px;
	font-weight: 500;
	color: ${({ theme }) => theme.color.textSubtle};
	text-transform: uppercase;
	letter-spacing: 0.04em;
`;

export const Dot = styled.span`
	width: 3px;
	height: 3px;
	border-radius: 9999px;
	background: ${({ theme }) => theme.color.textSubtle};
`;

export const PriorityText = styled.span<{ $variant: PriorityVariant }>`
	font-size: 11px;
	font-weight: 500;
	color: ${({ theme, $variant }) => theme.color[$variant].text};
	text-transform: uppercase;
	letter-spacing: 0.04em;
`;

export const Title = styled.div`
	font-size: 14px;
	font-weight: 600;
	color: ${({ theme }) => theme.color.text};
	line-height: 1.4;
	letter-spacing: -0.01em;
	margin-bottom: 2px;
`;

export const Subtitle = styled.div`
	font-size: 12px;
	color: ${({ theme }) => theme.color.textMuted};
	margin-bottom: 12px;
`;

export const MetaRow = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	font-size: 12px;
	color: ${({ theme }) => theme.color.textMuted};
	margin-bottom: 12px;
`;

export const StatusPill = styled.span<{ $variant: StatusVariant }>`
	display: inline-flex;
	align-items: center;
	gap: 5px;
	padding: 3px 9px;
	border-radius: 9999px;
	font-size: 11px;
	font-weight: 600;
	background: ${({ theme, $variant }) => theme.color[$variant].bg};
	color: ${({ theme, $variant }) => theme.color[$variant].text};

	&::before {
		content: '';
		width: 5px;
		height: 5px;
		border-radius: 9999px;
		background: ${({ theme, $variant }) => theme.color[$variant].bar};
	}
`;

export const Footer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
`;

export const ProgressWrap = styled.div`
	flex: 1;
`;

export const ProgressLabel = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: 11px;
	color: ${({ theme }) => theme.color.textMuted};
	margin-bottom: 4px;
	font-variant-numeric: tabular-nums;
`;

export const ProgressTrack = styled.div`
	height: 4px;
	background: ${({ theme }) => theme.color.surfaceMuted};
	border-radius: ${({ theme }) => theme.radius.full};
	overflow: hidden;
`;

export const ProgressFill = styled.div<{
	$progress: number;
	$variant: StatusVariant;
}>`
	height: 100%;
	width: ${({ $progress }) => `${$progress}%`};
	background: ${({ theme, $variant }) => theme.color[$variant].bar};
	border-radius: ${({ theme }) => theme.radius.full};
	transition: width ${({ theme }) => theme.transition.base};
`;

export const Avatar = styled.img`
	width: 24px;
	height: 24px;
	border-radius: ${({ theme }) => theme.radius.full};
`;

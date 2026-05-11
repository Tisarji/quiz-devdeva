import styled from 'styled-components';

export const Header = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	margin-bottom: 24px;
`;

export const Title = styled.h1`
	margin: 0;
	font-size: 26px;
	font-weight: 700;
	color: ${({ theme }) => theme.color.text};
	letter-spacing: -0.025em;
`;

export const Actions = styled.div`
	display: inline-flex;
	align-items: center;
	gap: 8px;
`;

export const RefreshButton = styled.button`
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 8px 14px;
	border-radius: ${({ theme }) => theme.radius.full};
	background: ${({ theme }) => theme.color.surface};
	border: 1px solid ${({ theme }) => theme.color.border};
	color: ${({ theme }) => theme.color.text};
	font-size: 13px;
	font-weight: 500;
	transition:
		background ${({ theme }) => theme.transition.fast},
		transform ${({ theme }) => theme.transition.fast};

	&:hover {
		background: ${({ theme }) => theme.color.surfaceMuted};
	}

	&:active {
		transform: scale(0.97);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

export const ExportButton = styled.button`
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 8px 16px;
	border-radius: ${({ theme }) => theme.radius.full};
	background: ${({ theme }) => theme.color.text};
	color: white;
	font-size: 13px;
	font-weight: 500;
	transition:
		opacity ${({ theme }) => theme.transition.fast},
		transform ${({ theme }) => theme.transition.fast};

	&:hover {
		opacity: 0.85;
	}

	&:active {
		transform: scale(0.97);
	}

	&:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
`;

export const Card = styled.div`
	background: ${({ theme }) => theme.color.surface};
	border: 1px solid ${({ theme }) => theme.color.border};
	border-radius: ${({ theme }) => theme.radius.xl};
	box-shadow: ${({ theme }) => theme.shadow.sm};
	padding: 24px 20px 16px;

	@media (min-width: ${({ theme }) => theme.breakpoint.md}) {
		padding: 28px 28px 20px;
	}
`;

export const ScaleBar = styled.div`
	display: flex;
	gap: 24px;
	margin-bottom: 12px;
	padding-bottom: 12px;
	border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

export const ScaleItem = styled.div<{ $color: string }>`
	display: flex;
	align-items: baseline;
	gap: 8px;

	&::before {
		content: '';
		width: 8px;
		height: 8px;
		border-radius: 9999px;
		background: ${({ $color }) => $color};
		align-self: center;
	}
`;

export const ScaleName = styled.span`
	font-size: 12px;
	font-weight: 500;
	color: ${({ theme }) => theme.color.text};
`;

export const ScaleRange = styled.span`
	font-size: 11px;
	color: ${({ theme }) => theme.color.textSubtle};
	font-variant-numeric: tabular-nums;
`;

export const ChartWrap = styled.div`
	width: 100%;
	height: 380px;

	@media (min-width: ${({ theme }) => theme.breakpoint.md}) {
		height: 460px;
	}
`;

export const TooltipBox = styled.div`
	background: ${({ theme }) => theme.color.surface};
	border: 1px solid ${({ theme }) => theme.color.border};
	border-radius: ${({ theme }) => theme.radius.md};
	box-shadow: ${({ theme }) => theme.shadow.md};
	padding: 10px 12px;
	font-size: 12px;
	min-width: 140px;
`;

export const TooltipTime = styled.div`
	font-weight: 600;
	color: ${({ theme }) => theme.color.text};
	margin-bottom: 6px;
	padding-bottom: 6px;
	border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

export const TooltipRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	padding: 2px 0;
`;

export const TooltipLabel = styled.span<{ $color: string }>`
	display: inline-flex;
	align-items: center;
	gap: 6px;
	color: ${({ theme }) => theme.color.textMuted};

	&::before {
		content: '';
		width: 8px;
		height: 8px;
		border-radius: 9999px;
		background: ${({ $color }) => $color};
	}
`;

export const TooltipValue = styled.span`
	font-weight: 600;
	color: ${({ theme }) => theme.color.text};
	font-variant-numeric: tabular-nums;
`;

export const LoadingText = styled.div`
	text-align: center;
	padding: 80px 16px;
	color: ${({ theme }) => theme.color.textSubtle};
	font-size: 13px;
`;

import styled, { keyframes } from 'styled-components';

const overlayIn = keyframes`
	from { opacity: 0; }
	to   { opacity: 1; }
`;

const dialogIn = keyframes`
	from { opacity: 0; transform: translateY(8px) scale(0.98); }
	to   { opacity: 1; transform: translateY(0) scale(1); }
`;

export const Overlay = styled.div`
	position: fixed;
	inset: 0;
	z-index: 60;
	background: rgba(0, 0, 0, 0.4);
	backdrop-filter: blur(8px);
	-webkit-backdrop-filter: blur(8px);
	display: grid;
	place-items: center;
	padding: 16px;
	animation: ${overlayIn} 0.2s ease both;
`;

export const Dialog = styled.div`
	background: ${({ theme }) => theme.color.surface};
	width: 100%;
	max-width: 480px;
	max-height: calc(100vh - 32px);
	overflow-y: auto;
	border-radius: ${({ theme }) => theme.radius.xl};
	box-shadow: ${({ theme }) => theme.shadow.lg};
	padding: 24px;
	animation: ${dialogIn} 0.22s ease both;
`;

export const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;
`;

export const Title = styled.h3`
	margin: 0;
	font-size: 17px;
	font-weight: 600;
	letter-spacing: -0.02em;
`;

export const CloseButton = styled.button`
	width: 28px;
	height: 28px;
	border-radius: ${({ theme }) => theme.radius.full};
	color: ${({ theme }) => theme.color.textMuted};
	display: grid;
	place-items: center;
	font-size: 11px;
	transition: background ${({ theme }) => theme.transition.fast};

	&:hover {
		background: ${({ theme }) => theme.color.surfaceMuted};
		color: ${({ theme }) => theme.color.text};
	}
`;

export const Body = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	font-size: 14px;
`;

export const Row = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 12px;

	@media (min-width: ${({ theme }) => theme.breakpoint.sm}) {
		grid-template-columns: 1fr 1fr;
	}
`;

export const Field = styled.label`
	display: block;
`;

export const FieldLabel = styled.span`
	display: block;
	font-size: 12px;
	font-weight: 500;
	color: ${({ theme }) => theme.color.textMuted};
	margin-bottom: 6px;
`;

const fieldBase = `
	width: 100%;
	padding: 9px 12px;
	border-radius: 10px;
	background: white;
	outline: none;
	font-size: 14px;
	transition: border-color 0.15s ease;
`;

export const Input = styled.input`
	${fieldBase}
	border: 1px solid ${({ theme }) => theme.color.border};

	&:focus {
		border-color: ${({ theme }) => theme.color.primary};
	}
`;

export const Select = styled.select`
	${fieldBase}
	border: 1px solid ${({ theme }) => theme.color.border};
	cursor: pointer;

	&:focus {
		border-color: ${({ theme }) => theme.color.primary};
	}
`;

export const ProgressRow = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
`;

export const ProgressValue = styled.span`
	min-width: 40px;
	text-align: right;
	font-size: 13px;
	font-weight: 500;
	color: ${({ theme }) => theme.color.textMuted};
	font-variant-numeric: tabular-nums;
`;

export const Range = styled.input<{ $progress: number }>`
	-webkit-appearance: none;
	appearance: none;
	flex: 1;
	height: 4px;
	border-radius: 9999px;
	background: ${({ $progress, theme }) =>
		`linear-gradient(to right, ${theme.color.primary} 0%, ${theme.color.primary} ${$progress}%, ${theme.color.surfaceMuted} ${$progress}%, ${theme.color.surfaceMuted} 100%)`};
	outline: none;
	cursor: pointer;

	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: white;
		border: 1px solid rgba(0, 0, 0, 0.1);
		box-shadow: ${({ theme }) => theme.shadow.sm};
		cursor: grab;
	}

	&::-webkit-slider-thumb:active {
		cursor: grabbing;
	}

	&::-moz-range-thumb {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: white;
		border: 1px solid rgba(0, 0, 0, 0.1);
		box-shadow: ${({ theme }) => theme.shadow.sm};
		cursor: grab;
	}
`;

export const AvatarRow = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
`;

export const AvatarPreview = styled.img`
	width: 36px;
	height: 36px;
	border-radius: ${({ theme }) => theme.radius.full};
`;

export const Footer = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 8px;
	margin-top: 8px;
`;

export const SecondaryButton = styled.button`
	padding: 9px 18px;
	border-radius: ${({ theme }) => theme.radius.md};
	background: ${({ theme }) => theme.color.surfaceMuted};
	color: ${({ theme }) => theme.color.text};
	font-size: 14px;
	font-weight: 500;
	transition: opacity ${({ theme }) => theme.transition.fast};

	&:hover {
		opacity: 0.7;
	}
`;

export const PrimaryButton = styled.button`
	padding: 9px 18px;
	border-radius: ${({ theme }) => theme.radius.md};
	background: ${({ theme }) => theme.color.primary};
	color: white;
	font-size: 14px;
	font-weight: 500;
	transition:
		background ${({ theme }) => theme.transition.fast},
		opacity ${({ theme }) => theme.transition.fast};

	&:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	&:not(:disabled):hover {
		background: ${({ theme }) => theme.color.primaryHover};
	}
`;

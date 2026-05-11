import styled, { css } from 'styled-components';

export const Wrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 2px;
	margin-top: 24px;
	flex-wrap: wrap;
`;

const buttonBase = css`
	min-width: 32px;
	height: 32px;
	padding: 0 8px;
	border-radius: ${({ theme }) => theme.radius.md};
	color: ${({ theme }) => theme.color.textMuted};
	display: grid;
	place-items: center;
	font-size: 13px;
	font-weight: 500;
	font-variant-numeric: tabular-nums;
	transition:
		background ${({ theme }) => theme.transition.fast},
		color ${({ theme }) => theme.transition.fast};

	&:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	&:not(:disabled):hover {
		background: ${({ theme }) => theme.color.surfaceMuted};
		color: ${({ theme }) => theme.color.text};
	}
`;

export const ArrowButton = styled.button`
	${buttonBase}
`;

export const PageButton = styled.button<{ $active: boolean }>`
	${buttonBase}

	${({ $active, theme }) =>
		$active &&
		css`
			background: ${theme.color.text};
			color: white;

			&:hover {
				background: ${theme.color.text} !important;
				color: white !important;
				opacity: 0.85;
			}
		`}
`;

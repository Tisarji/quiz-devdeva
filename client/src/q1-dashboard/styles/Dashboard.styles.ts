import styled from 'styled-components';

export const PageHeader = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 8px;
	margin-bottom: 16px;
`;

export const PageTitleRow = styled.div`
	display: inline-flex;
	align-items: center;
	gap: 10px;
`;

export const PageTitle = styled.h1`
	margin: 0;
	font-size: 18px;
	font-weight: 600;
	color: ${({ theme }) => theme.color.text};
	letter-spacing: -0.01em;
`;

export const PageCount = styled.span`
	font-size: 12px;
	font-weight: 500;
	color: ${({ theme }) => theme.color.textMuted};
	background: ${({ theme }) => theme.color.surfaceMuted};
	border: 1px solid ${({ theme }) => theme.color.border};
	padding: 2px 8px;
	border-radius: 4px;
	font-variant-numeric: tabular-nums;
`;

export const NewButton = styled.button`
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 6px 12px;
	border-radius: 4px;
	background: ${({ theme }) => theme.color.text};
	color: white;
	font-size: 12px;
	font-weight: 600;
	transition:
		opacity ${({ theme }) => theme.transition.fast},
		transform ${({ theme }) => theme.transition.fast};

	&:hover {
		opacity: 0.85;
	}

	&:active {
		transform: scale(0.97);
	}
`;

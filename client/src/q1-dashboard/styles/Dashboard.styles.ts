import styled from 'styled-components';

export const PageHeader = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	margin-bottom: 24px;
`;

export const PageTitle = styled.h1`
	margin: 0;
	font-size: 26px;
	font-weight: 700;
	color: ${({ theme }) => theme.color.text};
	letter-spacing: -0.025em;
`;

export const NewButton = styled.button`
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
`;

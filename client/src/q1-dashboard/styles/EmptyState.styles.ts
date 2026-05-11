import styled from 'styled-components';

export const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 6px;
	padding: 64px 16px;
	text-align: center;
`;

export const IconCircle = styled.div`
	width: 44px;
	height: 44px;
	border-radius: ${({ theme }) => theme.radius.full};
	background: ${({ theme }) => theme.color.surfaceMuted};
	color: ${({ theme }) => theme.color.textSubtle};
	display: grid;
	place-items: center;
	font-size: 18px;
	margin-bottom: 4px;
`;

export const Title = styled.div`
	font-size: 15px;
	font-weight: 600;
	color: ${({ theme }) => theme.color.text};
	letter-spacing: -0.01em;
`;

export const Hint = styled.div`
	font-size: 13px;
	color: ${({ theme }) => theme.color.textSubtle};
`;

export const ResetButton = styled.button`
	margin-top: 8px;
	padding: 7px 14px;
	font-size: 13px;
	color: ${({ theme }) => theme.color.primary};
	font-weight: 500;

	&:hover {
		opacity: 0.7;
	}
`;

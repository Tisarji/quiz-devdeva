import styled from 'styled-components';

export const Wrap = styled.div`
	margin-bottom: 16px;
`;

export const Row = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 8px;
`;

export const InputWrap = styled.div`
	position: relative;
	flex: 1 1 0;
	min-width: 240px;
`;

export const Input = styled.input`
	width: 100%;
	padding: 9px 36px 9px 36px;
	border: 1px solid transparent;
	border-radius: ${({ theme }) => theme.radius.md};
	background: ${({ theme }) => theme.color.surfaceMuted};
	font-size: 14px;
	outline: none;
	transition:
		background ${({ theme }) => theme.transition.fast},
		border-color ${({ theme }) => theme.transition.fast};

	&:focus {
		background: ${({ theme }) => theme.color.surface};
		border-color: ${({ theme }) => theme.color.border};
	}

	&::placeholder {
		color: ${({ theme }) => theme.color.textSubtle};
	}
`;

export const Icon = styled.span`
	position: absolute;
	left: 12px;
	top: 50%;
	transform: translateY(-50%);
	color: ${({ theme }) => theme.color.textSubtle};
	font-size: 13px;
`;

export const ClearInputButton = styled.button`
	position: absolute;
	right: 10px;
	top: 50%;
	transform: translateY(-50%);
	width: 20px;
	height: 20px;
	background: transparent;
	color: ${({ theme }) => theme.color.textSubtle};
	font-size: 11px;
	display: grid;
	place-items: center;
	border-radius: ${({ theme }) => theme.radius.full};

	&:hover {
		background: ${({ theme }) => theme.color.surfaceMuted};
		color: ${({ theme }) => theme.color.text};
	}
`;

export const Select = styled.select`
	padding: 9px 12px;
	border: 1px solid transparent;
	border-radius: ${({ theme }) => theme.radius.md};
	background: ${({ theme }) => theme.color.surfaceMuted};
	font-size: 14px;
	outline: none;
	color: ${({ theme }) => theme.color.text};
	cursor: pointer;
	transition:
		background ${({ theme }) => theme.transition.fast},
		border-color ${({ theme }) => theme.transition.fast};

	&:hover {
		background: ${({ theme }) => theme.color.surface};
		border-color: ${({ theme }) => theme.color.border};
	}

	&:focus {
		background: ${({ theme }) => theme.color.surface};
		border-color: ${({ theme }) => theme.color.border};
	}
`;

export const ClearAllButton = styled.button`
	padding: 9px 14px;
	border-radius: ${({ theme }) => theme.radius.md};
	color: ${({ theme }) => theme.color.primary};
	font-size: 13px;
	font-weight: 500;
	transition: opacity ${({ theme }) => theme.transition.fast};

	&:hover {
		opacity: 0.7;
	}
`;

export const ResultText = styled.div`
	margin-top: 10px;
	font-size: 12px;
	color: ${({ theme }) => theme.color.textSubtle};
`;

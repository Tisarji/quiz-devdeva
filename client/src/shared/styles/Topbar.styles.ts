import styled from 'styled-components';

export const Header = styled.header`
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	padding: 0 12px;
	background: ${({ theme }) => theme.color.surface};
	border-bottom: 1px solid ${({ theme }) => theme.color.border};

	@media (min-width: ${({ theme }) => theme.breakpoint.md}) {
		padding: 0 20px;
	}
`;

export const Left = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;
	min-width: 0;
`;

export const HamburgerButton = styled.button`
	width: 32px;
	height: 32px;
	border-radius: 4px;
	color: ${({ theme }) => theme.color.textMuted};
	display: grid;
	place-items: center;

	&:hover {
		background: ${({ theme }) => theme.color.surfaceMuted};
		color: ${({ theme }) => theme.color.text};
	}

	@media (min-width: ${({ theme }) => theme.breakpoint.md}) {
		display: none;
	}
`;

export const Title = styled.h2`
	margin: 0;
	font-size: 13px;
	font-weight: 600;
	color: ${({ theme }) => theme.color.text};
	letter-spacing: -0.01em;
	white-space: nowrap;
`;

export const Right = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;
`;

export const SearchWrap = styled.div`
	position: relative;
	display: none;

	@media (min-width: ${({ theme }) => theme.breakpoint.md}) {
		display: block;
	}
`;

export const SearchInput = styled.input`
	width: 200px;
	padding: 6px 10px 6px 30px;
	border: 1px solid ${({ theme }) => theme.color.border};
	border-radius: 4px;
	background: ${({ theme }) => theme.color.surfaceMuted};
	font-size: 12px;
	outline: none;
	transition:
		background ${({ theme }) => theme.transition.fast},
		border-color ${({ theme }) => theme.transition.fast};

	&:focus {
		background: ${({ theme }) => theme.color.surface};
		border-color: ${({ theme }) => theme.color.borderStrong};
	}

	&::placeholder {
		color: ${({ theme }) => theme.color.textSubtle};
	}
`;

export const SearchIcon = styled.span`
	position: absolute;
	left: 10px;
	top: 50%;
	transform: translateY(-50%);
	color: ${({ theme }) => theme.color.textSubtle};
	font-size: 11px;
`;

export const IconButton = styled.button`
	width: 32px;
	height: 32px;
	border-radius: 4px;
	display: grid;
	place-items: center;
	color: ${({ theme }) => theme.color.textMuted};

	&:hover {
		background: ${({ theme }) => theme.color.surfaceMuted};
		color: ${({ theme }) => theme.color.text};
	}
`;

export const Avatar = styled.div`
	width: 28px;
	height: 28px;
	border-radius: 9999px;
	background: ${({ theme }) => theme.color.surfaceMuted};
	color: ${({ theme }) => theme.color.text};
	font-size: 10px;
	font-weight: 600;
	display: grid;
	place-items: center;
`;

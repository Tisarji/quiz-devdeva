import styled from 'styled-components';

export const Header = styled.header`
	height: 64px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	padding: 0 20px;
	background: ${({ theme }) => theme.color.bg};
	border-bottom: 1px solid ${({ theme }) => theme.color.border};

	@media (min-width: ${({ theme }) => theme.breakpoint.md}) {
		padding: 0 32px;
	}
`;

export const Left = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	min-width: 0;
`;

export const HamburgerButton = styled.button`
	width: 36px;
	height: 36px;
	border-radius: ${({ theme }) => theme.radius.sm};
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
	font-size: 15px;
	font-weight: 600;
	color: ${({ theme }) => theme.color.text};
	letter-spacing: -0.01em;
	white-space: nowrap;
`;

export const Right = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

export const SearchWrap = styled.div`
	position: relative;
	display: none;

	@media (min-width: ${({ theme }) => theme.breakpoint.md}) {
		display: block;
	}
`;

export const SearchInput = styled.input`
	width: 220px;
	padding: 8px 12px 8px 36px;
	border: 1px solid transparent;
	border-radius: ${({ theme }) => theme.radius.md};
	background: ${({ theme }) => theme.color.surfaceMuted};
	font-size: 13px;
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

export const SearchIcon = styled.span`
	position: absolute;
	left: 12px;
	top: 50%;
	transform: translateY(-50%);
	color: ${({ theme }) => theme.color.textSubtle};
	font-size: 13px;
`;

export const IconButton = styled.button`
	width: 36px;
	height: 36px;
	border-radius: ${({ theme }) => theme.radius.full};
	display: grid;
	place-items: center;
	color: ${({ theme }) => theme.color.textMuted};

	&:hover {
		background: ${({ theme }) => theme.color.surfaceMuted};
		color: ${({ theme }) => theme.color.text};
	}
`;

export const Avatar = styled.div`
	width: 32px;
	height: 32px;
	border-radius: ${({ theme }) => theme.radius.full};
	background: ${({ theme }) => theme.color.surfaceMuted};
	color: ${({ theme }) => theme.color.text};
	font-size: 11px;
	font-weight: 600;
	display: grid;
	place-items: center;
`;

import styled, { css } from 'styled-components';

export const Backdrop = styled.div<{ $visible: boolean }>`
	display: none;
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.25);
	z-index: 40;
	opacity: ${({ $visible }) => ($visible ? 1 : 0)};
	pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
	transition: opacity ${({ theme }) => theme.transition.base};

	@media (max-width: ${({ theme }) => theme.breakpoint.md}) {
		display: block;
	}
`;

export const Aside = styled.aside<{ $collapsed: boolean; $mobileOpen: boolean }>`
	flex-shrink: 0;
	width: ${({ $collapsed }) => ($collapsed ? '64px' : '220px')};
	background: ${({ theme }) => theme.color.bg};
	border-right: 1px solid ${({ theme }) => theme.color.border};
	transition: width ${({ theme }) => theme.transition.base};
	display: flex;
	flex-direction: column;

	@media (max-width: ${({ theme }) => theme.breakpoint.md}) {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		z-index: 50;
		width: 240px;
		background: ${({ theme }) => theme.color.surface};
		transform: ${({ $mobileOpen }) =>
			$mobileOpen ? 'translateX(0)' : 'translateX(-100%)'};
		transition: transform ${({ theme }) => theme.transition.base};
		box-shadow: ${({ theme }) => theme.shadow.lg};
	}
`;

export const Header = styled.div`
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 12px;
	border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

export const Brand = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

export const BrandLogo = styled.div`
	width: 24px;
	height: 24px;
	border-radius: 4px;
	background: ${({ theme }) => theme.color.text};
	color: white;
	font-weight: 700;
	font-size: 12px;
	display: grid;
	place-items: center;
	letter-spacing: 0;
`;

export const BrandName = styled.span`
	font-weight: 600;
	font-size: 13px;
	letter-spacing: -0.01em;
`;

export const ToggleButton = styled.button`
	width: 28px;
	height: 28px;
	display: grid;
	place-items: center;
	border-radius: 4px;
	color: ${({ theme }) => theme.color.textMuted};
	transition: background ${({ theme }) => theme.transition.fast};

	&:hover {
		background: ${({ theme }) => theme.color.surfaceMuted};
		color: ${({ theme }) => theme.color.text};
	}
`;

export const Nav = styled.nav`
	flex: 1;
	padding: 4px 8px;
	display: flex;
	flex-direction: column;
	gap: 2px;
`;

export const NavItem = styled.button<{ $active: boolean }>`
	display: flex;
	align-items: center;
	gap: 12px;
	width: 100%;
	padding: 8px 12px;
	border-radius: ${({ theme }) => theme.radius.md};
	color: ${({ theme }) => theme.color.textMuted};
	font-size: 14px;
	text-align: left;
	transition:
		background ${({ theme }) => theme.transition.fast},
		color ${({ theme }) => theme.transition.fast};

	&:hover {
		background: ${({ theme }) => theme.color.surfaceMuted};
		color: ${({ theme }) => theme.color.text};
	}

	${({ $active, theme }) =>
		$active &&
		css`
			color: ${theme.color.text};
			font-weight: 600;
			background: ${theme.color.surface};
		`}
`;

export const NavIcon = styled.span`
	font-size: 15px;
	display: inline-flex;
	color: ${({ theme }) => theme.color.textMuted};
`;

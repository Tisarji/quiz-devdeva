import styled from 'styled-components';

export const Layout = styled.div`
	height: 100%;
	display: flex;
`;

export const Body = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	min-width: 0;
`;

export const Main = styled.main`
	flex: 1;
	padding: 24px 20px;
	overflow: auto;

	@media (min-width: ${({ theme }) => theme.breakpoint.md}) {
		padding: 32px;
	}

	@media (min-width: ${({ theme }) => theme.breakpoint.lg}) {
		padding: 40px;
	}
`;

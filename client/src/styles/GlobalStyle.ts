import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	*, *::before, *::after { box-sizing: border-box; }

	html, body, #root { height: 100%; }

	body {
		margin: 0;
		font-family: ${({ theme }) => theme.font.sans};
		background: ${({ theme }) => theme.color.bg};
		color: ${({ theme }) => theme.color.text};
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		font-feature-settings: 'cv11', 'ss01';
		letter-spacing: -0.01em;
	}

	button {
		font-family: inherit;
		cursor: pointer;
		border: none;
		background: none;
		padding: 0;
		color: inherit;
	}

	input, select, button, textarea { font: inherit; color: inherit; }

	::selection {
		background: ${({ theme }) => theme.color.primarySoft};
	}
`;

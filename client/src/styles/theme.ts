export const theme = {
	color: {
		bg: '#fbfbfd',
		surface: '#ffffff',
		surfaceMuted: '#f5f5f7',
		border: 'rgba(0, 0, 0, 0.08)',
		borderStrong: 'rgba(0, 0, 0, 0.14)',
		text: '#1d1d1f',
		textMuted: '#6e6e73',
		textSubtle: '#86868b',
		primary: '#0071e3',
		primaryHover: '#0058b0',
		primarySoft: 'rgba(0, 113, 227, 0.08)',
		primaryText: '#0058b0',
		todo: {
			bg: 'rgba(134, 134, 139, 0.18)',
			columnBg: 'rgba(134, 134, 139, 0.06)',
			text: '#3d3d40',
			bar: '#86868b',
		},
		inProgress: {
			bg: 'rgba(0, 113, 227, 0.14)',
			columnBg: 'rgba(0, 113, 227, 0.05)',
			text: '#0058b0',
			bar: '#0071e3',
		},
		done: {
			bg: 'rgba(52, 199, 89, 0.20)',
			columnBg: 'rgba(52, 199, 89, 0.06)',
			text: '#1f7a3a',
			bar: '#34c759',
		},
		low: { bg: 'rgba(134, 134, 139, 0.12)', text: '#3d3d40' },
		medium: { bg: 'rgba(245, 158, 11, 0.14)', text: '#a35d00' },
		high: { bg: 'rgba(255, 59, 48, 0.12)', text: '#b3261e' },
	},
	radius: { sm: '6px', md: '10px', lg: '14px', xl: '18px', full: '9999px' },
	space: (n: number) => `${n * 4}px`,
	font: {
		sans: `-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', system-ui, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
	},
	shadow: {
		sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
		md: '0 6px 18px rgba(0, 0, 0, 0.06)',
		lg: '0 24px 60px rgba(0, 0, 0, 0.12)',
	},
	breakpoint: {
		sm: '640px',
		md: '768px',
		lg: '1024px',
	},
	transition: {
		fast: '0.15s ease',
		base: '0.2s ease',
	},
} as const;

export type AppTheme = typeof theme;

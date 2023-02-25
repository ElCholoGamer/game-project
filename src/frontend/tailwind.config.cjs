/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,ts,svelte}'],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'Nunito',
					'ui-sans-serif',
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'Roboto',
					'Helvetica Neue',
					'Arial',
					'Noto Sans',
					'sans-serif',
					'Apple Color Emoji',
					'Segoe UI Emoji',
					'Segoe UI Symbol',
					'Noto Color Emoji',
				],
				display: ['Shantell Sans', 'system-ui', 'sans-serif'],
			},
			animation: {
				'hover-slow': 'hover 1s ease-in-out infinite alternate',
			},
			keyframes: {
				hover: {
					'0%': { transform: 'translateY(10%)' },
					'100%': { transform: 'translateY(-10%)' },
				},
			},
		},
	},
	plugins: [],
};

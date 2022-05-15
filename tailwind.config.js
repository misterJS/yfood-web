module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'black': '#000000',
      'gray': {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
      },
      'green': {
        100: '#f2f9f1',
        200: '#d2e9cd',
        300: '#93ca87',
        400: '#72ba62',
        500: '#58a348',
        600: '#458038',
        700: '#325c28',
        800: '#1f3919',
        900: '#0c1509',
      },
      'red': {
        100: '#ffe4e6',
        200: '#f7ccd5',
        300: '#f7a3b0',
        400: '#f87286',
        500: '#f3405f',
        600: '#df1f49',
        700: '#bd123b',
        800: '#9f1239',
        900: '#881337',
      },
      // ...
    },
    extend: {
      fontFamily: {
        'sans': ['Rubik','sans-serif']
        // 'sans': ['Fjalla', 'Helvetica', 'Arial', 'sans-serif']
      }
    },
  },
	plugins: [
		require( 'tailwindcss' ),
		require( 'precss' ),
		require( 'autoprefixer' ),
    require( '@tailwindcss/forms' )
	]
}

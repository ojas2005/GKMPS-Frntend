/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Color
        primary: {
          50: '#f0f7ff',
          100: '#e0f0ff',
          200: '#bae6ff',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c3d66',
        },
        // Neutral colors
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#ebebeb',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
        // Accent colors
        success: {
          50: '#f0fdf4',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#3f3f46',
            '[class~="lead"]': {
              color: '#52525b',
            },
            strong: {
              color: '#18181b',
              fontWeight: '600',
            },
            'ol > li::before': {
              color: '#a1a1aa',
            },
            'ul > li::before': {
              backgroundColor: '#d4d4d8',
            },
            hr: {
              borderColor: '#ebebeb',
            },
            blockquote: {
              color: '#52525b',
              borderLeftColor: '#ebebeb',
            },
            h1: {
              color: '#18181b',
              fontWeight: '700',
            },
            h2: {
              color: '#18181b',
              fontWeight: '600',
            },
            h3: {
              color: '#27272a',
              fontWeight: '600',
            },
            h4: {
              color: '#27272a',
              fontWeight: '500',
            },
            'figure figcaption': {
              color: '#71717a',
            },
            code: {
              color: '#dc2626',
            },
            'a code': {
              color: '#dc2626',
            },
            pre: {
              color: '#e4e4e7',
              backgroundColor: '#27272a',
            },
            'pre code': {
              color: '#e4e4e7',
            },
            thead: {
              color: '#18181b',
              borderBottomColor: '#d4d4d8',
            },
            'tbody tr': {
              borderBottomColor: '#ebebeb',
            },
          },
        },
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
      },
      borderRadius: {
        none: '0',
        sm: '0.375rem',
        DEFAULT: '0.5rem',
        md: '0.625rem',
        lg: '0.875rem',
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          '"SF Mono"',
          'Menlo',
          'Courier',
          'monospace',
        ],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [],
};

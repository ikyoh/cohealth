/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: theme => ({
        "screen/2": "50vh",
        "screen/3": "calc(100vh / 3)",
        "screen/4": "calc(100vh / 4)",
        "screen/5": "calc(100vh / 5)",
      }),
      colors: {
        'primary': '#26263F',
        'secondary': '#027BBF',
        'action': '#027BBF',
        'info': '#94C121',
        'mention': '#5ac8fa',
        'quote': '#5ac8fa',
        'success': '#28a745',
        'waiting': '#ffc107',
        'warning': '#ff9900',
        'error': '#ef4444',
        'neutral': '#3d4451',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem'
        },
      },
    },
  },
  daisyui: {
    themes: [{
      'mytheme': {
        'primary': '#027BBF',
        'primary-focus': '#26263F',
        'primary-content': '#ffffff',
        'secondary': '#f000b8',
        'secondary-focus': '#bd0091',
        'secondary-content': '#ffffff',
        'accent': '#37cdbe',
        'accent-focus': '#2aa79b',
        'accent-content': '#ffffff',
        'neutral': '#3d4451',
        'neutral-focus': '#2a2e37',
        'neutral-content': '#ffffff',
        'base-100': '#ffffff',
        'base-200': '#f9fafb',
        'base-300': '#d1d5db',
        'base-content': '#1f2937',
        'info': '#94C121',
        'success': '#28a745',
        'warning': '#ff9900',
        'error': '#ef4444',
      },
    },
    ],
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
  },
  plugins: [
    require("daisyui"),
    require('tailwind-capitalize-first-letter'),
  ],
}

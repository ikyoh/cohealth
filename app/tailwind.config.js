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
        'action': '#027BBF',
        'info': '#94C121',
        'mention': '#5ac8fa',
        'success': '#28a745',
        'waiting': '#ffc107',
        'error': '#ef4444'
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
  plugins: [],
}

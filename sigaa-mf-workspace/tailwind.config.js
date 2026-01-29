/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './projects/shell/src/**/*.{html,ts}',
    './projects/mf-user/src/**/*.{html,ts}',
    './projects/shared-ui/src/**/*.{html,ts}',
    './projects/mf-auth/src/**/*.{html,ts}',
    './projects/mf-access-control/src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        appBg: '#101828',
      },
    },
    plugins: [require('tailwind-scrollbar')],
  },
};

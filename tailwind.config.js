/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
        primary: '#ff5500', // Example: Tomato red
        secondary: '#4682B4', // Example: Steel blue
        accent: '#32CD32', // Example: Lime green
        dark : '#141414',
        darkRed : '#902828',
        clicked : '#1100ff',
        lightGreen : '#11ff00',
        
      }
    }
  },
  plugins: []
}

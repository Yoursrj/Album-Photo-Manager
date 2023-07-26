/** @type {import('tailwindcss').Config} */
//This line is a JSDoc comment that provides type information for the configuration file. 
//It specifies that the configuration is of type import('tailwindcss').Config.
module.exports = {
//This line exports a JavaScript module. It exports an object that represents the Tailwind CSS configuration.
  content: ["./src/**/*.{html,js}"],
//This line configures the paths of the files that Tailwind CSS will analyze for styles. In this case,
//it specifies that the files with .html and .js extensions in the ./src directory and its subdirectories should be analyzed.
  theme: {
    extend: {
      keyframes:{//keyframes defines custom animation keyframes. It adds a keyframe called shimmer that specifies a transformation of translateX(100%) at 100% keyframe.
        shimmer:{
          '100%' : {transform:'trabslateX{100%}'}
        }
      },
      animation:{//animation adds a custom animation called shimmer, which uses the shimmer keyframe and has a duration of 1.5s. The infinite keyword indicates that the animation should repeat indefinitely.
        shimmer:'shimmer 1.5s infinite'
      }
    },
  },
//This block defines the theme configuration for Tailwind CSS. It uses the extend property to add custom styles to the existing theme.
//In this case, it extends the keyframes and animation sections.
  plugins: [],
//This line specifies an array of plugins to be used with Tailwind CSS. Currently, the array is empty, indicating no additional plugins are being used.
}

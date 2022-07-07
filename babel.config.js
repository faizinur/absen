module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          //component
          "@Atoms": "./src/Components/Atoms/",
          "@Molecules": "./src/Components/Molecules/",
          "@Organisms": "./src/Components/Organisms/",
          //config
          "@Redux": "./src/Config/Redux/",
          "@Model": "./src/Config/Model/",
          "@ViewModel": "./src/Config/ViewModel/",
          "@RootNavigation": "./src/Config/RootNavigation/",
          //Container
          "@Pages": "./src/Container/Pages/",
          "@Templates": "./src/Container/Templates/",
          //utils
          "@Utils": "./src/Utils",
        },
      },
    ],
  ],
};
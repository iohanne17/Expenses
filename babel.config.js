const config = {
  root: ['./'],
  alias: {
    '@Screens': './src/screens',
    underscore: 'lodash',
    '@Libs': './src/lib',
    '@Features': './src/features',
    '@Config': './src/config',
    '@Components': './src/components',
    '@Assets': './src/assets',
  },
  extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
};

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [['module-resolver', {...config}], 'react-native-reanimated/plugin'],
  env: {
    production: {
      plugins: ['transform-remove-console', ['module-resolver', {...config}]],
    },
  },
};

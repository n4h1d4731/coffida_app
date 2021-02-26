module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js'],
        alias: {
          _assets: './src/assets',
          _components: './src/components',
          _navigations: './src/navigations',
          _screens: './src/screens',
          _providers: './src/providers',
          _hooks: './src/hooks',
          _styles: './src/styles',
          _utils: './src/utils'
        }
      }
    ]
  ]
}

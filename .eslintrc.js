module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugin: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'],
      rules: {

        semi: ['error', 'never']
      }
    }
  ]
};

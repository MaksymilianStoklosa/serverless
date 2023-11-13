module.exports = {
  '**/*.{js,ts}': ['npm run format:staged', 'npx eslint --fix'],
  '**/*.{json,yml,md}': ['npm run format:staged'],
};

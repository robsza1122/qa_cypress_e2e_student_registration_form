const { defineConfig } = require('cypress');

module.exports = defineConfig({
  watchForFileChanges: false,
  e2e: {
    baseUrl: 'https://demoqa.com/automation-practice-form',
    setupNodeEvents(on, config) {
    }
  }
});

const express = require('express');

const setupExpressServer = () => {
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  return app;
};

module.exports = { setupExpressServer };

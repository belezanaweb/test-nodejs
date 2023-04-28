require('dotenv').config();
const startApplication = async () => {
  const container = require('./src/container');
  const app = container.resolve('application');

  app.start().catch((error) => {
    console.log(error.stack);
    process.exit();
  });
};

startApplication();

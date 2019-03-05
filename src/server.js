const app = require('./config/express')();
const config = require('./config/config')();
const logger = require('./app/utils/logger');

// Initialize the app
app.listen(config.PORT_HTTP, () => {
  logger.success(`Server running on port ${config.PORT_HTTP}`);
});

require('dotenv').config()
require('integrations/launcher')(__dirname, process.env.LAUNCHER_NAME)
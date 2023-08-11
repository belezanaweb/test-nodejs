import app from './app';''
import { logger } from './utils/winston';
import * as dotenv from 'dotenv'
dotenv.config()

const HOST = process.env.HOST || 'https://localhost'
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  logger.info(`Server is running at ${HOST}:${PORT}`)
})

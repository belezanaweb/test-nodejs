export default {
  serverHost: process.env.WEBSITE_HOSTNAME ?? '127.0.0.1',
  port: process.env.PORT ?? 5058,
  databaseEnv: process.env.DB_ENV ?? 'dev',

  jwtSecrets: {
    secretDefault: '8e227ad2f13d8aceb64e17cb6e00df40' // MD5(GrupoBoticario@2022) - 12h
  }

}

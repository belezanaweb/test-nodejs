export default {
  serverHost: process.env.WEBSITE_HOSTNAME ?? '127.0.0.1',
  port: process.env.PORT ?? 5059,
  databaseEnv: process.env.DB_ENV ?? 'dev',

  jwtSecrets: {
    secretDefault: 'efd112ef60538d1360dfe26722eeb2c2'
  }

}

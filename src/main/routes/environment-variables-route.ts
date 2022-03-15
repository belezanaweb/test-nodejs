import { Router } from 'express'

export default (router: Router): void => {
  router.get('/env-variables/', (req, res) => {
    res.json({
      data: {
        DATE_STRING: new Date().toString(),
        DATE_ISO_STRING: new Date().toISOString(),
        OPERATING_SYSTEM: process.platform,
        ...process.env
      }
    })
  })
}

import { json, urlencoded } from 'express'

export const bodyParser = json()
export const bodyParserUrlEnconded = urlencoded({ extended: true })

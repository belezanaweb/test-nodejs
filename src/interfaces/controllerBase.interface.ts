import { Request, Response } from 'express'

export interface IControllerBase <T> {
  get?(req: Request, res: Response, next: Function): T
  update?(req: Request, res: Response, next: Function): T
  remove?(req: Request, res: Response, next: Function): T
  create?(req: Request, res: Response, next: Function): T
}
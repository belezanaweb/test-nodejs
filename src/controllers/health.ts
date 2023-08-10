import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { healthcheck } from '../business/health';

async function health(_req: Request, res: Response): Promise<Response> {
  try {
    const response = healthcheck();
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message });
  }
}

export default health;

import { Request, Response } from 'express';

export default class PingController {
  static async getMessage(_req: Request, res: Response) {
    res.json({
      message: 'pong',
    });
  }
}

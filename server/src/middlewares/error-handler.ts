import { Request, Response, NextFunction } from 'express';

export const errorhandler = (err: Error, req: Request, res: Response, next: NextFunction ) => {
   console.log('Something went wronf', err);

   res.status(400).send({
       message: err.message
   });
};
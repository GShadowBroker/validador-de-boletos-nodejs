import { Request, Response, NextFunction } from 'express';
import HttpStatus from '../utils/httpStatus';

export default (_req: Request, res: Response, _next: NextFunction) => {
	return res.status(HttpStatus.NOT_FOUND).json({ status: HttpStatus.NOT_FOUND, message: "Unknown endpoint" });
};

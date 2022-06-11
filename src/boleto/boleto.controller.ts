import express, { NextFunction, Request, Response } from 'express';
import BoletoService from './boleto.service';

const router = express.Router();
const boletoService = new BoletoService();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
	try {
		const { status, data } = boletoService.index();
		return res.status(status).json(data);
	} catch (error) {
		return next(error);
	}
});

router.get('/:codigo', (req: Request, res: Response, next: NextFunction) => {
	try {
		const { status, data } = boletoService.parse(req.params.codigo);
		return res.status(status).json(data);
	}
	catch (error) {
		return next(error);
	}
});

export default router;

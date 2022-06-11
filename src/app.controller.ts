import express, { Request, Response } from 'express';
import HttpStatus from './utils/httpStatus';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
	return res.status(HttpStatus.OK).json({
		title: "Teste Prático BackEnd",
		message: "API para consultar linhas digitáveis de boleto de título bancário e pagamento de concessionárias."
	});
});

export default router;

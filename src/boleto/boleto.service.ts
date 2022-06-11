import { IHttpResponse } from '../common/interfaces';
import DateTime from '../utils/DateTime';
import { HttpException } from '../utils/exceptions';
import HttpStatus from '../utils/httpStatus';
import { IParseResponse } from './interfaces';

export default class BoletoService {
	public index(): IHttpResponse<any> {
		return { status: HttpStatus.OK, data: { message: 'OK' } };
	}

	public parse(code: string): IHttpResponse<IParseResponse> {
		// validations (length, all numbers)
		if (!code || code.length !== 47 || Number.isNaN(Number(code))) {
			throw new HttpException(HttpStatus.BAD_REQUEST, "Invalid code");
		}

		// para linha digitável: AAABC.CCCCX DDDDD.DDDDDY EEEEE.EEEEEZ K UUUUVVVVVVVVVV
		const codeBlocks = {
			block_1: code.substring(0, 10), // AAABC.CCCCX
			block_2: code.substring(10, 21), // DDDDD.DDDDDY
			block_3: code.substring(21, 32), // EEEEE.EEEEEZ
			verifier_digit: code[ 32 ], // K
			block_5: code.substring(33, 47) // UUUUVVVVVVVVVV
		};

		const expirationFactor = Number(codeBlocks.block_5.substring(0, 4));

		return {
			status: HttpStatus.OK,
			data: {
				barCode: this.convertToCodigoBarras(code),
				amount: this.getFormattedAmountFromBlock(codeBlocks.block_5),
				expirationDate: DateTime.getDateFromExpirationFactor(expirationFactor),
			},
		};
	}

	private convertToCodigoBarras(code: string): string {
		// AAA $ BBBBB ( DV ) CCCCCC DDDD ( DV ) DDDDDDDDDD ( DV ) EEEEEEEEEEEEEEE (linha digitável | 47 characters)
		// ==
		// AAA $ EEEEEEEEEEEEEEE BBBBB CCCCCC DDDDDDDDDDDDDD (código de barras | 44 characters)
		const codeBlocks = {
			A: code.substring(0, 3),
			$: code[ 3 ],
			B: code.substring(4, 9),
			C: code.substring(10, 16),
			D: code.substring(16, 20) + code.substring(21, 31),
			E: code.substring(code.length - 15, code.length),
		};

		const { A, $, B, C, D, E } = codeBlocks;

		return A + $ + E + B + C + D;
	}

	private getFormattedAmountFromBlock(block_5: string): string {
		const amount = block_5.substring(block_5.length - 10, block_5.length);

		if (Number.isNaN(Number(amount))) {
			throw new HttpException(HttpStatus.BAD_REQUEST, "Invalid amount");
		}

		return (Number(amount) / 100).toFixed(2).toString();
	};
}

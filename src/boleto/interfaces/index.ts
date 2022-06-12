export interface IParseResponse {
	barCode: string;
	amount: string;
	expirationDate: string | null;
}

export interface IBankCodeBlocks {
	block_1: string; // AAABC.CCCCX
	block_2: string; // DDDDD.DDDDDY
	block_3: string; // EEEEE.EEEEEZ
	verifier_digit: string; // K
	block_5: string; // UUUUVVVVVVVVVV
}

export interface IConcessionariaCodeBlocks {
	block_1: string; // AAAAAAAAAAA(X)
	block_2: string; // BBBBBBBBBBB(Y)
	block_3: string; // CCCCCCCCCCC(Z)
	block_4: string; // DDDDDDDDDDD(W)
}

export type IValidateBankCodeBlocks = Omit<IBankCodeBlocks, "verifier_digit" | "block_5">;

export type BinaryMultiplier = 1 | 2;
import BoletoService from "../boleto/boleto.service";
import HttpStatus from "../utils/httpStatus";

describe('Test Handlers', () => {
	const boletoService = new BoletoService();

	test('/', () => {
		const response = boletoService.index();

		expect(response.status).toBe(200);
		expect(response.data).toBeDefined();
		expect(response.data.message).toBe("OK");
	});

	test('/boleto/:code [Erros esperados]', () => {
		expect(() => boletoService.parse("")).toThrow("Missing code");
		expect(() => boletoService.parse("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")).toThrow("Code must contain numeric characters only");
		expect(() => boletoService.parse("9999999999999999999999999999999999999999999")).toThrow("Invalid code format: code is either too short or too long");
		expect(() => boletoService.parse("9999999999999999999999999999999999999999999999999")).toThrow("Invalid code format: code is either too short or too long");
		expect(() => boletoService.parse("999999999999999999999999999999999999999999999999")).toThrow("Wrong DAC for resulting barcode. Expected 7, but got 9.");
		expect(() => boletoService.parse("23783380296099605290241006333300689690000143014")).toThrow("Wrong verifier digit. Expected 0, but got 9.");
		expect(() => boletoService.parse("817500000000010936599702411310797039001433708318")).toThrow("Wrong DAC for resulting barcode. Expected 7, but got 5.");
	});

	test('/boleto/:code [Boleto Bancário 1]', () => {
		const boletoBancario1 = "23793380296099605290241006333300689690000143014";
		const response = boletoService.parse(boletoBancario1);

		expect(response).toBeDefined();
		expect(response.status).toBe(HttpStatus.OK);
		expect(response.data).toBeDefined();
		expect(response.data.amount).toBe("1430.14");
		expect(response.data.barCode).toBe("23796896900001430143380260996052904100633330");
		expect(response.data.expirationDate).toBe("28-04-2022");
	});

	test('/boleto/:code [Boleto Bancário 2]', () => {
		const boletoBancario2 = "26091684514793366727222200000002789520000038345";
		const response = boletoService.parse(boletoBancario2);

		expect(response).toBeDefined();
		expect(response.status).toBe(HttpStatus.OK);
		expect(response.data).toBeDefined();
		expect(response.data.amount).toBe("383.45");
		expect(response.data.barCode).toBe("26097895200000383451684547933667272220000000");
		expect(response.data.expirationDate).toBe("11-04-2022");
	});

	test('/boleto/:code [Boleto Concessionária 1]', () => {
		const boletoConcessionaria1 = "817700000000010936599702411310797039001433708318";
		const response = boletoService.parse(boletoConcessionaria1);

		expect(response).toBeDefined();
		expect(response.status).toBe(HttpStatus.OK);
		expect(response.data).toBeDefined();
		expect(response.data.amount).toBe("1.09");
		expect(response.data.barCode).toBe("81770000000010936599704113107970300143370831");
		expect(response.data.expirationDate).toBeNull();
	});

	test('/boleto/:code [Boleto Concessionária 2]', () => {
		const boletoConcessionaria2 = "846100000005246100291102005460339004695895061080";
		const response = boletoService.parse(boletoConcessionaria2);

		expect(response).toBeDefined();
		expect(response.status).toBe(HttpStatus.OK);
		expect(response.data).toBeDefined();
		expect(response.data.amount).toBe("24.61");
		expect(response.data.barCode).toBe("84610000000246100291100054603390069589506108");
		expect(response.data.expirationDate).toBeNull();
	});
});

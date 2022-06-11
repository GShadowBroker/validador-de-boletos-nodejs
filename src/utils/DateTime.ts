export default class DateTime {
	public static BASE_DATE_TIMESTAMP: number = new Date("1997-10-07 00:00:00.000Z").getTime();
	public static DAY_MS: number = 1000 * 60 * 60 * 24;
	public static brDateFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' });

	/***
	 * Returns a string representing the expiration date calculated from an expiration factor
	 * according to the tech guide https://www.bb.com.br/docs/pub/emp/empl/dwn/Doc5175Bloqueto.pdf).
	 * 
	 * @param expirationFactor number of days since base date
	 * @returns string following the DD-MM-YYYY format
	 */
	public static getDateFromExpirationFactor(expirationFactor: number): string {
		return DateTime.formatTimestampToDDMMYYYY(
			DateTime.getDateTimestampFromExpirationFactor(expirationFactor)
		);
	}

	/***
	 * Returns a timestamp representing the date calculated from the expirationFactor (days since
	 * base date calculated according to the tech guide https://www.bb.com.br/docs/pub/emp/empl/dwn/Doc5175Bloqueto.pdf).
	 * 
	 * @param expirationFactor number of days since base date
	 * @returns number resulting timestamp
	 */
	public static getDateTimestampFromExpirationFactor(expirationFactor: number): number {
		return DateTime.BASE_DATE_TIMESTAMP + (expirationFactor * DateTime.DAY_MS);
	}

	/***
	 * Formats a timestamp to a string following the DD-MM-YYYY date format.
	 * 
	 * @param timestamp number
	 * @returns string following the DD-MM-YYYY format
	 */
	public static formatTimestampToDDMMYYYY(timestamp: number): string {
		return DateTime.brDateFormatter
			.format(timestamp)
			.replace(/\//g, "-");
	}
}

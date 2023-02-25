import { RequestHandler } from 'express';

export function extendResponse(): RequestHandler {
	return (req, res, next) => {
		res.standardJson = function (
			messageOrStatusCodeOrData: number | string | Record<string, unknown>,
			messageOrData?: string | Record<string, unknown>
		) {
			if (typeof messageOrStatusCodeOrData !== 'number') {
				messageOrData = messageOrStatusCodeOrData;
				messageOrStatusCodeOrData = 200;
			}

			const payload =
				typeof messageOrData === 'string' ? { message: messageOrData } : { data: messageOrData };

			this.status(messageOrStatusCodeOrData).json({
				...payload,
				status: messageOrStatusCodeOrData,
			});
			return this;
		};

		next();
	};
}

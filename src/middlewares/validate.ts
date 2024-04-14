import { Request, Response, NextFunction } from 'express';
import v from 'validator';

export const validateEmail = function (
	req: Request,
	res: Response,
	next: NextFunction
) {
	req.body.email = req.body.email.trim();
	req.body.email = req.body.email.toLowerCase();

	const { email } = req.body;

	if (!email) {
		return res
			.status(400)
			.json({ status: 'error', message: 'Please provide your email!' });
	}

	if (!v.isEmail(email)) {
		return res
			.status(400)
			.json({ status: 'error', message: 'Please provide a valid email!' });
	}

	next();
};

export const validatePassword = function (
	req: Request,
	res: Response,
	next: NextFunction
) {
	req.body.password = req.body.password.trim();

	const { password } = req.body;

	if (!password) {
		return res
			.status(400)
			.json({ status: 'error', message: 'Please provide a password!' });
	}

	if (password.length < 8) {
		return res
			.status(400)
			.json({ status: 'error', message: 'Please provide a longer password!' });
	}

	next();
};

export const validateCreation = function (
	req: Request,
	res: Response,
	next: NextFunction
) {
	req.body.nome = req.body.nome?.trim();
	// req.body.popolazione = // popolazione è un numero quindi non ci sono spazi
	req.body.codice = req.body.codice?.trim();
	req.body.regione = req.body.regione?.trim();

	const { nome, popolazione, codice, regione } = req.body;

	if (!nome || !popolazione || !codice || !regione) {
		return res
			.status(400)
			.json({
				status: 'error',
				message:
					'Please provide all the fields! [nome, popolazione, codice, regione]',
			});
	}

	next();
};

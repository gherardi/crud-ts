import { Request, Response, NextFunction } from 'express';

export const validatePagination = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// page
	if (req.query.page === undefined) return next(); // quando non viene fornito
	if (req.query.page === '') {
		// quando viene fornito vuoto
		res.status(400).json({ message: 'Missing page query parameter' });
		return;
	}
	if (isNaN(Number(req.query.page))) {
		// quando viene fornito un valore non numerico
		res.status(400).json({ message: 'Page query parameter must be a number' });
		return;
	}

	if (Number(req.query.page) < 1) {
		// quando viene fornito un valore non numerico
		res
			.status(400)
			.json({ message: 'Page query parameter must be a positive number' });
		return;
	}

	next();
};

export const validateSorting = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// sort
	const sortType: [string, string] = ['asc', 'desc'];
	if (req.query.sort === undefined) return next(); // quando non viene fornito
	if (req.query.sort === '') {
		// quando viene fornito vuoto
		res.status(400).json({ message: 'Missing sort query parameter' });
		return;
	}

	if (!sortType.includes(req.query.sort as string)) {
		// quando viene fornito un valore non valido
		res
			.status(400)
			.json({ message: 'Sort query parameter must be "asc" or "desc"' });
		return;
	}

	next();
};

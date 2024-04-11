import { Request, Response, NextFunction } from 'express';

export default function whitelist(...allowed: string[]) {
	return function(req: Request, res: Response, next: NextFunction) {
		const keys: string[] = [...new Set(Object.keys(req.query))];
		for (const key of keys) {
			if (!allowed.includes(key)) {
				res.status(400).json({ message: `Invalid query parameter: ${key}` });
				return;
			}
		}
		next();
	}
}

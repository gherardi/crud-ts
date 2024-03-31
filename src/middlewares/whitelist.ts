import { Request, Response, NextFunction } from 'express';

const whitelist: string[] = ['page', 'sort', 'regione'];

// page?: number;
// regione?: string;
// sort?: string;

export default function Whitelist(req: Request, res: Response, next: NextFunction) {
	// controlla se ci sono parametri non validi
  const keys: string[] = [...new Set(Object.keys(req.query))];
	for (const key of keys) {
		if (!whitelist.includes(key)) {
			res.status(400).json({ message: `Invalid query parameter: ${key}` });
			return;
		}
	}
	next();
}

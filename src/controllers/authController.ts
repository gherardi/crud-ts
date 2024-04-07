import { Request, Response } from 'express';
import { merge, get } from 'lodash';

export const login = async function (_req: Request, res: Response) {
	res.status(501).json({ message: 'This route is not implemented yet!' });
};

export const signup = async function (_req: Request, res: Response) {
	res.status(501).json({ message: 'This route is not implemented yet!' });
};

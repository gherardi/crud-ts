import { Request, Response } from 'express';
import { merge, get } from 'lodash';
import supabase from '../db/supabase';

import handleAsyncError from '../utils/handleAsyncError';

export const login = async function (_req: Request, res: Response) {
	res.status(501).json({ message: 'This route is not implemented yet!' });
};

export const signup = async function (_req: Request, res: Response) {
	res.status(501).json({ message: 'This route is not implemented yet!' });
};

export const test = handleAsyncError(async function (_req: Request, res: Response) {
	let { data: province, error } = await supabase
		.from('province')
		.select('nome');

	if (error) throw error;

	res.status(200).json({ status: 'succcess', province });
});

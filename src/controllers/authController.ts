import { Request, Response } from 'express';
// import { merge, get } from 'lodash';
// import supabase from '../db/supabase';

import handleAsyncError from '../utils/handleAsyncError';

export const login = handleAsyncError(async function (
	_req: Request,
	res: Response
) {
	res.status(501).json({ message: 'This route is not implemented yet!' });
});

export const signup = handleAsyncError(async function (
	_req: Request,
	res: Response
) {
	res.status(501).json({ message: 'This route is not implemented yet!' });
});

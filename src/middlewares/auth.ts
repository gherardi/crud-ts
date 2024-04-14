import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { merge, get } from 'lodash';

import supabase from '../db/supabase';
import handleAsyncError from '../utils/handleAsyncError';
import { env } from '../utils/env';

export const isAuthenticated = handleAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		let token: string = '';

		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			token = req.headers.authorization.split(' ')[1] as string;
		} else if (req.cookies.jwt) {
			token = req.cookies.jwt;
		}

		if (!token)
			throw new Error('You are not logged in! Please log in to get access');

		// only for postman testing
		if (token === '{{jwt}}')
			throw new Error('You are not logged in! Please log in to get access');

		// 2) Verification token
		const decoded = (await promisify(jwt.verify)(
			token,
			// @ts-ignore
			env.JWT_SECRET
		)) as unknown as { id: string };

		// 3) Check if user still exists
		const { data: user, error } = await supabase
			.from('users')
			.select('*')
			.eq('id', decoded.id)
			.maybeSingle();

		if (error) throw error;
		if (!user) throw new Error('no account found with this id');

		// GRANT ACCESS TO PROTECTED ROUTE
		merge(req, { user });

		next();
	}
);

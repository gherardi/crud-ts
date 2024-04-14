import { Request, Response } from 'express';
// import { merge, get } from 'lodash';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import supabase from '../db/supabase';
import { env } from '../utils/env';

import handleAsyncError from '../utils/handleAsyncError';

interface User {
	id: string;
	email: string;
	password: string;
}

const createToken = (user: User, res: Response) => {
	const token = jwt.sign({ id: user.id }, env.JWT_SECRET, {
		expiresIn: env.JWT_EXPIRES_IN,
	});

	res.cookie('jwt', token, {
		httpOnly: true,
		expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
	});

	res.status(200).json({
		status: 'success',
		token,
		// user,
	});
};

export const signup = handleAsyncError(async function (
	req: Request,
	res: Response
) {
	const { email, password } = req.body;

	if (!email || !password) throw new Error('email and password are required');
	

	const hash = await bcrypt.hash(password, 12);

	const { data: user, error } = await supabase
		.from('users')
		.insert({
			email,
			password: hash,
		})
		.select()
		.maybeSingle();

	if (error) throw error;

	createToken(user, res);
});

export const login = handleAsyncError(async function (
	req: Request,
	res: Response
) {
	const { email, password } = req.body;

	if (!email || !password) throw new Error('email and password are required');

	const { data: user, error } = await supabase
		.from('users')
		.select('*')
		.eq('email', email)
		.maybeSingle();

	if (error) throw error;
	if (!user) throw new Error('no user found with this email address');

	const isCorrectPassword = await bcrypt.compare(password, user.password);
	if (!isCorrectPassword) throw new Error('password is incorrect');

	createToken(user, res);
});

export const logout = handleAsyncError(async function (
	req: Request,
	res: Response
) {
	if (req.cookies.jwt) {
		res.clearCookie('jwt');
	}

	res.status(200).json({ status: 'success' });
});

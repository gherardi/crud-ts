import { Request, Response, NextFunction } from 'express';
import { merge, get } from 'lodash';
import jwt from 'jsonwebtoken';

import { promisify } from 'util';
import { JWT_SECRET } from '../utils/constants';

export const isAuthenticated = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		let token: string = '';

		// 1) Getting token and check of it's there
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			token = req.headers.authorization.split(' ')[1] as string;
		} else if (req.cookies.jwt) {
			token = req.cookies.jwt;
		}

		if (!token) {
			res
				.status(401)
				.json('You are not logged in! Please log in to get access');
			return;
		}

		// 2) Verification token
		const decoded: { id: string } = await promisify(jwt.verify)(
			token,
			JWT_SECRET
		);

		// 3) Check if user still exists
		const currentUser = await User.findById(decoded.id);

		if (!currentUser) {
			res
				.status(401)
				.json('The user belonging to this token does no longer exist.');
			return;
		}

		// 4) Check if user changed password after the token was issued
		if (currentUser.changedPasswordAfter(decoded.iat)) {
			res
				.status(401)
				.json('User recently changed password! Please log in again.');
			return;
		}

		// GRANT ACCESS TO PROTECTED ROUTE
		merge(req, { user: currentUser });

		next();
	} catch (err) {
		res.status(500).json({
			status: 'fail',
			message: 'Invalid token',
			error: (err as Error).message,
		});
	}
};

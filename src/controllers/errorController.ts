import { PostgrestError } from '@supabase/supabase-js';
import { Request, Response, NextFunction } from 'express';

export default function (
	err: Error | PostgrestError,
	_req: Request,
	res: Response,
	_next: NextFunction
) {
	res.status(500).json({ status: 'fail', message: err.message, error: err });
}

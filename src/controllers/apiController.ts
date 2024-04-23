import { Request, Response } from 'express';

import supabase from '../db/supabase';
import handleAsyncError from '../utils/handleAsyncError';

export const getAll = handleAsyncError(async function (
	req: Request,
	res: Response
) {
	let query = req.query.query as string | undefined;

	if (!query) {
		const { data, error } = await supabase.from('province').select('*');
		if (error) throw error;
		res.status(200).json({ status: 'success', data });
		return;
	}
	const { data, error } = await supabase
		.from('province')
		.select('*')
		.ilike('nome', `%${query}%`);

	if (error) throw error;

	res.status(200).json({ status: 'success', data });
});

export const getById = handleAsyncError(async function (
	req: Request,
	res: Response
) {
	const { id } = req.params;
	const { data: province, error } = await supabase
		.from('province')
		.select('*')
		.eq('id', id)
		.maybeSingle();

	if (error) throw error;

	res.status(200).json({ status: 'success', province });
});

export const create = handleAsyncError(async function (
	req: Request,
	res: Response
) {
	const { nome, popolazione, codice, regione } = req.body;

	const { data, error } = await supabase
		.from('province')
		.insert({ nome, popolazione, codice, regione })
		.select('*')
		.single();

	if (error) throw error;

	res.status(200).json({ status: 'success', data });
});

export const updateById = handleAsyncError(async function (
	req: Request,
	res: Response
) {
	const { id } = req.params;
	const { nome, popolazione, codice, regione } = req.body;

	const { data, error } = await supabase
		.from('province')
		.update({ nome, popolazione, codice, regione })
		.eq('id', id)
		.select('*')
		.single();

	if (error) throw error;

	res.status(200).json({ status: 'success', data });
});

export const deleteById = handleAsyncError(async function (
	req: Request,
	res: Response
) {
	const id = req.params.id;

	const { data, error } = await supabase
		.from('province')
		.delete()
		.eq('id', id)
		.select()
		.maybeSingle();

	if (error) throw error;
	if (!data) throw new Error('Province not found with the specified ID');

	res.status(200).json({ status: 'success', data });
});

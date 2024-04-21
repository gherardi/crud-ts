import { Request, Response } from 'express';

import supabase from '../db/supabase';
import handleAsyncError from '../utils/handleAsyncError';
import { get } from 'lodash';

const RES_PER_PAGE = 50;

export const getAll = handleAsyncError(async function (
	req: Request,
	res: Response
) {
	// use the limit and the page query parameters to calculate the start and end value
	let start: number = req.query.page
		? (Number(req.query.page) - 1) * RES_PER_PAGE
		: 0;
	let end: number = start + RES_PER_PAGE - 1;

	const { data, error } = await supabase
		.from('province')
		.select()
		.order('nome', { ascending: req.query.sort === 'asc' })
		.range(start, end);

	// se non è specificato l'ordinamento, mescola i risultati
	// non necessario, ma è un esempio di come potrebbe essere fatto
	if (req.query.sort === undefined) {
		// (data as Tables<'province'>[]).sort(() => Math.random() - 0.5);
	}

	if (error) throw error;

	res.status(200).json({ status: 'success', length: data.length, data });
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

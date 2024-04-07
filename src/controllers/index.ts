import { Tables, Enums } from "../db/database.types";

import { Request, Response } from "express";
import supabase from "../db/supabase";

const RES_PER_PAGE = 50;

export const getAll = async function (req: Request, res: Response) {
  // use the limit and the page query parameters to calculate the start and end value
  let start: number = req.query.page
    ? (Number(req.query.page) - 1) * RES_PER_PAGE
    : 0;
  let end: number = start + RES_PER_PAGE - 1;

  try {
    const { data, error } = await supabase
      .from("province")
      .select()
      .order("nome", { ascending: req.query.sort === "asc" })
      .range(start, end)
      .returns<Tables<"province">[]>();

    // se non è specificato l'ordinamento, mescola i risultati
    // non necessario, ma è un esempio di come potrebbe essere fatto
    if (req.query.sort === undefined) {
      (data as Tables<"province">[]).sort(() => Math.random() - 0.5);
    }

    if (error) throw new Error(error.message);

    res.status(200).json({ status: "success", length: data.length, data });
  } catch (err: Error | any) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const getById = async function (req: Request, res: Response) {
  // const id = req.params.id;
  const { id } = req.params;
  res.status(501).json({ message: "This route is not yet implemented!", id });
};

export const create = async function (_: Request, res: Response) {
  res.status(501).json({ message: "This route is not yet implemented!" });
};

export const updateById = async function (req: Request, res: Response) {
  const { id } = req.params;
  res.status(501).json({ message: "This route is not yet implemented!", id });
};

export const deleteById = async function (req: Request, res: Response) {
  const { id } = req.params;
  res.status(501).json({ message: "This route is not yet implemented!", id });
};

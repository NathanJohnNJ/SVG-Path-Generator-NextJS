import { NextApiRequest, NextApiResponse } from "next";
import { fetchPath } from "@/lib/api";

export default async function handler(req, res){
  if (req.method === 'GET') {
    const path = await fetchPath();
    res.status(200).json(path);
    return path;
  } else {
    res.status(405).end();
  }
}

import type { NextApiRequest, NextApiResponse } from 'next';
const snarkjs = require('snarkjs');
import path from 'path';

type Data = {
  calldata?: {
    a: string;
    b: string[];
  }[];
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'Only POST requests allowed' });
  }

  const body = JSON.parse(req.body);
  const { x, y } = body;

  if (!x && !y) {
    return res.status(400).json({ error: 'Missing x and/or y' });
  }

  const input = { x: x.toString(), y: y.toString() };

  const dir = path.resolve('./public');
  const wasm = dir + '/has-answer.wasm';
  const zkey = dir + '/has-answer.zkey';

  let proof, publicSignals, data;
  try {
    data = await snarkjs.plonk.fullProve(input, wasm, zkey);
    proof = data.proof;
    publicSignals = data.publicSignals;
  } catch (e) {
    return res.status(200).json({ error: 'Failed to generate proof' });
  }

  const solidityCallData = await snarkjs.plonk.exportSolidityCallData(proof, publicSignals);
  let [a, ...b] = solidityCallData.split(',');
  const calldata = [a, JSON.parse(b.join(','))];

  return res.status(200).json({ calldata });
}

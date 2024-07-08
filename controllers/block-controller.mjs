import { pubnubServer } from "../server.mjs";
import { blockchain } from '../server.mjs'

export const mineBlock = (req, res, next) => {
    const { data } = req.body;

    const block = blockchain.addBlock({ data });

    pubnubServer.broadcastChain();

    res.status(201).json({ status: 'success', statusCode: 201, data: block });

};
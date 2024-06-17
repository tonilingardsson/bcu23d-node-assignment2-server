import express from 'express';
import Blockchain from './models/Blockchain.mjs';
import blockRouter from '.routes/block-routes.mjs';
import blockchainRouter from '.routes/blockchain-routes.mjs';
// import cors from 'cors';
import PubnubServer from './pubnubServer.mjs';

export const blockchain = new Blockchain();
export const pubnubServer = new PubnubServer({
    publishKey: process.env.PUBNUB_PUBLISH_KEY,
    subscribeKey: process.env.PUBNUB_SUBSCRIBE_KEY,
    secretKey: process.env.PUBNUB_SECRET_KEY,
    blockchain: new Blockchain(),
});

const app = express();
// app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const ROOT_NODE = `http://localhost:${PORT}`;

let NODE_PORT;

setTimeout(() => {
    pubnubServer.broadcastChain();
}, 1000);

app.use('/api/blockchain', blockchainRouter);
app.use('/api/blocks', blockRouter);

const synchronize = async () => {
    const response = await fetch(`${ROOT_NODE}/api/v1/blockchain`);
    if (response.ok) {
        const result = await response.json();
        console.log('SYNCHRONIZE', result.data);
        blockchain.replaceChain(result.data);
    }
};

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
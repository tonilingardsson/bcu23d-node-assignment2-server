import express from 'express';
import dotenv from 'dotenv';
import Blockchain from './models/Blockchain.mjs';
import blockRouter from './routes/block-routes.mjs';
import blockchainRouter from './routes/blockchain-routes.mjs';
// import cors from 'cors';
import PubnubServer from './pubnubServer.mjs';

export const blockchain = new Blockchain();
export const pubnubServer = new PubnubServer({
    publishKey: process.env.PUBNUB_PUBLISH_KEY,
    subscribeKey: process.env.PUBNUB_SUBSCRIBE_KEY,
    secretKey: process.env.PUBNUB_SECRET_KEY,
    blockchain
});

const app = express();
// app.use(cors());
app.use(express.json());

const DEFAULT_PORT = 5000;
const ROOT_NODE = 'http://localhost:5000';

let NODE_PORT;

setTimeout(() => {
    pubnubServer.broadcastChain();
}, 1000);

app.use('/api/v1/blockchain', blockchainRouter);
app.use('/api/v1/blocks', blockRouter);

const synchronize = async () => {
    const response = await fetch(`${ROOT_NODE}/api/v1/blockchain`);
    if (response.ok) {
        const result = await response.json();
        console.log('SYNCHRONIZE', result.data);
        blockchain.replaceChain(result.data);
    }
};

if (process.env.GENERATE_NODE_PORT === 'true') {
    NODE_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = NODE_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    if (PORT !== DEFAULT_PORT) {
        synchronize();
    }
})

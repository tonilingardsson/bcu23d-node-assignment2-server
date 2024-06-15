import hexToBinary from "hex-to-binary";
import Blockchain from "../models/Blockchain.mjs";

const blockchain = new Blockchain();

blockchain.addBlock({ data: 'Web Development. File: test-proof-of-work.mjs' });
let hash = blockchain.chain.at(-1).hash;
console.log('fist block binary', hexToBinary(hash));

console.log('first block: ', blockchain.chain.at(-1).hash);
let prevBlockTime, thisBlockTime, nextBlockTime, timeDiff, averageTime;

const times = [];

for (let i = 0; i < 10000; i++) {
    prevBlockTime = blockchain.chain.at(-1).timestamp;
    blockchain.addBlock({ data: `block: ${i}` });

    nextBlockTime = blockchain.chain.at(-1);
    thisBlockTime = nextBlockTime.timestamp;
    timeDiff = thisBlockTime - prevBlockTime;
    times.push(timeDiff);

    averageTime = times.reduce((acc, value) => (acc + value)) / times.length;

    console.log(
        `Time to mine block ${i}: ${timeDiff}ms. Difficulty: ${nextBlockTime.difficulty}. Average time: ${averageTime}ms`,
    );
}
import { MINING_REWARD, REWARD_ADDRESS } from '../config/settings.mjs';
import Block from '../models/Block.mjs';
import { createHash } from '../utilities/crypto-lib.mjs';
import Transaction from './Transaction.mjs';

export default class Blockchain {
    constructor() {
        this.chain = [Block.genesis];
    }

    // Instance method... Method that are on the object created in the blockchain class.
    addBlock({ data }) {
        const newBlock = Block.mineBlock({
            lastBlock: this.chain.at(-1),
            data: data,
        });
        this.chain.push(newBlock);
        return newBlock;
    }

    replaceChain(chain, shouldValidate, callback) {
        if (chain.length <= this.chain.length) return;
        if (!Blockchain.validateChain(chain)) return;

        if (shouldValidate && !this.validateTransactionData({ chain })) return;

        if (callback) callback();

        // Is the incoming chain is longer and valid, replace the chain with it.
        this.chain = chain;
    }

    static validateTransactionData({ chain }) {
        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const transactionSet = new Set();
            let counter = 0;

            for (let transaction of block.data) {
                if (transaction.inputMap.address === REWARD_ADDRESS.address) {
                    counter++;

                    if (counter > 1) return false;

                    if (Object.values(transaction.outputMap)[0] !== MINING_REWARD)
                        return false;
                } else {
                    if (!Transaction.validate(transaction)) return false;
                    if (transactionSet.has(transaction)) return false;
                    else {
                        transactionSet.add(transaction);
                    }
                }
            }
        }

        return true;
    }

    static validateChain(chain) {
        // Rule 1. Have the correct genesis block
        if (JSON.stringify(chain.at(0)) !== JSON.stringify(Block.genesis))
            return false;

        for (let i = 1; i < chain.length; i++) {
            const { timestamp, hash, lastHash, data, nonce, difficulty } =
                chain.at(i);
            const currentLastHash = chain[i - 1].hash;
            const lastDifficulty = chain[i - 1].difficulty;
            // Rule 2. Last block's hash must match the current block's lastHash.
            if (lastHash !== currentLastHash) return false;

            // Protect against difficulty adjustments
            if (Math.abs(lastDifficulty - difficulty) > 1) return false;

            // Rule 3. Check that the block's data is valid.
            const validHash = createHash(
                timestamp,
                lastHash,
                data,
                nonce,
                difficulty
            );
            if (hash !== validHash) return false;
        }
        return true;
    }
}

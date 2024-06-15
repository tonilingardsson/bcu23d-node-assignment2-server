import Block from "../models/Block.mjs";
import { createHash } from "../utilities/crypto-lib.mjs";

export default class Blockchain {
    constructor() {
        this.chain = [Block.genesis];
    }

    // Instance method... Method that are on the object created in the blockchain class.
    // In the blocks we have static methods which have direct access to the class, so we don't need to create an instance of the class.
    addBlock({ data }) {
        const newBlock = Block.mineBlock({ lastBlock: this.chain.at(-1), data: data })
        this.chain.push(newBlock);
    }

    static validateChain(chain) {
        // Rule 1. Have the correct genesis block
        if (JSON.stringify(chain.at(0)) !== JSON.stringify(Block.genesis)) return false;

        for (let i = 1; i < chain.length; i++) {
            const { timestamp, hash, lastHash, data } = chain.at(i);
            const currentLastHash = chain[i - 1].hash;
            // Rule 2. Last block's hash must match the current block's lastHash.
            if (lastHash !== currentLastHash) return false;

            // Rule 3. Check that the block's data is valid.
            const validHash = createHash(timestamp, lastHash, data);
            if (hash !== validHash) return false;

        }
        return true;
    }
}
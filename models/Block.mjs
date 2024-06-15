import { GENESIS_DATA, MINE_RATE } from "../config/settings.mjs";
import { createHash } from "../utilities/crypto-lib.mjs";

export default class Block {
    constructor({ timestamp, lastHash, hash, data, nonce, difficulty }) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    // Creating a GETTER, a property
    static get genesis() {
        return new this(GENESIS_DATA);
    }

    static mineBlock({ lastBlock, data }) {
        const lastHash = lastBlock.hash;
        const { difficulty } = lastBlock;

        let hash, timestamp;
        let nonce = 0;

        do {
            nonce++;
            timestamp = Date.now();
            hash = createHash(timestamp, lastHash, data, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));



        return new this({
            // This is dummy data.
            timestamp,
            lastHash,
            hash,
            data,
            nonce,
            difficulty
        })
    }

    static adjustDifficultyLevel({ block, timestamp }) {
        // Let's fetch the difficulty from the last block
        const { difficulty } = block;

        if (timestamp - block.timestamp > MINE_RATE) {
            return difficulty - 1;
        }
        return difficulty + 1;
    }
}

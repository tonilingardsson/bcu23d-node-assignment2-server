import { GENESIS_DATA } from "../config/settings.mjs";

export default class Block {
    constructor({ timestamp, lastHash, hash, data }) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    // Creating a GETTER, a property
    static get genesis() {
        return new this(GENESIS_DATA);
    }
}

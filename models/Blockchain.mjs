import Block from "../models/Block.mjs";

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
}
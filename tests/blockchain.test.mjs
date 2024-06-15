import { describe, it, expect, beforeEach } from "vitest";
import Block from "../models/Block.mjs";
import Blockchain from "../models/Blockchain.mjs";

describe('Blockchain', () => {
    let blockchain;

    // For every test we want a new instance of the blockchain.
    beforeEach(() => {
        blockchain = new Blockchain();
    });

    // Test 1 - The blockchain should have the property `chain`.
    it('should contain a `chain` Array instance', () => {
        expect(blockchain).toHaveProperty('chain');
    });

    // Test 2 - Check so the 'chain' is of the type Array.
    it('should contain a `chain` Array instance', () => {
        expect(blockchain.chain).toBeInstanceOf(Array);
    });

    // Test 3 - Check so the first block in the chain is a `genesis` block.
    it('should have the genesis block as the first block in the chain', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis);
    });
})
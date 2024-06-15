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

    it('should add a new block to the chain', () => {
        const data = 'demo block';
        blockchain.addBlock({ data: data });
        expect(blockchain.chain.at(-1).data).toEqual(data);
    });

    describe('Validate chain', () => {
        // Step 1. Validate the genesis block
        describe('when the chain does not start with the correct genesis block', () => {
            it('should return false', () => {
                blockchain.chain[0] = { data: 'Fake genesis!' };
                expect(Blockchain.validateChain(blockchain.chain)).toBe(false);
            })
        })
        // Step 2. Validate the blockchain, which has the correct genesis block, and all other blocks.
        describe('when the chain start with the correct genesis and has multiple blocks', () => {
            beforeEach(() => {
                blockchain.addBlock({ data: 'Web Development' });
                blockchain.addBlock({ data: 'Mobile Development' });
                blockchain.addBlock({ data: 'Cloud Development' });
            })

            describe('and one of the blocks lastHash has changed', () => {
                it('should return false', () => {
                    blockchain.chain[1].lastHash = 'broken-lastHash';
                    expect(Blockchain.validateChain(blockchain.chain)).toBe(false);
                })
            })

            describe('and one of the blocks data has changed. It is not valid.', () => {
                it('should return false', () => {
                    blockchain.chain[2].data = 'broken-data';
                    expect(Blockchain.validateChain(blockchain.chain)).toBe(false);
                })
            })
            // Step 3. In case any of the existing blocks is invalid, return false.
            describe('and the chain is valid', () => {
                it('should return true', () => {
                    expect(Blockchain.validateChain(blockchain.chain)).toBe(true);
                })
            })
        })
    })
})
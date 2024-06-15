import { describe, it, expect, beforeEach } from 'vitest';
import { createHash } from '../utilities/crypto-lib.mjs';
import Block from '../models/Block.mjs';
import { GENESIS_DATA } from '../config/settings.mjs';

describe('Block', () => {
    describe('Properties', () => {
        const timestamp = Date.now();
        const lastHash = '0';
        const hash = '0';
        const data = {
            amount: 10,
            sender: 'Antonio',
            recipient: 'Michael',
        };

        const block = new Block({
            timestamp: timestamp,
            lastHash: lastHash,
            hash: hash,
            data: data,
        });

        it('should have the properties: timestamp, lastHash, hash, data', () => {
            expect(block).toHaveProperty('timestamp');
            expect(block).toHaveProperty('lastHash');
            expect(block).toHaveProperty('hash');
            expect(block).toHaveProperty('data');
        });

        it('should have values for the properties', () => {
            expect(block.timestamp).toEqual(timestamp);
            expect(block.lastHash).toEqual(lastHash);
            expect(block.hash).toEqual(hash);
            expect(block.data).toEqual(data);
        });
    })

    describe('Genesis Block', () => {
        const genesis = Block.genesis;

        it('should return an instance of Block class', () => {
            expect(genesis).toBeInstanceOf(Block);
        });

        it('should return the genesis data', () => {
            expect(genesis).toEqual(GENESIS_DATA);
        });
    })

    describe('Mine Block', () => {
        let lastBlock, data, minedBlock;

        // Inför varje test, kör den här funktionen. 
        // Varje gång jag kör mina tester, jag får tag av det senaste blocket.
        // För tillfället det sista blocket är genesis blocket.
        beforeEach(() => {
            lastBlock = Block.genesis;
            data = { message: 'demo' };
            minedBlock = Block.mineBlock({ lastBlock, data });
        })

        it('should return an instance of Block class', () => {
            expect(minedBlock).toBeInstanceOf(Block);
        });

        it('should add a timestamp to the block', () => {
            expect(minedBlock.timestamp).not.toBeUndefined();
        });

        it('should set the `lastHash` to be the `hash` of the last block', () => {
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        });

        it('should set the data', () => {
            expect(minedBlock.data).toEqual(data);
        });

        it('should set a `hash` based on correct input (or difficulty', () => {
            expect(minedBlock.hash).toEqual(createHash(minedBlock.timestamp, minedBlock.lastHash, data)
            );
        })
    })
})
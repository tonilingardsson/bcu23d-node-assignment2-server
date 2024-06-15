import { describe, it, expect, beforeEach } from 'vitest';
import Block from './Block.mjs';

describe('Block', () => {
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

    describe('Block', () => {
        it('should have the properties: timestamp, lastHash, hash, data', () => {
            expect(block).toHaveProperty('timestamp');
            expect(block).toHaveProperty('lastHash');
            expect(block).toHaveProperty('hash');
            expect(block).toHaveProperty('data');
        });
    });
    describe('should have values for the properties', () => {
        it('second ', () => {
            expect(block.timestamp).toEqual(timestamp);
            expect(block.lastHash).toEqual(lastHash);
            expect(block.hash).toEqual(hash);
            expect(block.data).toEqual(data);

        });
    });
});

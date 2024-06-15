import { describe, it, expect } from "vitest";
import { createHash } from "../utilities/crypto-lib.mjs";

describe('Hashing', () => {
    it('should create a hash with supplied arguments in any order', () => {
        expect(createHash('anka', 'kalle')).toEqual(createHash('kalle', 'anka'));
    });
});
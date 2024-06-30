import { it, describe, expect, beforeEach } from 'vitest';
import Transaction from '../models/Transaction.mjs';
import { verifySignature } from '../utilities/crypto-lib.mjs';
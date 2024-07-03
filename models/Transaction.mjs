import { v4 as uuidv4 } from 'uuid';
import { verifySignature } from '../utilities/crypto-lib.mjs';

export default class Transaction {
    constructor(sender, recipient, amount) {
        this.id = 1;
        this.outputMap = {};
        this.inputMap = {};
    }
}
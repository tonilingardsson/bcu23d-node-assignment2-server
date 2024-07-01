import { INITIAL_BALANCE } from '../config/settings.mjs'
import { ellipticHash } from '../utilities/crypto-lib.mjs';

export default class Wallet {
    constructor() {
        this.balance = INITIAL_BALANCE;
        this.keyPair = ellipticHash.genKeyPair();
        this.publicKey = this.keyPair.getPublic();
    }
}
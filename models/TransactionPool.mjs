import Transaction from './Transaction.mjs';

export default class TransactionPool {
    constructor() {
        this.transactionMap = [];
    }
    addTransaction({ transaction }) {
        this.transactionMap[transaction.id] = transaction;
    }
    existingTransaction({ address }) {
        const transactions = Object.values(this.transactionMap);

        return transactions.find(
            (transaction) => transaction.inputMap.address === address
        );
    }
}

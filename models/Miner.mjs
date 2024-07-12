import Transaction from "./Transaction.mjs";

export default class Miner {
    constructor({ blockchain, wallet, transactionPool, pubsub }) {
        this.blockchain = blockchain;
        this.wallet = wallet;
        this.transactionPool = transactionPool;
        this.pubsub = pubsub;
    }

    mineTransaction() {
        // 1. Fetch all the valid transactions
        const validateTransactions = this.transactionPool.validateTransactions();
        // 2. Create a reward transaction... NOT COMPLETELY OK YET
        validateTransactions.push(
            Transaction.transactionReward({ miner: this.wallet })
        );
        // 3. Add a block to the blockchain with the valid transactions and place it in the blockchain
        this.blockchain.addBlock({ data: validateTransactions });
        // 4. Distribute the blockchain to all the nodes
        this.pubsub.broadcastChain();
        // 5. Clear the transaction pool
        this.transactionPool.clearTransactions();
    }
}
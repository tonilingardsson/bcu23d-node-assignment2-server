import Pubnub from 'pubnub';

const CHANNELS = {
    DEMO: 'DEMO',
    BLOCKCHAIN: 'BLOCKCHAIN',
    TRANSACTION: 'TRANSACTION',
};

export default class PubnubServer {
    constructor({ blockchain, credentials, transactionPool, wallet }) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.pubnub = new Pubnub(credentials);
        this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
        this.pubnub.addListener(this.listener());
    }

    broadcastChain() {
        this.publish({
            channel: CHANNELS.BLOCKCHAIN,
            // Pubnub needs to receive a string, not an object (which is our blockchain).
            message: JSON.stringify(this.blockchain.chain),
        });
    }

    broadcastTransaction(transaction) {
        this.publish({
            channel: CHANNELS.TRANSACTION,
            message: JSON.stringify(transaction),
        });
    }
    listener() {
        return {
            message: (msgObject) => {
                const { channel, message } = msgObject;
                const msg = JSON.parse(message);
                console.log(
                    `Message received. Channel: ${channel} Message: ${message}.`
                );

                // If the message is a block, add it to the blockchain.
                // if (channel === CHANNELS.BLOCKCHAIN) {
                //     this.blockchain.replaceChain(msg);
                // }
                // We replace the if statement with the following.
                switch (channel) {
                    case CHANNELS.BLOCKCHAIN:
                        this.blockchain.replaceChain(msg, true, () => {
                            this.transactionPool.clearBlockchainTransactions({
                                chain: msg,
                            });
                        });
                        break;
                    case CHANNELS.TRANSACTION:
                        if (
                            !this.transactionPool.existingTransaction({
                                address: this.wallet.publicKey,
                            })
                        ) {
                            this.transactionPool.addTransaction(msg);
                        }
                        break;
                    default:
                        return;
                }
            },
        };
    }

    publish({ channel, message }) {
        this.pubnub.publish({ channel, message });
    }
}

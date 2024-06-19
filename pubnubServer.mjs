import Pubnub from "pubnub";
import dotenv from 'dotenv';

dotenv.config();

const CHANNELS = {
    DEMO: 'DEMO',
    BLOCKCHAIN: 'BLOCKCHAIN'
};

// I am using a .env file to store the Pubnub credentials.
const pubnubCredentials = {
    publishKey: process.env.PUBNUB_PUBLISH_KEY,
    subscribeKey: process.env.PUBNUB_SUBSCRIBE_KEY,
    secretKey: process.env.PUBNUB_SECRET_KEY,
    userId: process.env.PUBNUB_USER_ID
};
export default class PubnubServer {
    // This constructor takes in our blockchain as a parameter, object destructuring. 
    // And importing Pubnub.
    constructor({ publishKey, subscribeKey, secretKey, blockchain }) {
        this.blockchain = blockchain;
        // This is our Pubnub instance. It will connect the app to the cloud.
        this.pubnub = new Pubnub(pubnubCredentials);
        // Set up the subscription to our channel. Pubnub makes it easy to create channels.
        this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
        // Listen for messages on our channel. It takes in a callback function.
        this.pubnub.addListener(this.listener());
        // Set up the listener method. As an object that returns a message method.
    }
    listener() {
        return {
            message: msgObject => {
                const { channel, message } = msgObject;
                // The message is a string. We need to parse it to an object.
                const msg = JSON.parse(message);
                console.log(`Message received. Channel: ${channel} Message: ${message}.`);

                // If the message is a block, add it to the blockchain.
                if (channel === CHANNELS.BLOCKCHAIN) {
                    this.blockchain.replaceChain(msg);
                }
            },
        };
    }
    // We need a publish and a broadcast method.
    subscribeToChannels() { }

    // Publish is the method that will publish messages that the listener will receive.
    publish({ channel, message }) {
        // It uses Pubnub's publish method, which sends a message to a channel. This will be received by the listener.
        this.pubnub.publish({ channel, message });
    }

    broadcastChain() {
        this.publish({
            channel: CHANNELS.BLOCKCHAIN,
            // Pubnub needs to receive a string, not an object (which is our blockchain).
            message: JSON.stringify(this.blockchain.chain),
        });
    }


}


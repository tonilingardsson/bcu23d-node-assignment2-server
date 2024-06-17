export const MINE_RATE = 1000;// 1000 ms = 1 second
export const STARTING_BALANCE = 100;
const INITIAL_DIFFICULTY = 3;

export const GENESIS_DATA = {
    timestamp: Date.now(),
    lastHash: '0',
    hash: '0',
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    data: []
}
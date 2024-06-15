import crypto from 'crypto';

// Spread operator for an array (...args) is for passing multiple arguments
export const createHash = (...args) => {
    return crypto.createHash('sha256')
        .update(args.sort().join(''))
        .digest('hex');
};
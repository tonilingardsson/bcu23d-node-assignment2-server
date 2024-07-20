import mongoose from 'mongoose';

const chainSchema = new mongoose.Schema({
    chain: { type: [Object], required: [true, 'Chain expected'] },
});

export default mongoose.model('Chain', chainSchema);
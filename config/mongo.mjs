import mongoose from "mongoose";
export const connectDb = async () => {
    const mongoConn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected to: ${mongoConn.connection.host}`);
}
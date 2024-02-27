import mongoose from "mongoose";

const CONNECTION_STRING: string | undefined = process.env.MONGODB;
if (typeof CONNECTION_STRING === "string") {
    await mongoose.connect(CONNECTION_STRING, {});
} else {
    throw new Error("MONGODB environment variable is not defined");
}
export const Code = mongoose.models.Code || mongoose.model("Code", new mongoose.Schema({
    code: String,
    delay: Number,
    date: Date
}));

export const LHP = mongoose.models.LHP || mongoose.model("LHP", new mongoose.Schema({
    LHP: String,
    secret: String
}));

export default mongoose;
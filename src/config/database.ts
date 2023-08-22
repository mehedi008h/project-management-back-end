import mongoose from "mongoose";
import "dotenv/config";

export const connectDatabase = () => {
    mongoose.connect(`${process.env.DB_URI}`).then((con: any) => {
        console.log(
            `MongoDB Database connected with HOST: ${con.connection.host}`
        );
    });
};

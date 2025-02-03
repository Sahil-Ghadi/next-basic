import mongoose from "mongoose";

export async function connect() {
    try {
         mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;

        connection.on('connected',() => {
            console.log("mongo db connected successfully"); 
        })
        connection.on('error',(err) => {
            console.log("mongo db connection errror "); 
            process.exit(1);
        })

    } catch (error) {
        console.log("somthin went wrong ",error);
        
    }
}
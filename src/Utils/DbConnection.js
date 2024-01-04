import mongoose from "mongoose";
mongoose.set("strictQuery", false);


let isConnected = false;

export const Connection = async () => {

    if (isConnected) {
        console.log('=> using existing database connection');
        return;
    }

    try {
        
        await mongoose.connect(process.env.MONGODB_URI);

        isConnected = true;
        console.log('=> using new database connection');

    } catch (error) {
        console.log("An error was detected",error);
        
    }

}


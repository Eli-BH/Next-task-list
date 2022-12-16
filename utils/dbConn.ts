/* This is a database connection function*/
import mongoose from "mongoose";


const connection: any = {}; /* creating connection object*/

async function dbConnect() {
    /* check if we have connection to our databse*/
    if (connection.isConnected) {
        return;
    }

    /* connecting to our database */
    const db: any = await mongoose.connect(`mongodb://localhost:27017/demo`);

    console.log('mongo connected')

    connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;

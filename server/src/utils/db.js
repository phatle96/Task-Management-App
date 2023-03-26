// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const mongoDB = process.env.MONGODB_URL;

module.exports = {
    async connect() {
        try {
            await mongoose.connect(mongoDB);
            console.log(`DB is connected to ${mongoDB}`);
        } catch (err) {
            console.log(`Could not connect to DB (${mongoDB})`);
        }
    },
    async disconnect() {
        try {
            await mongoose.disconnect();
            await mongoose.connection.close();
            console.log('DB is disconnected')
        } catch (err) {
            console.log('Could not disconnect to DB');
        }
    }
}


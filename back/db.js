// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const mongoDB = process.env.MONGODB_URL;

module.exports = {
    async connect() {
        try {
            await mongoose.connect(mongoDB)
        } catch (err) {
            console.log(err)
        }
    },
    async disconnect() {
        try {
            await mongoose.connection.close()
        } catch (err) {
            console.log(err)
        }
    }
}


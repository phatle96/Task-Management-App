"use strict"

const createServer = require("./utils/app");
const db = require("./utils/db");

const port = process.env.PORT ? process.env.PORT : '8080';

const app = createServer();
app.listen(port, async () => {
	console.log(`App is running at http://localhost:${port}`);

	await db.connect()
}
)

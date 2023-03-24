"use strict"

const app = require("./utils/app");
const db = require("./utils/db");

const port = process.env.PORT ? process.env.PORT : '8080';

app.listen(port, async () => {
	console.log(`App is running at http://localhost:${port}`);

	await db.connect()
}
)

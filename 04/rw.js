const fs = require("fs");

const fileName = "../03/main.js";

fs.readFile(fileName, (err, data) => {
	if (err) {
		console.log(err);
		return;
	}
	if (!fs.existsSync("./temp")) {
		fs.mkdirSync("./temp");
	}

	fs.writeFile(
		"./temp/new.js",
		`${data.toString()}console.log('hi')`,
		(err) => {
			if (err) {
				console.log(err);
				return;
			}
		}
	);
});

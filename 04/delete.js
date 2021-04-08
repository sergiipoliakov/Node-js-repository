const fs = require("fs");

fs.unlink("./temp/new.js", (err) => {
	if (err) {
		console.log(err);
		return;
	}

	fs.rmdir("./temp", (err) => {
		if (err) {
			console.log(err);
			return;
		}
	});
});

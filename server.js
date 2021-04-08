const http = require("http");
const fs = require("fs").promises;
const url = require("url");

const TypeMime = {
	".html": "text/html",
	".htm": "text/html",
	".js": "text/javascript",
	".css": "text/css",
	".png": "image/png",
	".jpg": "image/jpeg",
	".ico": "",
};

http
	.createServer(async (req, res) => {
		const { pathname } = url.parse(req.url);

		console.log(req.url);
		let filename = pathname.substring(1);
		switch (pathname) {
			case "./":
				filename = "index.html";
				break;
			default:
				break;
		}
		const content = await fstat.readFile("index/html");
		res.writeHead(200, { "Content-type": "text/html" });
		res.write(content);
		res.end();
	})
	.listen(3000, () => {
		console.log("Listen server on port 3000");
	});

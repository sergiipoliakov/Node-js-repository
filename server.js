const http = require("http");
const fs = require("fs").promises;
const url = require("url");
const path = require("path");

const TypeMime = {
	".html": "text/html",
	".htm": "text/html",
	".js": "text/javascript",
	".css": "text/css",
	".png": "image/png",
	".jpg": "image/jpeg",
	".ico": "image/x-icon",
};

http
	.createServer(async (req, res) => {
		const { pathname } = url.parse(req.url);

		console.log(req.url);
		let filename = pathname.substring(1);
		switch (pathname) {
			case "/":
				filename = "index.html";
				break;
			case "/contact":
				filename = "contact.html";
				break;
			case "/blog":
				filename = "blog.html";
				break;
			default:
				break;
		}
		const content = await fs.readFile(filename);
		const contentType = TypeMime[path.extname(filename)];
		res.writeHead(200, { "Content-type": contentType });
		res.write(content);
		res.end();
	})
	.listen(3000, () => {
		console.log("Listen server on port 3000");
	});

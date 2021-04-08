const path = require("path");

console.log(path.normalize("/foo/bar//baz/asdf/quux/.."));

console.log(path.resolve("/foo/bar", "./baz"));

console.log(path.resolve("/foo/bar", "/tmp/file/"));

console.log(path.resolve("wwwroot", "static_files/png/", "../gif/image.gif"));

console.log(path.join("/foo", "bar", "baz/asdf", "quux", ".."));

process.argv.forEach((val, index) => {
	console.log(`${index}: ${val}`);
});
process.on("exit", (code) => {
	console.log(`Exit ${code}`);
});

console.log(process.cwd());
process.exit(1);

console.log(__dirname);
console.log(__filename);

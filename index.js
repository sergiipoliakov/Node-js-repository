console.log(444);
console.log(__filename);
console.log(__dirname);

console.log(`Current directory: ${process.cwd()}`);
console.log(`Starting directory: ${process.cwd()}`);
console.log(`Starting directory: ${process.cwd()}`);
try {
	process.chdir("/tmp");
	console.log(`New directory: ${process.cwd()}`);
} catch (err) {
	console.error(`chdir: ${err}`);
}

process.nextTick(function () {
	console.log("NextTick callback");
});

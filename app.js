const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const app = express();
const { articles } = require("./data/data.json");
const port = 3000;

app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.render("index", { name: "Виталий" });
});

//

app.get("/contact", (req, res) => {
	res.render("contact");
});

app.post("/contact", async (req, res) => {
	await fs.writeFile(
		path.join(__dirname, "data", "form.json"),
		JSON.stringify(req.body, null, 2)
	);

	res.redirect("/contact");
});

//

app.get("/blog", (req, res) => {
	res.render("blog", { articles });
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

const express = require("express");
const cors = require("cors");
const app = express();

const { HttpCode } = require("./helpers/constants");
const routerCats = require("./api/cats");

app.use(cors());
app.use(express.json());

app.use("/api/cats", routerCats);

app.use((req, res, next) => {
	res.status(HttpCode.NOT_FOUND).json({
		status: "error",
		code: HttpCode.NOT_FOUND,
		message: `Use api on routes ${req.baseUrl}/api/cats`,
		data: "Not Found",
	});
});

app.use((err, req, res, next) => {
	err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR;
	res.status(err.status).json({
		status: err.status === 500 ? "fail" : "error",
		code: err.status,
		message: err.message,
		data: err.status === 500 ? "Internal Server Error" : err.data,
	});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server running. Use Our API on port: ${PORT}`);
});

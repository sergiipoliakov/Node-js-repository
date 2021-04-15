const express = require("express");
const got = require("got");
const router = express.Router();
require("dotenv").config();

router.get("/", async (req, res, next) => {
	const { lat, lon } = req.query;

	try {
		const response = await got(
			"https://api.openweathermap.org/data/2.5/weather",
			{
				searchParams: { lat, lon, appid: process.env.API_KEY },
			}
		);
		const data = JSON.parse(response.body);
		res.json(data);
	} catch (error) {
		next(error);
	}
});

module.exports = router;

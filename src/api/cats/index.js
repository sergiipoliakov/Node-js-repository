const express = require("express");

const router = express.Router();

router
	.get("/", controlerCats.getAll)
	.get("/:id", controlerCats.getbyId)
	.post("/", controlerCats.create)
	.put("/:id", controlerCats.update)
	.get("/:id/vaccinated", controlerCats.updateStatus)
	.delete("/:id", controlerCats.romove);

module.exports = router;

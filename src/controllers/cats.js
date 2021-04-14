const { HttpCode } = require("../helpers/constants");
const { CatsService } = require("../services");

const catService = new CatsService();

const getAll = (req, res, next) => {
	try {
		const cats = catService.getAll();
		res.status(HttpCode.OK).json({
			status: "success",
			code: HttpCode.OK,
			data: {
				cats,
			},
		});
	} catch (error) {
		next(error);
	}
};

const getById = (req, res, next) => {
	try {
		const cat = catService.getById(req.params);
		if (cat) {
			return res.status(HttpCode.OK).json({
				status: "success",
				code: HttpCode.OK,
				data: {
					cat,
				},
			});
		} else {
			return next({
				status: HttpCode.NOT_FOUND,
				message: "Not found cat",
				data: "Not Found",
			});
		}
	} catch (error) {
		next(error);
	}
};

const create = (req, res, next) => {
	try {
		const cat = catService.create(req.body);
		res.status(HttpCode.CREATED).json({
			status: "success",
			code: HttpCode.CREATED,
			data: {
				cat,
			},
		});
	} catch (error) {
		next(error);
	}
};

const update = (req, res, next) => {
	try {
		const cat = catService.update(req.params, req.body);
		if (cat) {
			return res.status(HttpCode.OK).json({
				status: "success ",
				code: HttpCode.OK,
				data: {
					cat,
				},
			});
		} else {
			return next({
				status: HttpCode.NOT_FOUND,
				message: "Not found cat",
				data: "Not Found",
			});
		}
	} catch (error) {
		next(error);
	}
};
const updateStatus = (req, res, next) => {
	try {
		const cat = catService.update(req.params, req.body);
		if (cat) {
			return res.status(HttpCode.OK).json({
				status: "success",
				code: HttpCode.OK,
				data: {
					cat,
				},
			});
		} else {
			return next({
				status: HttpCode.NOT_FOUND,
				message: "Not found cat",
				data: "Not Found",
			});
		}
	} catch (error) {
		next(error);
	}
};
const remove = (req, res, next) => {
	try {
		const cat = catService.remove(req.params);
		if (cat) {
			return res.status(HttpCode.OK).json({
				status: "success",
				code: HttpCode.OK,
				data: {
					cat,
				},
			});
		} else {
			return next({
				status: HttpCode.NOT_FOUND,
				message: "Not found cat",
				data: "Not Found",
			});
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAll,
	getById,
	create,
	update,
	updateStatus,
	remove,
};

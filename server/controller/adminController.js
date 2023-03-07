const db = require("../sequelize/models");
// const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { sequelize } = require("../sequelize/models");

module.exports = {
	salesReport: async (req, res) => {
		const token = req.headers;
		const { filter, report, sort } = req.query;
		const filterBy = filter ? filter.split("/") : "";
		const sortBy = sort ? sort.split("-") : "";
		console.log(filterBy);
		console.log(token.token);
		let admin_branch_id;
		let data;

		try {
			let admin = await db.user.findOne({
				where: {
					uid: token.token,
				},
				include: { model: db.branch, attributes: [["id", "branch_id"]] },
			});

			// console.log(admin.dataValues.role,'masuk')
			let role = admin.dataValues.role;
			if (role === "branch admin") {
				admin_branch_id = admin.dataValues.branches[0].dataValues.branch_id;
			}

			console.log(admin_branch_id, "dari sini");
			if (role === "super admin") {
				// 1. Report by User
				if (report === "user") {
					// 1.1 report by user using date range filter
					if (filterBy) {
						// 1.1.a report user using date range and make the list asc/ desc
						if (sortBy[0] === "date") {
							data = await db.transaction.findAll({
								attributes: [
									"user_id",
									"createdAt",
									"invoice_no",
									[sequelize.fn("sum", sequelize.col("price")), "total_price"],
									[sequelize.fn("sum", sequelize.col("qty")), "total_qty"],
								],
								where: {
									createdAt: {
										[Op.between]: [
											new Date(filterBy[0]),
											new Date(filterBy[1]),
										],
									},
								},
								group: ["invoice_no", "user_id"],
								include: { model: db.user, attributes: ["name"] },
								order: [["createdAt", sortBy[1]]], //sort nya masuk kesini
							});
							//1.1.b report user using date range and make the list from income asc/desc
						} else if (sortBy[0] === "income") {
							data = await db.transaction.findAll({
								attributes: [
									"user_id",
									"createdAt",
									"invoice_no",
									[sequelize.fn("sum", sequelize.col("price")), "total_price"],
									[sequelize.fn("sum", sequelize.col("qty")), "total_qty"],
								],
								where: {
									createdAt: {
										[Op.between]: [
											new Date(filterBy[0]),
											new Date(filterBy[1]),
										],
									},
								},
								group: ["invoice_no", "user_id"],
								include: { model: db.user, attributes: ["name"] },
								order: [["total_price", sortBy[1]]], //sort nya masuk kesini
							});
							//1.1.c report by user with date range and without sort
						} else {
							data = await db.transaction.findAll({
								attributes: [
									"user_id",
									"createdAt",
									"invoice_no",
									[sequelize.fn("sum", sequelize.col("price")), "total_price"],
									[sequelize.fn("sum", sequelize.col("qty")), "total_qty"],
								],
								group: ["invoice_no", "user_id"],
								include: { model: db.user, attributes: ["name", "id"] },
								where: {
									createdAt: {
										[Op.between]: [
											new Date(filterBy[0]),
											new Date(filterBy[1]),
										],
									},
								},
							});
						}
					} else {
						// 1.2. report by user without any date range filter
						// 1.2.a report by user without any date range filter but sort with date asc/desc
						if (sortBy[0] === "date") {
							data = await db.transaction.findAll({
								attributes: [
									"user_id",
									"invoice_no",
									[sequelize.fn("sum", sequelize.col("price")), "total_price"],
									[sequelize.fn("sum", sequelize.col("qty")), "total_qty"],
								],
								group: ["invoice_no", "user_id"],
								include: { model: db.user, attributes: ["name"] },
								order: [["createdAt", sortBy[1]]], //sort nya masuk kesini
							});
							// 1.2.b report by user without any date range filter but sort with income asc/desc
						} else if (sortBy[0] === "income") {
							data = await db.transaction.findAll({
								attributes: [
									"user_id",
									"invoice_no",
									[sequelize.fn("sum", sequelize.col("price")), "total_price"],
									[sequelize.fn("sum", sequelize.col("qty")), "total_qty"],
								],
								group: ["invoice_no", "user_id"],
								include: { model: db.user, attributes: ["name"] },
								order: [["total_price", sortBy[1]]], //sort nya masuk kesini
							});
							//1.2.c report by user without any date range and without sort
						} else {
							data = await db.transaction.findAll({
								attributes: [
									"user_id",
									"invoice_no",
									[sequelize.fn("sum", sequelize.col("price")), "total_price"],
									[sequelize.fn("sum", sequelize.col("qty")), "total_qty"],
								],
								group: ["invoice_no", "user_id"],
								include: { model: db.user, attributes: ["name"] },
							});
						}
					}
					//2. report by transaction
				} else if (report === "transaction") {
					// 2.1 report by user using date range filter
					if (filterBy) {
						//2.1.a transaction sort with date sort (asc/desc)
						if (sortBy[0] === "date") {
							data = await db.transaction.findAll({
								attributes: [
									"id",
									"qty",
									"user_id",
									"createdAt",
									"invoice_no",
									"product_name",

									[sequelize.fn("sum", sequelize.col("price")), "total_price"],
									[sequelize.fn("sum", sequelize.col("qty")), "total_qty"],
								],
								where: {
									status: "delivered",
									createdAt: {
										[Op.between]: [
											new Date(filterBy[0]),
											new Date(filterBy[1]),
										],
									},
								},

								group: ["invoice_no"],
								order: [["createdAt", sortBy[1]]],
							});
							//2.1.b transaction  sort with income (asc/desc)
						} else if (sortBy[0] === "income") {
							data = await db.transaction.findAll({
								attributes: [
									"id",
									"qty",
									"user_id",
									"createdAt",
									"invoice_no",
									"product_name",
									[sequelize.fn("sum", sequelize.col("qty")), "total_qty"],
									[sequelize.fn("sum", sequelize.col("price")), "total_price"],
								],
								where: {
									status: "delivered",
									createdAt: {
										[Op.between]: [
											new Date(filterBy[0]),
											new Date(filterBy[1]),
										],
									},
								},
								group: ["invoice_no"],
								order: [["total_price", sortBy[1]]],
							});
							//2.1.c
						} else {
							data = await db.transaction.findAll({
								where: {
									status: "delivered",
									createdAt: {
										[Op.between]: [
											new Date(filterBy[0]),
											new Date(filterBy[1]),
										],
									},
								},
							});
						}
						//2.2
					} else {
						// 2.2.a atransaction sort with date sort (asc/desc)
						if (sortBy[0] === "date") {
							data = await db.transaction.findAll({
								attributes: [
									["id", "transaction_id"],
									"user_id",
									"createdAt",
									"invoice_no",
									"product_name",

									[sequelize.fn("sum", sequelize.col("price")), "total_price"],
									[sequelize.fn("sum", sequelize.col("qty")), "total_qty"],
								],
								where: {
									status: "delivered",
								},

								group: ["invoice_no"],
								order: [["createdAt", sortBy[1]]],
							});
							// 2.2.b transaction  sort with income (asc/desc)
						} else if (sortBy[0] === "income") {
							data = await db.transaction.findAll({
								attributes: [
									["id", "transaction_id"],
									"user_id",
									"createdAt",
									"invoice_no",
									"product_name",
									[sequelize.fn("sum", sequelize.col("qty")), "total_qty"],
									[sequelize.fn("sum", sequelize.col("price")), "total_price"],
								],
								where: {
									status: "delivered",
								},
								group: ["invoice_no"],
								order: [["total_price", sortBy[1]]],
							});
							//2.2.c
						} else {
							data = await db.transaction.findAll({
								where: {
									status: "delivered",
								},
								group: ["invoice_no"],
							});
						}
					}
					// 3.report by product
				} else if (report === "product") {
					//3.1
					if (filterBy) {
						// 3.1.a product sort by income (asc/desc)
						if (sortBy[0] === "income") {
							data = await db.transaction.findAll({
								attributes: [
									"product_name",
									"createdAt",
									[sequelize.fn("sum", sequelize.col("qty")), "qty_sold"],
									[sequelize.fn("sum", sequelize.col("price")), "income_money"],
								],

								include: { model: db.branch, attributes: ["location"] },
								where: {
									status: "delivered",
									createdAt: {
										[Op.between]: [
											new Date(filterBy[0]),
											new Date(filterBy[1]),
										],
									},
								},
								group: ["product_name"],
								order: [["income_money", sortBy[1]]],
							});
							// 3.1.b product without any sort
						} else {
							data = await db.transaction.findAll({
								attributes: [
									"product_name",
									"createdAt",
									[sequelize.fn("sum", sequelize.col("qty")), "qty_sold"],
									[sequelize.fn("sum", sequelize.col("price")), "income_money"],
								],

								include: { model: db.branch, attributes: ["location"] },
								where: {
									status: "delivered",
									createdAt: {
										[Op.between]: [
											new Date(filterBy[0]),
											new Date(filterBy[1]),
										],
									},
								},
								group: ["product_name"],
							});
						}
						// 3.2
					} else {
						// 3.2.a product sort by income (asc/desc)
						if (sortBy[0] === "income") {
							data = await db.transaction.findAll({
								attributes: [
									"product_name",
									[sequelize.fn("sum", sequelize.col("qty")), "qty_sold"],
									[sequelize.fn("sum", sequelize.col("price")), "income_money"],
								],

								include: { model: db.branch, attributes: ["location"] },
								group: ["product_name"],
								order: [["income_money", sortBy[1]]],
							});
							//3.2.b product without any sort
						} else {
							data = await db.transaction.findAll({
								attributes: [
									"product_name",
									[sequelize.fn("sum", sequelize.col("qty")), "qty_sold"],
									[sequelize.fn("sum", sequelize.col("price")), "income_money"],
								],

								include: { model: db.branch, attributes: ["location"] },
								group: ["product_name"],
							});
						}
					}
				}
			} else if (role === "branch admin") {
				if (report === "user") {
					// 1.1 report by user using date range filter
					if (filterBy) {
						// 1.1.a report user using date range and make the list asc/ desc
						if (sortBy[0] === "date") {
							data = await db.transaction.findAll({
								attributes: [
									"user_id",
									"createdAt",
									"invoice_no",
									[sequelize.fn("sum", sequelize.col("price")), "total_price"],
									[sequelize.fn("sum", sequelize.col("qty")), "total_qty"],
								],
								where: {
									createdAt: {
										[Op.between]: [
											new Date(filterBy[0]),
											new Date(filterBy[1]),
										],
									},
									branch_id: admin_branch_id,
								},
								group: ["invoice_no", "user_id"],
								include: { model: db.user, attributes: ["name"] },
								order: [["createdAt", sortBy[1]]], //sort nya masuk kesini
							});
							//1.1.b report user using date range and make the list from income asc/desc
						} else if (sortBy[0] === "income") {
							data = await db.transaction.findAll({
								attributes: [
									"user_id",
									"createdAt",
									"invoice_no",
									[sequelize.fn("sum", sequelize.col("price")), "total_price"],
									[sequelize.fn("sum", sequelize.col("qty")), "total_qty"],
								],
								where: {
									createdAt: {
										[Op.between]: [
											new Date(filterBy[0]),
											new Date(filterBy[1]),
										],
									},
									branch_id: admin_branch_id,
								},
								group: ["invoice_no", "user_id"],
								include: { model: db.user, attributes: ["name"] },
								order: [["total_price", sortBy[1]]], //sort nya masuk kesini
							});
							//1.1.c report by user with date range and without sort
						} else {
							data = await db.transaction.findAll({
								attributes: [
									"user_id",
									"createdAt",
									"invoice_no",
									[sequelize.fn("sum", sequelize.col("price")), "total_price"],
									[sequelize.fn("sum", sequelize.col("qty")), "total_qty"],
								],
								group: ["invoice_no", "user_id"],
								include: { model: db.user, attributes: ["name", "id"] },
								where: {
									createdAt: {
										[Op.between]: [
											new Date(filterBy[0]),
											new Date(filterBy[1]),
										],
									},
									branch_id: admin_branch_id,
								},
							});
						}
					} else {
						// 1.2. report by user without any date range filter
						// 1.2.a report by user without any date range filter but sort with date asc/desc
						if (sortBy[0] === "date") {
							data = await db.transaction.findAll({
								attributes: [
									"user_id",
									"invoice_no",
									[sequelize.fn("sum", sequelize.col("price")), "total_price"],
									[sequelize.fn("sum", sequelize.col("qty")), "total_qty"],
								],
								where: {
									branch_id: admin_branch_id,
								},
								group: ["invoice_no", "user_id"],
								include: { model: db.user, attributes: ["name"] },
								order: [["createdAt", sortBy[1]]], //sort nya masuk kesini
							});
							// 1.2.b report by user without any date range filter but sort with income asc/desc
						} else if (sortBy[0] === "income") {
							data = await db.transaction.findAll({
								attributes: [
									"user_id",
									"invoice_no",
									[sequelize.fn("sum", sequelize.col("price")), "total_price"],
									[sequelize.fn("sum", sequelize.col("qty")), "total_qty"],
								],
								where: {
									branch_id: admin_branch_id,
								},
								group: ["invoice_no", "user_id"],
								include: { model: db.user, attributes: ["name"] },
								order: [["total_price", sortBy[1]]], //sort nya masuk kesini
							});
							//1.2.c report by user without any date range and without sort
						} else {
							data = await db.transaction.findAll({
								attributes: [
									"user_id",
									"invoice_no",
									[sequelize.fn("sum", sequelize.col("price")), "total_price"],
									[sequelize.fn("sum", sequelize.col("qty")), "total_qty"],
								],
								where: {
									branch_id: admin_branch_id,
								},
								group: ["invoice_no", "user_id"],
								include: { model: db.user, attributes: ["name"] },
							});
						}
					}
					//2. report by transaction
				} else if (report === "transaction") {
					// 2.1 report by user using date range filter
					if (filterBy) {
						//2.1.a transaction sort with date sort (asc/desc)
						if (sortBy[0] === "date") {
							data = await db.transaction.findAll({
								attributes: [
									["id", "transaction_id"],
									"user_id",
									"createdAt",
									"invoice_no",
									"product_name",

									[sequelize.fn("sum", sequelize.col("price")), "total_price"],
									[sequelize.fn("sum", sequelize.col("qty")), "total_qty"],
								],
								where: {
									status: "delivered",
									createdAt: {
										[Op.between]: [
											new Date(filterBy[0]),
											new Date(filterBy[1]),
										],
									},
									branch_id: admin_branch_id,
								},

								group: ["invoice_no"],
								order: [["createdAt", sortBy[1]]],
							});
							//2.1.b transaction  sort with income (asc/desc)
						} else if (sortBy[0] === "income") {
							data = await db.transaction.findAll({
								attributes: [
									["id", "transaction_id"],
									"user_id",
									"createdAt",
									"invoice_no",
									"product_name",
									[sequelize.fn("sum", sequelize.col("qty")), "total_qty"],
									[sequelize.fn("sum", sequelize.col("price")), "total_price"],
								],
								where: {
									status: "delivered",
									createdAt: {
										[Op.between]: [
											new Date(filterBy[0]),
											new Date(filterBy[1]),
										],
									},
									branch_id: admin_branch_id,
								},
								group: ["invoice_no"],
								order: [["total_price", sortBy[1]]],
							});
							//2.1.c
						} else {
							data = await db.transaction.findAll({
								where: {
									status: "delivered",
									createdAt: {
										[Op.between]: [
											new Date(filterBy[0]),
											new Date(filterBy[1]),
										],
									},
									branch_id: admin_branch_id,
								},
							});
						}
						//2.2
					} else {
						// 2.2.a atransaction sort with date sort (asc/desc)
						if (sortBy[0] === "date") {
							data = await db.transaction.findAll({
								attributes: [
									["id", "transaction_id"],
									"user_id",
									"createdAt",
									"invoice_no",
									"product_name",

									[sequelize.fn("sum", sequelize.col("price")), "total_price"],
									[sequelize.fn("sum", sequelize.col("qty")), "total_qty"],
								],
								where: {
									status: "delivered",
									branch_id: admin_branch_id,
								},

								group: ["invoice_no"],
								order: [["createdAt", sortBy[1]]],
							});
							// 2.2.b transaction  sort with income (asc/desc)
						} else if (sortBy[0] === "income") {
							data = await db.transaction.findAll({
								attributes: [
									["id", "transaction_id"],
									"user_id",
									"createdAt",
									"invoice_no",
									"product_name",
									[sequelize.fn("sum", sequelize.col("qty")), "total_qty"],
									[sequelize.fn("sum", sequelize.col("price")), "total_price"],
								],
								where: {
									status: "delivered",
									branch_id: admin_branch_id,
								},
								group: ["invoice_no"],
								order: [["total_price", sortBy[1]]],
							});
							//2.2.c
						} else {
							data = await db.transaction.findAll({
								where: {
									status: "delivered",
									branch_id: admin_branch_id,
								},
								group: ["invoice_no"],
							});
						}
					}
					// report by product
				} else if (report === "product") {
					if (filterBy) {
						//  product sort by income (asc/desc)
						if (sortBy[0] === "income") {
							data = await db.transaction.findAll({
								attributes: [
									"product_name",
									"createdAt",
									[sequelize.fn("sum", sequelize.col("qty")), "qty_sold"],
									[sequelize.fn("sum", sequelize.col("price")), "income_money"],
								],

								include: { model: db.branch, attributes: ["location"] },
								where: {
									status: "delivered",
									createdAt: {
										[Op.between]: [
											new Date(filterBy[0]),
											new Date(filterBy[1]),
										],
									},
									branch_id: admin_branch_id,
								},
								group: ["product_name"],
								order: [["income_money", sortBy[1]]],
							});
							// product without any sort
						} else {
							data = await db.transaction.findAll({
								attributes: [
									"product_name",
									"createdAt",
									[sequelize.fn("sum", sequelize.col("qty")), "qty_sold"],
									[sequelize.fn("sum", sequelize.col("price")), "income_money"],
								],

								include: { model: db.branch, attributes: ["location"] },
								where: {
									status: "delivered",
									createdAt: {
										[Op.between]: [
											new Date(filterBy[0]),
											new Date(filterBy[1]),
										],
									},
									branch_id: admin_branch_id,
								},
								group: ["product_name"],
							});
						}
					} else {
						//  product sort by income (asc/desc)
						if (sortBy[0] === "income") {
							data = await db.transaction.findAll({
								attributes: [
									"product_name",
									[sequelize.fn("sum", sequelize.col("qty")), "qty_sold"],
									[sequelize.fn("sum", sequelize.col("price")), "income_money"],
								],
								where: {
									branch_id: admin_branch_id,
								},
								include: { model: db.branch, attributes: ["location"] },
								group: ["product_name"],
								order: [["income_money", sortBy[1]]],
							});
							// product without any sort
						} else {
							data = await db.transaction.findAll({
								attributes: [
									"product_name",
									[sequelize.fn("sum", sequelize.col("qty")), "qty_sold"],
									[sequelize.fn("sum", sequelize.col("price")), "income_money"],
								],
								where: {
									branch_id: admin_branch_id,
								},

								include: { model: db.branch, attributes: ["location"] },
								group: ["product_name"],
							});
						}
					}
				}
			}
			res.status(200).send({
				isError: false,
				message: "Get Sales Report Success",
				data,
			});
		} catch (error) {
			res.status(404).send({
				isError: true,
				message: error.message,
				data,
			});
		}
	},

	adminRegister: async (req, res) => {
		const t = await sequelize.transaction();
		try {
			let { email, password, branch_id } = req.body;

			let token = req.headers;

			let admin = await db.user.findOne(
				{
					where: {
						uid: token.token,
					},
				},
				{ transaction: t }
			);

			let role = admin.dataValues.role;
			console.log(role, "role");

			if (role === "super admin") {
				if (!email.length || !password.length) {
					return res.status(404).send({
						isError: true,
						message: "data not found",
						data: null,
					});
				}

				let resFindBranchById = await db.branch.findOne(
					{
						where: {
							id: branch_id,
						},
					},
					{ transaction: t }
				);

				let adminBranchLocation = resFindBranchById.dataValues.location;

				var resCreateAdmin = await db.user.create(
					{
						name: `branch admin ${adminBranchLocation}`,
						email,
						password,
						role: "branch admin",
						status: true,
					},
					{ transaction: t }
				);

				let userIdUpdate = resCreateAdmin.id;
				console.log(userIdUpdate, "tess id");

				await db.branch.update(
					{
						user_id: userIdUpdate,
					},
					{
						where: {
							id: branch_id,
						},
						transaction: t,
					}
				);
			}

			t.commit();

			res.status(201).send({
				isError: false,
				message: "register success",
				data: null,
			});
		} catch (error) {
			t.rollback();
			res.status(404).send({
				isError: true,
				message: error.message,
				data: null,
			});
		}
	},

	getBranchAdmin: async (req, res) => {
		try {
			let data = await db.branch.findAll({
				where: {
					user_id: null,
				},
			});
			res.status(200).send({
				isError: false,
				message: "get branch success",
				data,
			});
		} catch (error) {}
	},
};

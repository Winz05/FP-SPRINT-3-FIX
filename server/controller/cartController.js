const db = require("../sequelize/models");
const { Op } = require("sequelize");

module.exports = {
	addToCart: async (req, res) => {
		const { qty, branch_id, user_id, product_id } = req.body;
		try {
			const branch_product = await db.branch_product.findOne({
				where: {
					[Op.and]: [{ branch_id: branch_id }, { product_id: product_id }],
				},
			});

			if (qty > branch_product.stock) {
				throw { message: "Input Quantity More Than Stock" };
			}

			const cart = await db.cart.findAll({
				where: {
					product_id: product_id,
				},
			});

			if (cart.length > 0) {
				const branch = await db.branch_product.findOne({
					where: {
						[Op.and]: [{ branch_id: branch_id }, { product_id: product_id }],
					},
				});

				let updateQty = cart[0].dataValues.qty + qty;
				if (branch.dataValues.stock < updateQty || branch.dataValues.stock < qty) {
					throw { message: "Input Quantity More Than Stock" };
				}
				var data = await db.cart.update(
					{ qty: updateQty },
					{
						where: {
							id: cart[0].dataValues.id,
						},
					}
				);
			} else {
				var data = await db.cart.create({ qty, branch_id, user_id, product_id });
			}

			res.status(201).send({
				isError: false,
				message: "Add To Cart Success",
				data,
			});
		} catch (error) {
			res.status(404).send({
				isError: true,
				message: error.message,
				data: error,
			});
		}
	},
	getCart: async (req, res) => {
		const { uid } = req.uid;
		try {
			const { id } = await db.user.findOne({
				where: { uid: uid },
			});

			const cart = await db.cart.findAll({
				where: { user_id: id },
			});

			console.log(cart)

			if(cart.length === 0){

			return res.status(201).send({
					isError: false,
					message: "Cart Empty",
					data: []
				})
			}

			const data = await db.cart.findAll({
				where: { user_id: id },
				include: [
					{
						model: db.product,
						include: [
							{ model: db.branch_product, where: { branch_id: cart[0].branch_id } },
							{ model: db.unit },
						],
					},
					{ model: db.branch },
				],
			});

			res.status(201).send({
				isError: false,
				message: "Get Cart Success",
				data,
			});
		} catch (error) {
			res.status(404).send({
				isError: true,
				message: error.message,
				data: error,
			});
		}
	},
	incrementQuantity: async (req, res) => {
		const { id, quantity } = req.body;
		try {
			const data = await db.cart.update(
				{ qty: quantity + 1 },
				{
					where: {
						id: id,
					},
				}
			);
			console.log(typeof quantity);
			res.status(201).send({
				isError: false,
				message: "Update Quantity Success",
				data,
			});
		} catch (error) {
			res.status(404).send({
				isError: true,
				message: error.message,
				data: error,
			});
		}
	},
	decrementQuantity: async (req, res) => {
		const { id, quantity } = req.body;
		try {
			const data = await db.cart.update(
				{ qty: quantity - 1 },
				{
					where: {
						id: id,
					},
				}
			);
			res.status(201).send({
				isError: false,
				message: "Update Quantity Success",
				data,
			});
		} catch (error) {
			res.status(404).send({
				isError: true,
				message: error.message,
				data: error,
			});
		}
	},
	deleteCart: async (req, res) => {
		const { id } = req.body;
		try {
			const data = await db.cart.destroy({
				where: {
					id: id,
				},
			});
			res.status(201).send({
				isError: false,
				message: "Delete Cart Success",
				data,
			});
		} catch (error) {
			res.status(404).send({
				isError: true,
				message: error.message,
				data: error,
			});
		}
	},
};

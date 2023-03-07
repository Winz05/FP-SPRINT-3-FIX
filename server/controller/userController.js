const db = require("../sequelize/models");
const HTTPStatus = require("../helper/HTTPStatus");
// Import Hashing
const { hashPassword, matchPassword } = require("../lib/hash");
// Import JWT
const { createToken } = require("../lib/jwt");
// Import FileSystem
const fs = require("fs").promises;
// Import Transporter
const transporter = require("../helper/transporter");
// Import Handlebars
const handlebars = require("handlebars");
const deleteFiles = require("../helper/deleteFiles");
const { sequelize } = require("../sequelize/models");

module.exports = {
	getUser: async (req, res) => {
		const { uid } = req.uid;
		try {
			const {
				name,
				email,
				gender,
				birthdate,
				phone_number,
				img,
				user_addresses,
			} = await db.user.findOne({
				where: { uid },
				include: { model: db.user_address },
			});
			const httpStatus = new HTTPStatus(res, {
				name,
				email,
				gender,
				birthdate,
				phone_number,
				img,
				user_addresses,
			}).success("Get user profile");
			httpStatus.send();
		} catch (error) {
			console.log(error);

			res.status(400).send({
				isError: true,
				message: error.message,
				data: error,
			});
		}
	},
	updateUser: async (req, res) => {
		const { uid } = req.uid;
		const { name, birthdate, gender, email, phone_number } = req.body;
		try {
			const data = await db.user.update(
				{ name, birthdate, gender, email, phone_number },
				{
					where: { uid },
				}
			);
			const httpStatus = new HTTPStatus(res, data).success("Get user profile");
			httpStatus.send();
		} catch (error) {
			res.status(400).send({
				isError: false,
				message: error.message,
				data: error,
			});
		}
	},
	register: async (req, res) => {
		try {
			let { name, email, password, phone_number } = req.body;

			if (!name || !email || !password || !phone_number)
				return res.status(404).send({
					isError: true,
					message: "Input Must Be Filled",
					data: null,
				});

			let findEmail = await db.user.findOne({
				where: {
					email: email,
				},
			});

			if (findEmail)
				return res.status(404).send({
					isError: true,
					message: "Email Already Exist",
					data: null,
				});

			let char =
				/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
			if (!char.test(password))
				return res.status(404).send({
					isError: true,
					message: "Password Must Contain Number and Capital",
					data: null,
				});

			if (isNaN(phone_number) || phone_number.length < 11)
				return res.status(404).send({
					isError: true,
					message: "Phone Number Must Be Number and More Than 11 Char",
					data: null,
				});
			let dataToSend = await db.user.create({
				name,
				email,
				password: await hashPassword(password),
				phone_number,
			});

			const template = await fs.readFile(
				"./template/confirmation.html",
				"utf-8"
			);
			const templateToCompile = await handlebars.compile(template);
			const newTemplate = templateToCompile({
				name,
				url: `http://localhost:3000/activation/${dataToSend.dataValues.uid}`,
			});

			await transporter.sendMail({
				from: "Tokonglomerat",
				to: email,
				subject: "Activation account",
				html: newTemplate,
			});

			res.status(201).send({
				isError: false,
				message: "Register Success, Please Check Your Email",
				data: null,
			});
		} catch (error) {
			res.status(404).send({
				isError: true,
				message: "Register Failed",
				data: error,
			});
		}
	},

	login: async (req, res) => {
		try {
			let { email, password } = req.body;

			if (!email || !password)
				return res.status(404).send({
					isError: true,
					message: "Input must be filled",
					data: null,
				});

			let findEmail = await db.user.findOne({
				where: {
					email: email,
				},
			});

			if (!findEmail.dataValues)
				return res.status(404).send({
					isError: true,
					message: "Email Not Found",
					data: null,
				});

			let hashMatchResult = await matchPassword(
				password,
				findEmail.dataValues.password
			);

			if (hashMatchResult === false)
				return res.status(404).send({
					isError: true,
					message: "Wrong Password or Email",
					data: null,
				});

			const token = createToken({
				uid: findEmail.uid,
			});

			res.status(201).send({
				isError: false,
				message: "Login Success",
				data: { token, name: findEmail.dataValues.name },
			});
		} catch (error) {
			res.status(404).send({
				isError: true,
				message: "Login Failed",
				data: error.message,
			});
		}
	},
	keepLogin: async (req, res) => {
		try {
			res.status(201).send({
				isError: false,
				message: "Token Valid",
				data: req.uid.name,
			});
		} catch (error) {
			res.status(500).send({
				isError: true,
				message: error.message,
				data: null,
			});
		}
	},
	activation: async (req, res) => {
		try {
			let { uid } = req.body;
			await db.user.update(
				{ status: "Active" },
				{
					where: {
						uid: uid,
					},
				}
			);

			res.status(201).send({
				isError: false,
				message: "Account Actived!",
				data: null,
			});
		} catch (error) {
			res.status(500).send({
				isError: true,
				message: error.message,
				data: null,
			});
		}
	},
	resetPassword: async (req, res) => {
		try {
			let { uid, password, confPassword } = req.body;
			if (!password)
				return res.status(404).send({
					isError: true,
					message: "Please Input Your Password",
					data: null,
				});

			if (password !== confPassword)
				return res.status(404).send({
					isError: true,
					message: "Password Not Match",
					data: password,
					confPassword,
				});

			await db.user.update(
				{ password: await hashPassword(password) },
				{
					where: {
						uid: uid,
					},
				}
			);

			res.status(201).send({
				isError: false,
				message: "Update Password Success",
				data: null,
			});
		} catch (error) {
			res.status(500).send({
				isError: true,
				message: error.message,
				data: null,
			});
		}
	},
	forgotPassword: async (req, res) => {
		try {
			let { email } = req.body;

			if (!email)
				return res.status(404).send({
					isError: true,
					message: "Please Input Your Email",
				});

			let findEmail = await db.user.findOne({
				where: {
					email: email,
				},
			});

			if (!findEmail)
				return res.status(404).send({
					isError: true,
					message: "Email Not Found",
					data: null,
				});

			const name = findEmail.dataValues.name;

			const template = await fs.readFile(
				"./template/resetPassword.html",
				"utf-8"
			);
			const templateToCompile = await handlebars.compile(template);
			const newTemplate = templateToCompile({
				name,
				url: `http://localhost:3000/updatePassword/${findEmail.dataValues.uid}`,
			});

			await transporter.sendMail({
				from: "Tokonglomerat",
				to: email,
				subject: "Reset Password",
				html: newTemplate,
			});

			res.status(201).send({
				isError: false,
				message: "Check Your Email",
				data: null,
			});
		} catch (error) {
			res.status(404).send({
				isError: true,
				message: error.message,
				data: null,
			});
		}
	},
	editProfilePic: async (req, res) => {
		const { uid } = req.uid;

		try {
			let { img } = await db.user.findOne({
				where: {
					uid,
				},
			});
			await db.user.update(
				{
					img: req.files.images[0].path,
				},
				{
					where: {
						uid,
					},
				}
			);

			deleteFiles(img);

			res.status(201).send({
				isError: false,
				message: "Update Products Success!",
				data: null,
			});
		} catch (error) {
			deleteFiles(req.files);
			res.status(400).send({
				isError: true,
				message: error.message,
				data: error,
			});
		}
	},
	changePassword: async (req, res) => {
		const { uid } = req.uid;
		const { oldPassword, newPassword } = req.body;
		try {
			const data = await db.user.findOne({ where: { uid: token } });
			if (oldPassword !== data.password) {
				return res.status(400).send({
					isError: true,
					message: "Invalid password",
					data: null,
				});
			}
			await db.user.update(
				{ password: newPassword },
				{ where: { uid: token } }
			);
			res.status(201).send({
				isError: false,
				message: "Password updated",
				data: null,
			});
		} catch (error) {
			res.status(400).send({
				isError: true,
				message: error.message,
				data: error,
			});
		}
	},
	deleteAddress: async (req, res) => {
		const { id } = req.params;
		try {
			await db.user_address.destroy({ where: { id } });
			res.status(201).send({
				isError: false,
				message: "Address deleted",
				data: null,
			});
		} catch (error) {
			res.status(400).send({
				isError: true,
				message: error.message,
				data: error,
			});
		}
	},
	defaultAddress: async (req, res) => {
		const { id } = req.params;
		const { uid } = req.uid;
		const t = await sequelize.transaction();
		try {
			await db.user_address.update(
				{ main_address: false },
				{ where: { main_address: true } },
				{ transaction: t }
			);
			await db.user_address.update(
				{ main_address: true },
				{ where: { id } },
				{ transaction: t }
			);
			t.commit();
			res.status(201).send({
				isError: false,
				message: "Default address updated",
				data: null,
			});
		} catch (error) {
			t.rollback();
			res.status(400).send({
				isError: true,
				message: error.message,
				data: error,
			});
		}
	},
};

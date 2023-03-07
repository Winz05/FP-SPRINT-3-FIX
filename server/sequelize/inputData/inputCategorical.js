require("dotenv").config();
const db = require("../models");
const axios = require("axios");

const user = async () => {
	await db.user.bulkCreate([
		{
			name: "aswin",
			email: "aswin05.aw@gmail.com",
			password: "Aswin123456",
			phone_number: "087805667895",
			role: "super admin",
			status: "Verified",
		},
		{
			name: "ashfi",
			email: "ashfimzk@gmail.com",
			password: "Ashfi123456",
			phone_number: "085156004326",
			role: "super admin",
			status: "Verified",
		},
		{
			name: "nathan",
			email: "veanusnathan.work@gmail.com",
			password: "Nathan123456",
			phone_number: "082246704951",
			role: "super admin",
			status: "Verified",
		},
	]);
};

const category = async () => {
	await db.category.bulkCreate([
		{
			name: "Vegetables",
			img: "https://assets.segari.id/categories/v3/new/sayuran_medium.png",
		},
		{
			name: "Fruit",
			img: "https://assets.segari.id/categories/v3/new/buah_medium.png",
		},
		{
			name: "Proteins",
			img: "https://assets.segari.id/categories/v3/new/protein_medium.png",
		},
		{
			name: "Drink",
			img: "https://assets.segari.id/categories/v3/new/minuman_medium.png",
		},
		{
			name: "Groceries",
			img: "https://assets.segari.id/categories/v3/new/sembako_medium.png",
		},
	]);
};

const unit = async () => {
	await db.unit.bulkCreate([
		{ name: "Kg" },
		{ name: "Gram" },
		{ name: "Dozen" },
		{ name: "Liter" },
		{ name: "Pcs" },
	]);
};

const discount = async () => {
	await db.discount.bulkCreate([
		{ name: "Buy 1 Free 1" },
		{ name: "Minimum item" },
		{ name: "Discount" },
	]);
};

const branch = async () => {
	const branch1 = await axios.get(
		`https://api.opencagedata.com/geocode/v1/json?q=kembangan+selatan&key=${process.env.OPENCAGE_API}&language=en&pretty=1`
	);
	await db.branch.create({
		location: "Jakarta",
		address:
			"Jl. Puri Indah Raya, RT.3/RW.2, Kembangan Sel., Kec. Kembangan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta",
		lat: branch1.data.results[0].annotations.DMS.lat,
		lng: branch1.data.results[0].annotations.DMS.lng,
	});

	const branch2 = await axios.get(
		`https://api.opencagedata.com/geocode/v1/json?q=Sumur+Bandung,+bandung&key=${process.env.OPENCAGE_API}&language=en&pretty=1`
	);
	await db.branch.create({
		location: "Bandung",
		address:
			"Jl. Braga No.99-101, Braga, Kec. Sumur Bandung, Kota Bandung, Jawa Barat",
		lat: branch2.data.results[0].annotations.DMS.lat,
		lng: branch2.data.results[0].annotations.DMS.lng,
	});

	const branch3 = await axios.get(
		`https://api.opencagedata.com/geocode/v1/json?q=Suryatmajan&key=${process.env.OPENCAGE_API}&language=en&pretty=1`
	);
	await db.branch.create({
		location: "Yogyakarta",
		address:
			"Jl. Mataram No.31, Suryatmajan, Kec. Danurejan, Kota Yogyakarta, Daerah Istimewa Yogyakarta",
		lat: branch3.data.results[0].annotations.DMS.lat,
		lng: branch3.data.results[0].annotations.DMS.lng,
	});

	const branch4 = await axios.get(
		`https://api.opencagedata.com/geocode/v1/json?q=sekayu&key=${process.env.OPENCAGE_API}&language=en&pretty=1`
	);
	await db.branch.create({
		location: "Semarang",
		address:
			"Jl. Pemuda No.118, Sekayu, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah",
		lat: branch4.data.results[0].annotations.DMS.lat,
		lng: branch4.data.results[0].annotations.DMS.lng,
	});

	const branch5 = await axios.get(
		`https://api.opencagedata.com/geocode/v1/json?q=karang+asam+ulu&key=${process.env.OPENCAGE_API}&language=en&pretty=1`
	);
	await db.branch.create({
		location: "Kalimantan",
		address:
			"Jl. Untung Suropati No.08, Karang Asam Ulu, Kec. Sungai Kunjang, Kota Samarinda, Kalimantan Timur",
		lat: branch5.data.results[0].annotations.DMS.lat,
		lng: branch5.data.results[0].annotations.DMS.lng,
	});

	const branch6 = await axios.get(
		`https://api.opencagedata.com/geocode/v1/json?q=penambungan&key=${process.env.OPENCAGE_API}&language=en&pretty=1`
	);
	await db.branch.create({
		location: "Sulawesi",
		address:
			"Jl. Metro Tj. Bunga No.2, Panambungan, Kec. Mariso, Kota Makassar, Sulawesi Selatan",
		lat: branch6.data.results[0].annotations.DMS.lat,
		lng: branch6.data.results[0].annotations.DMS.lng,
	});
};

category();
unit();
discount();
branch();
user();

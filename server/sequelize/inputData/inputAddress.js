const db = require("../models");

(async () => {
	await db.user_address.bulkCreate([
		{
			address: "jl. bahagia",
			receiver_name: "saya",
			receiver_phone: "1234123441234",
			main_address: true,
		},
		{
			address: "jl. Toram",
			receiver_name: "dia",
			receiver_phone: "89898989898989",
			main_address: false,
		},
		{
			address: "jl. malioboro",
			receiver_name: "kamu",
			receiver_phone: "6666623441234",
			main_address: false,
		},
	]);
})();

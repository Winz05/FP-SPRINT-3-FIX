const db = require("../models");

(async () => {
	await db.user.bulkCreate([
		{
			name: "nathan",
			email: "nathan1@gmail.com",
			password: "asdfasdf12341234",
			phone_number: 123412341,
		},
		{
			name: "nathan",
			email: "nathan2@gmail.com",
			password: "asdfasdf12341234",
			phone_number: 123412341,
		},
		{
			name: "nathan",
			email: "nathan3@gmail.com",
			password: "asdfasdf12341234",
			phone_number: 123412341,
		},
		{
			name: "nathan",
			email: "nathan4@gmail.com",
			password: "asdfasdf12341234",
			phone_number: 123412341,
		},
	]);
})();

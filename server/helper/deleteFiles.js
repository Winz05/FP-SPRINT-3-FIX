const fs = require("fs");

const deleteFiles = (files) => {
	files.images.forEach((value) => {
		fs.unlink(value.path, function (error) {
			try {
				if (error) throw error;
			} catch (error) {
				console.log(error);
			}
		});
	});
};

module.exports = deleteFiles;

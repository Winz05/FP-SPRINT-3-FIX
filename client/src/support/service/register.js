import axios from "axios";
import { toast } from "react-hot-toast";

export const onSubmit = async (name, email, password, phone, setdisable, setmessage) => {
	try {
		if (!name || !email || !password || !phone) throw { message: "Input should not be empty" };

		if (password.length < 8) throw { message: "Password must have 8 character or more" };

		let char = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
		if (!char.test(password)) throw { message: "Password must contain number and capital" };

		setdisable(true);

		let { data } = await axios.post("http://localhost:8000/user/register", {
			name: name,
			email: email,
			password: password,
			phone_number: phone,
		});

		toast.success(data.message);
	} catch (error) {
		toast.error(error.message);
		setmessage(error.data);
	} finally {
		setdisable(false);
	}
};

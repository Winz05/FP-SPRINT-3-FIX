export function ValidateName (value, setmessage) {
	
	if (value === "") {
	 return  setmessage = "Please input your name";
	} else if (value.length <= 4) {
	return setmessage = "Input name less than 4 character";
	} else if (value.length > 20) {
	 return setmessage = "Input name more than 20 character";
	} else {
		return setmessage = "";
	}
};


export const ValidateEmail = (value, setmessage) => {
	if (value === "") {
		return setmessage({ errEmail: "Please input your email" });
	} else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i.test(value)) {
		return setmessage({ errEmail: "Format Email Invalid" });
	} else {
		return setmessage({ errEmail: "" });
	}
};

export const ValidatePassword = (value, setmessage) => {
	if (value === "") {
		return setmessage({ errPassword: "Please input your password" });
	} else if (value.length < 8) {
		setmessage({ errPassword: "Password less than 8 character or more" });
	} else if (
		!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(
			value
		)
	) {
		setmessage({ errPassword: "Password must contain number and capital" });
	}
};

export const onValidatePhone = (value, setmessage) => {
	if (value === "") {
		setmessage({ errPhoneNumber: "Please input your phone number" });
	} else if (isNaN(value)) {
		setmessage({ errPhoneNumber: "Phone number must be number" });
	} else if (value.length < 8) {
		setmessage({
			errPhoneNumber: "Input phone number less than 8 digit",
		});
	} else if (value.length > 12) {
		setmessage({
			errPhoneNumber: "Input phone number more than 12 digit",
		});
	}
};

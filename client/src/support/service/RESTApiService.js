import axios from "axios";

const REST_API = () => {
	const defaultHeaders = {
		token: "", //token
	};
	const get = async (url, headers) => {
		try {
			const result = await axios.get(`http://localhost:8000/${url}`, {
				headers: { ...defaultHeaders, ...headers },
			});
			return result;
		} catch (error) {
			console.log(error);
		}
	};
	const post = async (url, payload, headers) => {
		try {
			const result = await axios.get(
				`http://localhost:8000/${url}`,
				{
					headers: { ...defaultHeaders, ...headers },
				},
				payload
			);
			return result;
		} catch (error) {
			console.log(error);
		}
	};
	return { get, post };
};

export default REST_API;

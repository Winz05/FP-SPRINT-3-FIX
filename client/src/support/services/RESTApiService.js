import axios from "axios";

const REST_API = axios.create({
	baseURL: "http://localhost:8000/",
	headers: { token: localStorage.getItem("token") },
});

export default REST_API;
// const REST_API = () => {
// 	const defaultHeaders = {
// 		token: localStorage.getItem("token"), //token
// 	};
// 	const get = async (url, headers) => {
// 		try {
// 			const result = await axios.get(`http://localhost:8000/${url}`, {
// 				headers: { ...defaultHeaders },
// 			});
// 			return result;
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};
// 	const post = async (url, payload, headers) => {
// 		try {
// 			const result = await axios.get(`http://localhost:8000/${url}`, payload, {
// 				headers: { ...defaultHeaders, ...headers },
// 			});
// 			return result;
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};
// 	const patch = async (url, payload, headers) => {
// 		try {
// 			const result = await axios.get(`http://localhost:8000/${url}`, payload, {
// 				headers: { ...defaultHeaders, ...headers },
// 			});
// 			return result;
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};
// 	return { get, post, patch };
// };

// export default REST_API;

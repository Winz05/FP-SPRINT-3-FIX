import "./App.css";
import REST_API from "./support/services/RESTApiService";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import NavigationBar from "./components/navbar";
import Profile from "./pages/profile";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./pages/login";
import UpdatePassword from "./pages/newpass";
import Register from "./pages/register";
import Activation from "./pages/activation";
import ForgotPass from "./pages/forgotpass";
import Dashboard from "./pages/dashboard";
import SalesReport from "./components/salesReport";
import ProductCategory from "./pages/product_category";
import Checkout from "./pages/checkout";
import Cart from "./pages/cart";
import BranchAdminRegister from "./components/branchAdminRegister";


function App() {
	const location = useLocation();
	const [name, setname] = useState("");
	const [redirect, setredirect] = useState(false);
	const [profile, setprofile] = useState({
		name: "",
		birthdate: "",
		gender: "",
		email: "",
		phone_number: "",
		profile_picture: "",
		address: "",
	});
	const getProfile = async () => {
		const { data } = await REST_API({
			url: "user/profile",
			method: "GET",
		});

		setprofile({
			...profile,
			name: data.data.name,
			birthdate: data.data.birthdate,
			gender: data.data.gender,
			email: data.data.email,
			phone_number: data.data.phone_number,
			profile_picture: data.data.img,
			address: data.data.user_addresses,
		});
	};

	useEffect(() => {
		// checkIsLogin();
		getProfile();
	}, []);

	let checkIsLogin = async () => {
		try {
			let token = localStorage.getItem("token");
			if (token) {
				let { data } = await axios.post(
					"http://localhost:5000/user/keep-login",
					{ token }
				);
				setname(data.name);
				setredirect(true);
			}
		} catch (error) {
			console.log(error);
			// localStorage.removeItem("token");
		}
	};

	let onLogout = () => {
		localStorage.removeItem("token");
		setname("");
	};

	return (
		<>
			{location.pathname === "/home" || location.pathname === "/profile" ? (
				<NavigationBar state={{ name, profile }} Func={{ onLogout }} />
			) : null}
			<div className="relative">
				<Routes>
					<Route path="/home" element={<LandingPage />} />
					<Route
						path="/profile"
						element={
							<Profile func={{ getProfile }} state={{ profile, setprofile }} />
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/updatePassword/:uid" element={<UpdatePassword />} />
					<Route path="/register" element={<Register />} />
					<Route path="/activation/:uid" element={<Activation />} />
					<Route path="/forgotpassword" element={<ForgotPass />} />
					<Route path="/" element={<Dashboard />}>
						{/* <Route path="/admin" element={<Overview />} /> */}
						<Route path="/sales-report" element={<SalesReport />} />
						<Route
							path="/branch-admin-register"
							element={<BranchAdminRegister />}
						/>
					</Route>
					<Route path="/category/:product" element={<ProductCategory/>}/>
					<Route path="/checkout/:cart" element={<Checkout/>}/>
					<Route path="/cart/:id" element={<Cart/>}/>
				</Routes>
			</div>
		</>
	);
}

export default App;

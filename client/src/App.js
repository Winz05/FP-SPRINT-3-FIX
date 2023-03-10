import "./App.css";
import REST_API from "./support/services/RESTApiService";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import NavigationBar from "./components/navbar";
import Profile from "./pages/profile";
import { useEffect, useState } from "react";
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
import { toast } from "react-hot-toast";

function App() {
	const location = useLocation();
	const [disable, setdisable] = useState();
	const [profile, setprofile] = useState({
		uid: "",
		name: "",
		birthdate: "",
		gender: "",
		email: "",
		phone_number: "",
		profile_picture: "",
		address: "",
	});

	const getProfile = async () => {
		try {

			const { data } = await REST_API({
				url: "user/profile",
				method: "GET",
			});
			setprofile({
				...profile,
				uid: data.data.uid,
				name: data.data.name,
				birthdate: data.data.birthdate,
				gender: data.data.gender,
				email: data.data.email,
				phone_number: data.data.phone_number,
				profile_picture: data.data.img,
				address: data.data.user_addresses,
			});
		} catch (error) {
			console.log(error);
		}
	};

	let onLogin = async (email, password) => {
		try {
			setdisable(true);
			const { data } = await REST_API({
				url: "user/login",
				method: "POST",
				data: {
					email: email,
					password: password,
				},
			});
			await localStorage.setItem("token", `${data.data.token}`);
			toast.success(data.message);
			email = "";
			password = "";
			getProfile();
				setTimeout(() => {
					window.location.href="http://localhost:3000/home"
				}, 3000);
				
		} catch (error) {
			toast.error(error.response.data.message);
			console.log(error);
		} finally {
			setdisable(false);
		}
	};

	useEffect(() => {
		getProfile();
	}, []);

	let onLogout = () => {
		localStorage.removeItem("token");
		setprofile({
			...profile,
			name: "",
		});
	};

	return (
		<>
			{location.pathname === "/home" ||
			location.pathname === "/profile" ||
			location.pathname === "/cart" ? (
				<NavigationBar state={{ profile }} Func={{ onLogout }} />
			) : null}
			<div className="relative">
				<Routes>
					<Route path="/home" element={<LandingPage />} />
					<Route
						path="/profile"
						element={<Profile func={{ getProfile }} state={{ profile, setprofile }} />}
					/>
					<Route path="/login" element={<Login MyFunc={{ onLogin }} isDisable={{ disable }} />} />
					<Route path="/updatePassword/:uid" element={<UpdatePassword />} />
					<Route path="/register" element={<Register />} />
					<Route path="/activation/:uid" element={<Activation />} />
					<Route path="/forgotpassword" element={<ForgotPass />} />
					<Route path="/" element={<Dashboard />}>
						{/* <Route path="/admin" element={<Overview />} /> */}
						<Route path="/sales-report" element={<SalesReport />} />
						<Route path="/branch-admin-register" element={<BranchAdminRegister />} />
					</Route>
					<Route path="/category/:product" element={<ProductCategory />} />
					<Route path={"/checkout"} element={<Checkout />} />
					<Route path={"/cart"} element={<Cart />} />
				</Routes>
			</div>
		</>
	);
}

export default App;

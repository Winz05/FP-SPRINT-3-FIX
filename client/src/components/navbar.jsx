import React from "react";
import { BiSearchAlt, BiCart, BiBell } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";

export default function NavigationBar(props) {
	const navigate = useNavigate();
	return (
		<div className="grid grid-cols-12 fixed py-3 px-8 shadow-md max-w-screen w-full bg-white z-50">
			<button
				onClick={() => navigate("/home")}
				className=" col-span-2 font-mandalaFont font-extrabold text-xl text-red-700 xl:text-4xl"
			>
				tokonglomerat
			</button>
			<div className=" col-span-7 relative flex items-center">
				<input
					type="text"
					className=" pl-10 h-7 rounded-lg border-gray-300 w-full"
					placeholder="Cari di tokonglomerat"
				/>
				<BiSearchAlt className="text-2xl text-gray-500 absolute top-2 left-1" />
			</div>
			<div className="flex justify-center text-gray-500 gap-7">
				<button>
					<BiCart className="text-2xl" />
				</button>
				<button>
					<BiBell className="text-2xl" />
				</button>
			</div>
			{localStorage.getItem("token") ? (
				<div className="col-span-2 flex text-[#6C727C] items-center justify-end space-x-4">
					<Link to={"/profile"} className="flex space-x-2 items-center">
						<CgProfile className="text-xl" />
						<h2 className=" font-tokpedFont font-semibold">
							{props.state.profile.name}
						</h2>
					</Link>
				</div>
			) : (
				<div className="col-span-2 grid grid-cols-2 gap-4">
					<button className="border-[2px] rounded-lg px-2 py-1">
						<p>Login</p>
					</button>
					<button className="border-[2px] rounded-lg px-2 py-1">
						<p>Register</p>
					</button>
				</div>
			)}
		</div>
	);
}

import NavigationBar from "../components/navbar";
import { VscTrash } from "react-icons/vsc";
import { RxMinusCircled } from "react-icons/rx";
import { RxPlusCircled } from "react-icons/rx";
import { useEffect, useState } from "react";
// import { API } from "../support/services/restAPI";
// import axios from 'axios'
import REST_API from "../support/services/RESTApiService";

export default function Cart() {
	const [data, setdata] = useState();
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

	let onGetCart = async () => {
		try {
			let { data } = await REST_API({
				url: "cart/get",
				method: "POST",
				data: {
					id: 4,
					branch_id: 1,
				},
			});
			console.log(data.data);
			setdata(data.data);
		} catch (error) {
			console.log(error);
		}
	};
	let updateQuantity = async (value, operation, quantity) => {
		try {
			if (operation === "+") {
				const { data } = await REST_API({
					url: "cart/inc",
					method: "POST",
					data: {
						id: value,
						quantity: quantity,
					},
				});

				console.log(data);
				onGetCart();
			} else if (operation === "-") {
				const { data } = await REST_API({
					url: "cart/dec",
					method: "POST",
					data: {
						id: value,
						quantity: quantity,
					},
				});
				console.log(data);
				onGetCart();
			}
		} catch (error) {
			console.log(error);
		}finally{
			setTimeout(() => {

			})
		}
	};
	useEffect(() => {
		onGetCart();
	}, []);
	return (
		<div className=" mb-24">
			<div className="pb-[64px] ">
				<NavigationBar state={{profile}} />
			</div>
			<div className=" max-w-[1120px] mx-auto ">
				<div className=" pl-5 flex items-end h-[66px] border-b-4 font-bold ">Cart</div>

				<div className="flex px-5 ">
					<div className=" w-[685px]">
						{data
							? data.map((value, index) => {
									return (
										<>
											{/* ORDER START HERE */}
											<div key={index} className=" mt-4 font-tokpedFont font-semibold text-[14px]">
												Order {index + 1}
											</div>
											<div className=" font-tokpedFont h-[288px] pt-4 border-b-4">
												<div className=" font-semibold text-[14px] h-[46px] flex justify-start items-center ">
													Toko {value.branch.location}
												</div>
												<div className=" h-[156px] flex flex-row pt-5 border-b">
													<div className=" h-[135px] w-[364px] flex ">
														<img
															alt="product_image"
															className=" h-[60px] w-[60px]"
															src={value.product.img}
														/>
														<div className=" h-[93px] my-[7px] ">
															<p className=" pl-[15px] font-tokpedFont text-[14px]">
																{value.product.name}
															</p>
															<p className=" flex gap-1 pl-[15px] font-tokpedFont text-[12px]">
																per <p className=" font-semibold">{value.product.unit.name}</p>
															</p>
															<p className=" pl-[15px] font-semibold font-tokpedFont text-[14px]">
																Rp. {value.product.price.toLocaleString()}
															</p>
														</div>
													</div>
												</div>
												<div className=" h-14 my-[6px] flex justify-end items-center">
													<div className=" h-6 justify-between flex items-center w-[331px]">
														<button className=" flex items-center pt-4">
															<VscTrash size={25} color="gray" />
														</button>
														<div className=" flex items-center pt-4 gap-1">
															<button
																disabled={value.qty <= 1 ? true : false}
																onClick={() => updateQuantity(value.id, "-", value.qty)}
															>
																<RxMinusCircled size={20} />
															</button>
															<input
																className=" max-w-[55px] h-5 text-center border-b"
																value={value.qty}
															/>
															<button
																disabled={
																	value.qty >= value.product.branch_products[0].stock ? true : false
																}
																onClick={() => updateQuantity(value.id, "+", value.qty)}
															>
																<RxPlusCircled size={20} className=" text-green-500 font-bold " />
															</button>
														</div>
													</div>
												</div>
											</div>
											{/* ORDER END HERE */}
										</>
									);
							  })
							: null}
					</div>
					<div className=" font-tokpedFont w-[350px] h-fit ml-[45px] mt-[80px] px-4 py-4 rounded-lg border shadow-xl">
						<p className=" font-semibold text-[14px]">Shopping Summary</p>
						<div className=" h-fit my-4 flex justify-between">
							<div>
								<p className=" text-[14px] ">Total price ({data ? data.length : null} Products)</p>
								<p className=" mt-2 text-[14px] ">Discount Product </p>
							</div>
							<div>
								<p className=" text-[14px]">Rp. 17,400</p>
								<p className=" text-[14px]">Rp. 5,000</p>
							</div>
						</div>
						<div className=" border-t flex justify-between h-[37px] items-end ">
							<p className=" font-semibold text-[16px] ">Total Bill</p>
							<p className=" font-semibold text-[16px] ">Rp. 12,400</p>
						</div>
						<p className=" mt-4 text-slate-500 text-[11px]">
							Dengan mengaktifkan asuransi, Saya menyetujui{" "}
							<p className=" text-red-700">syarat dan ketentuan yang berlaku.</p>
						</p>
						<button className=" mt-6 h-12 w-full text-white bg-red-700 rounded-lg ">Payment</button>
					</div>
				</div>
			</div>
		</div>
	);
}

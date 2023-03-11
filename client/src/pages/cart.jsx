import { VscTrash } from "react-icons/vsc";
import { RxMinusCircled } from "react-icons/rx";
import { RxPlusCircled } from "react-icons/rx";
import { useEffect, useState } from "react";
import REST_API from "../support/services/RESTApiService";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Cart() {
	const [data, setdata] = useState([]);
	const [sum, setsum] = useState(0);
	const [disc, setdisc] = useState(0);
	const Navigate = useNavigate();

	let onGetCart = async () => {
		try {
			let { data } = await REST_API({
				url: "cart/get",
				method: "GET",
			});
			let total = 0;
			console.log(data.data);
			data.data.forEach((value, index) => {
				total += value.qty * value.product.price;
			});
			console.log(total);
			setsum(total);
			setdisc(5000);
			setdata(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	let onDelCart = async (value) => {
		try {
			let { data } = await REST_API({
				url: "cart/del",
				method: "DELETE",
				data: {
					id: value,
				},
			});
			toast.success(data.message);
			console.log(data);
			onGetCart();
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
		} finally {
			setTimeout(() => {});
		}
	};
	useEffect(() => {
		localStorage.getItem("token")
		console.log(localStorage.getItem("token"))
		onGetCart();
	}, []);
	return (
		<div className=" mb-24">
			<div className=" pt-[64px] max-w-[1120px] mx-auto ">
				<div className=" pl-5 flex items-end h-[66px] border-b-4 font-bold ">Cart</div>

				<div className="flex px-5">
					{data.length > 0 ? (
						<div className=" w-[685px]">
							{data
								? data.map((value, index) => {
										return (
											<>
												{/* ORDER START HERE */}
												<div
													key={index}
													className=" mt-4 font-tokpedFont font-semibold text-[14px]"
												>
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
															<button
																onClick={() => onDelCart(value.id)}
																className=" flex items-center pt-4 "
															>
																<VscTrash
																	size={25}
																	className=" text-slate-500 hover:text-red-500"
																/>
															</button>
															{value.product.branch_products[0].stock === 0 ? (
																<p className="pt-4 text-red-700 font-tokpedFont font-semibold ">
																	Stock Habis
																</p>
															) : null}
															<div className=" flex items-center pt-4 gap-1">
																<button
																	className=" disabled:text-slate-500 enabled:text-green-500"
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
																	className=" disabled:text-slate-500 enabled:text-green-500"
																	disabled={
																		value.qty >= value.product.branch_products[0].stock
																			? true
																			: false
																	}
																	onClick={() => updateQuantity(value.id, "+", value.qty)}
																>
																	<RxPlusCircled size={20} />
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
					) : null}
					{data.length > 0 ? (
						<div className=" font-tokpedFont w-[350px] h-fit ml-[45px] mt-[80px] px-4 py-4 rounded-lg border shadow-xl">
							<p className=" font-semibold text-[14px]">Shopping Summary</p>
							<div className=" h-fit my-4 flex justify-between">
								<div>
									<p className=" text-[14px] ">
										Total price ({data ? data.length : null} Products)
									</p>
									<p className=" mt-2 text-[14px] ">Discount Product </p>
								</div>
								<div>
									<p className=" flex gap-1 text-[14px]">Rp. {sum.toLocaleString()} </p>
									<p className=" mt-2 text-[14px]">Rp. {disc.toLocaleString()}</p>
								</div>
							</div>
							<div className=" border-t flex justify-between h-[37px] items-end ">
								<p className=" font-semibold text-[16px] ">Total Bill</p>
								<p className=" font-semibold text-[16px] ">Rp. {(sum - disc).toLocaleString()} </p>
							</div>
							<p className=" mt-4 text-slate-500 text-[11px]">
								Dengan mengaktifkan asuransi, Saya menyetujui{" "}
								<p className=" text-red-700">syarat dan ketentuan yang berlaku.</p>
							</p>
							<button
								onClick={() => Navigate("/checkout")}
								className=" mt-6 h-12 w-full text-white bg-red-700 rounded-lg "
							>
								Checkout
							</button>
						</div>
					) : null}
					{data.length > 0 ? null : (
						<div className="mt-[71px] h-fit flex flex-col justify-center items-center w-full">
							<img
								alt="Kerjang Kosong"
								className=" h-[141px] w-[200px]"
								src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/zeus/kratos/60adc47d.jpg"
							/>
							<h1 className=" font-tokpedFont font-semibold text-[24px] mt-5  ">
								Wow, your shopping cart is empty
							</h1>
							<p className=" text-slate-400 font-tokpedFont text-[14px] mt-2 ">
								Come on, fill it with your dream items!
							</p>
							<button
								onClick={() => Navigate("/home")}
								className=" bg-red-700 text-white font-semibold rounded-md h-10 w-[200px] mt-4 "
							>
								Shope Now
							</button>
						</div>
					)}
				</div>
				<Toaster />
			</div>
		</div>
	);
}

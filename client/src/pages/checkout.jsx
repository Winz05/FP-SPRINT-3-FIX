import { Dropdown } from "flowbite-react";
import { DropdownItem } from "flowbite-react/lib/esm/components/Dropdown/DropdownItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import REST_API from "../support/services/RESTApiService";

export default function Checkout() {
	const [data, setdata] = useState();
	const [sum, setsum] = useState(0);
	const [courier, setcourier] = useState(0);

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
			setcourier(10000);
			console.log(data.data);
			setdata(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		onGetCart();
	}, []);
	return (
		<div className=" max-w-screen flex justify-center flex-col">
			<div className=" w-screen border-b">
				<div className="mx-auto flex justify-start items-center w-[1120px] h-[60px] font-mandalaFont text-red-700 font-bold text-3xl ">
					<button onClick={() => Navigate("/home")}>tokonglomerat</button>
				</div>
			</div>
			<div className=" mx-auto flex px-5 w-[1120px]">
				<div className=" w-[685px]">
					<div className="mt-10 font-tokpedFont text-[20px] font-bold">Checkout</div>
					<div className="flex justify-start h-[31px] items-start border-b mt-[29px] font-tokpedFont font-semibold text-[14px] w-[685px] ">
						Shipping Address
					</div>
					<div className=" h-[109px] border-b">
						<div className=" pt-3 flex gap-1">
							<p className=" font-semibold font-tokpedFont text-[13px]">Aswin Wibowo</p>
							<p className=" font-tokpedFont text-[13px] ">
								(jl. layar 1 no. 29, Kelapa Dua, Tangerang)
							</p>
							<p className=" h-5 w-12 text-[10px] flex justify-center items-center rounded-sm font-mandala font-extrabold bg-green-200 text-[#03ac0e]">
								Utama
							</p>
						</div>
						<div className=" mt-1 font-tokpedFont font-normal text-[13px]">087805667895</div>
						<div className=" mt-1 font-tokpedFont text-slate-500 font-normal text-[13px]">
							jl. layar 1 no.29, kelapa dua, Tangerang
						</div>
						<div className=" font-tokpedFont text-slate-500 font-normal text-[13px]">
							Kelapa Dua, Kab. Tangerang, 15810
						</div>
					</div>
					<div className=" flex justify-between items-center h-[135px] border-b-4">
						<button className=" font-semibold text-[14px] font-tokpedFont flex justify-center px-4 h-10 w-fit border rounded-lg items-center tracking-wide ">
							Choose Another Address
						</button>
						<div className=" items-center w-[306px]">
							<p className=" font-semibold text-[12px] ">Select Courier</p>
							<button className=" mt-2 pl-2 flex justify-start items-center bg-red-700 text-white w-full rounded-lg h-10">
								<Dropdown inline={true} label="Shipping Methode">
									<DropdownItem className=" flex justify-between w-[270px] h-[60px] mx-[15px] pt-3 border-b ">
										<div className=" text-left ">
											<p className=" font-bold font-tokpedFont text-[12px]">POS</p>
											<p className=" font-tokpedFont text-slate-500 text text-[12px]">
												Estimasi Hari 4-5
											</p>
										</div>
										<div>Rp. 10,000</div>
									</DropdownItem>
									<DropdownItem className=" flex justify-between h-[60px] mx-[15px] pt-3 border-b ">
										<div className=" text-left ">
											<p className=" font-bold font-tokpedFont text-[12px]">JNE</p>
											<p className=" font-tokpedFont text-slate-500 text text-[12px]">
												Estimasi Hari 4-5
											</p>
										</div>
										<div>Rp.10,000</div>
									</DropdownItem>
									<DropdownItem className=" flex justify-between h-[60px] mx-[15px] pt-3 border-b ">
										<div className=" text-left ">
											<p className=" font-bold font-tokpedFont text-[12px]">TIKI</p>
											<p className=" font-tokpedFont text-slate-500 text text-[12px]">
												Estimasi Hari 4-5
											</p>
										</div>
										<div>Rp.10,000</div>
									</DropdownItem>
								</Dropdown>
							</button>
						</div>
					</div>
					{data
						? data.map((value, index) => {
								return (
									<>
										{/* ORDER START HERE */}
										<div className=" mt-4 font-tokpedFont font-semibold text-[14px]">
											Order {index + 1}
										</div>
										<div className=" font-tokpedFont h-fit pt-4 border-b-4">
											<div className=" font-semibold text-[14px] h-[46px] flex justify-start items-center ">
												Toko {value.branch.location}
											</div>
											<div className=" h-[156px] flex flex-row pt-5 border-b">
												<div className=" h-[135px] w-[364px] flex ">
													<img
														alt="Image_Product"
														className=" h-[60px] w-[60px]"
														src={value.product.img}
													/>
													<div className=" h-[93px] my-[7px] ">
														<p className=" pl-[15px] font-tokpedFont text-[14px]">
															{value.product.name}
														</p>
														<p className=" pl-[15px] flex gap-1 font-tokpedFont text-[12px]">
															per <p className=" font-semibold">{value.product.unit.name}</p>
														</p>
														<p className=" pl-[15px] font-semibold font-tokpedFont text-[14px]">
															Rp. {value.product.price.toLocaleString()}
														</p>
														<p className=" pl-[15px] flex gap-1 font-tokpedFont text-[14px]">
															Quantity :{" "}
															<p className=" font-tokpedFont font-semibold text-[14px]">
																{value.qty}
															</p>
														</p>
													</div>
												</div>
											</div>
											<div className=" h-14 my-[6px] flex justify-between items-center">
												<p className=" font-semibold text-[14px]">Subtotal</p>
												<p className=" font-semibold text-[14px]">
													Rp. {(value.product.price * value.qty).toLocaleString()}{" "}
												</p>
											</div>
										</div>
										{/* ORDER END HERE */}
									</>
								);
						  })
						: null}
				</div>
				<div className=" font-tokpedFont w-[350px] h-fit ml-[45px] mt-[182px] px-4 py-4 rounded-lg border shadow-xl">
					<p className=" font-semibold text-[14px]">Shopping Summary</p>
					<div className=" h-fit my-4 flex justify-between">
						<div>
							<p className=" text-[14px] ">Total price ({data ? data.length : null} Products)</p>
							<p className=" mt-2 text-[14px] ">Courier Cost </p>
						</div>
						<div>
							<p className=" flex gap-1 text-[14px]">Rp. {sum.toLocaleString()} </p>
							<p className=" mt-2 text-[14px]">Rp. {courier.toLocaleString()}</p>
						</div>
					</div>
					<div className=" border-t flex justify-between h-[37px] items-end ">
						<p className=" font-semibold text-[16px] ">Total Bill</p>
						<p className=" font-semibold text-[16px] ">Rp. {(sum + courier).toLocaleString()}</p>
					</div>
					<p className=" mt-4 text-slate-500 text-[11px]">
						Dengan mengaktifkan asuransi, Saya menyetujui{" "}
						<p className=" text-red-700">syarat dan ketentuan yang berlaku.</p>
					</p>
					<button className=" mt-6 h-12 w-full text-white bg-red-700 rounded-lg ">Payment</button>
				</div>
			</div>
		</div>
	);
}

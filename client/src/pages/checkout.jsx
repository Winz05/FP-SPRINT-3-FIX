import { Dropdown } from "flowbite-react";
import { DropdownItem } from "flowbite-react/lib/esm/components/Dropdown/DropdownItem";

export default function Checkout() {
	return (
		<div className=" max-w-screen flex justify-center flex-col">
			<div className=" w-screen border-b">
				<div className="mx-auto flex justify-start items-center w-[1120px] h-[60px] font-mandalaFont text-red-700 font-bold text-3xl ">
					tokonglomerat
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
					{/* ORDER START HERE */}
					<div className=" mt-4 font-tokpedFont font-semibold text-[14px]">Order 1</div>
					<div className=" font-tokpedFont h-fit pt-4 border-b-4">
						<div className=" font-semibold text-[14px] h-[46px] flex justify-start items-center ">
							Toko Jakarta
						</div>
						<div className=" h-[156px] flex flex-row pt-5 border-b">
							<div className=" h-[135px] w-[364px] flex ">
								<img
									alt="Image_Product"
									className=" h-[60px] w-[60px]"
									src="https://assets.segari.id/products/10002900001_20122022112329.webp"
								/>
								<div className=" h-[93px] my-[7px] ">
									<p className=" pl-[15px] font-tokpedFont text-[14px]">Pakcoy</p>
									<p className=" pl-[15px] font-tokpedFont text-[12px]">450 - 550 gram / pack</p>
									<p className=" pl-[15px] font-semibold font-tokpedFont text-[14px]">Rp. 4,000</p>
								</div>
							</div>
						</div>
						<div className=" h-14 my-[6px] flex justify-between items-center">
							<p className=" font-semibold text-[14px]">Subtotal</p>
							<p className=" font-semibold text-[14px]">Rp. 4,000 </p>
						</div>
					</div>
					{/* ORDER END HERE */}
					{/* ORDER START HERE */}
					<div className=" mt-4 font-tokpedFont font-semibold text-[14px]">Order 2</div>
					<div className=" font-tokpedFont h-fit pt-4 border-b-4">
						<div className=" font-semibold text-[14px] h-[46px] flex justify-start items-center ">
							Toko Jakarta
						</div>
						<div className=" h-[156px] flex flex-row pt-5 border-b">
							<div className=" h-[135px] w-[364px] flex ">
								<img
									alt="Image_Product"
									className=" h-[60px] w-[60px]"
									src="https://assets.segari.id/products/70000600018_27122022104740.webp"
								/>
								<div className=" h-[93px] my-[7px] ">
									<p className=" pl-[15px] font-tokpedFont text-[14px]">Tahu Cina Manalagi</p>
									<p className=" pl-[15px] font-tokpedFont text-[12px]">450 - 550 gram / pack</p>
									<p className=" pl-[15px] font-semibold font-tokpedFont text-[14px]">Rp. 13,400</p>
								</div>
							</div>
						</div>
						<div className=" h-14 my-[6px] flex justify-between items-center">
							<p className=" font-semibold text-[14px]">Subtotal</p>
							<p className=" font-semibold text-[14px]">Rp. 13,400 </p>
						</div>
					</div>
					{/* ORDER END HERE */}
				</div>
				<div className=" font-tokpedFont w-[350px] h-[266px] ml-[45px] mt-[182px] px-4 py-4 rounded-lg border shadow-xl">
					<p className=" font-semibold text-[14px]">Shopping Summary</p>
					<div className=" h-[21px] my-4 flex justify-between">
						<p className=" text-[14px] ">Total price (2 Products)</p>
						<p className=" text-[14px]">Rp. 17,400</p>
					</div>
					<div className=" border-t flex justify-between h-[37px] items-end ">
						<p className=" font-semibold text-[16px] ">Total Bill</p>
						<p className=" font-semibold text-[16px] ">Rp. 37,400</p>
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

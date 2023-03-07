import React from "react";
import { useState } from "react";
import banner from "../support/assets/752e7f93-363f-4303-8fb6-ea887dfd17d3.jpg";
import { useEffect } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import REST_API from "../support/services/RESTApiService";

export default function LandingPage() {
	const [product, setproduct] = useState();
	const [page, setpage] = useState();
	const [selectedpage, setselectedpage] = useState();
	const [category, setcategory] = useState();

	const getCategory = async () => {
		const { data } = await REST_API({
			url: "product/category",
			method: "GET",
		});
		setcategory(data.data);
	};
	const getTotalPage = async (branch) => {
		try {
			const { data } = await REST_API({
				url: `product/totalPage?branch=${branch}`,
				method: "GET",
			});
			setpage(Math.ceil(data.data / 10));
		} catch (error) {
			console.log(error);
		}
	};
	const getAllProduct = async (page) => {
		try {
			const { data } = await REST_API({
				url: `product?page=${page}`,
				method: "GET",
			});
			setproduct(data.data);
			setselectedpage(page);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getAllProduct(1);
		getTotalPage(1);
		getCategory();
	}, []);
	return (
		<div className="pt-20 max-w-screen-xl mx-auto font-tokpedFont">
			<div className="flex justify-center">
				<img
					src={banner}
					alt="banner"
					className="h-[400px] w-[1200px] object-scale-down shadow-md rounded-xl"
				/>
			</div>
			<div className="flex justify-evenly py-10">
				{category
					? category.map((value, index) => {
							return (
								<button key={index} className="space-y-2">
									<a
										href={`/category/category=${value.id}&branch=${
											product ? product[0].branch.id : ""
										}`}
									>
										<img
											src={value.img}
											alt={value.name}
											className="h-32 w-32 border-black border-[2px] rounded-full"
										/>
										<p className="font-semibold font-mandalaFont text-xl">{value.name}</p>
									</a>
								</button>
							);
					  })
					: null}
			</div>
			<div className="grid grid-cols-4 gap-7">
				{product
					? product.map((value, index) => {
							return (
								<div
									key={index}
									className="flex flex-col shadow-md justify-between w-full max-w-sms h-80 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
								>
									<img className="rounded-t-lg h-44" src={value.product.img} alt="product" />
									<div className="px-5 pb-5">
										<h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
											{value.product.name}
										</h5>
										<h4>Toko {value.branch.location}</h4>
										<div className="flex items-center justify-between">
											<span className="text-lg font-bold text-gray-900 dark:text-white">
												Rp. {value.product.price.toLocaleString()}
											</span>
										</div>
									</div>
								</div>
							);
					  })
					: null}
			</div>
			<div className="flex justify-center items-center my-5">
				<label className=" p-1" htmlFor="">
					page
				</label>
				<button
					className="bg-red-500 border-black border-y-[1px] border-l-[1px] p-2 rounded-l-lg"
					onClick={() => getAllProduct(selectedpage - 1)}
					disabled={parseInt(selectedpage) === 1}
				>
					<GrPrevious />
				</button>
				<input
					type="text"
					value={selectedpage}
					onChange={(e) => getAllProduct(e.target.value)}
					className="w-8 p-1 border-black border-y-[1px]"
				/>
				<button
					className="bg-red-500 border-black border-y-[1px] border-r-[1px] p-2 rounded-r-lg"
					onClick={() => getAllProduct(selectedpage + 1)}
					disabled={parseInt(selectedpage) === parseInt(page)}
				>
					<GrNext />
				</button>
				<label className="p-1" htmlFor="">
					of {page}
				</label>
			</div>
		</div>
	);
}

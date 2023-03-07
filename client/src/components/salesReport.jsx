import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SalesReport() {
	// transaction
	const [dataTransaction, setDataTransaction] = useState([]);

	// User
	const [dataUser, setDataUser] = useState([]);

	// product
	const [dataProduct, setDataProduct] = useState([]);
	const [date, setDate] = useState({
		from: "",
		to: "",
	});
	const [selectedDate, setSelectedDate] = useState({
		from: "",
		to: "",
	});

	let onGetData = async (filter, sort) => {
		try {
			let responseTransaction = await axios.get(
				`http://localhost:8000/admin/sales-report?report=transaction&filter=${filter}&sort=${sort}`,
				{
					headers: {
						token: "4e3f5a55-14ba-42ca-a485-b29a13f4404d",
					},
				}
			);

			let responseProduct = await axios.get(
				`http://localhost:8000/admin/sales-report?report=product&filter=${filter}&sort=${sort}`,
				{
					headers: {
						token: "4e3f5a55-14ba-42ca-a485-b29a13f4404d",
					},
				}
			);

			let responseUser = await axios.get(
				`http://localhost:8000/admin/sales-report?report=user&filter=${filter}&sort=${sort}`,
				{
					headers: {
						token: "4e3f5a55-14ba-42ca-a485-b29a13f4404d",
					},
				}
			);

			setDataTransaction(responseTransaction.data.data);
			setDataProduct(responseProduct.data.data);
			setDataUser(responseUser.data.data);

			console.log(responseTransaction.data.data, "trans");
			console.log(responseProduct.data.data);
			console.log(responseUser.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	// let onGetDataUser = async () => {
	// 	try {
	// 		let response = await axios.get(
	// 			`http://localhost:8000/admin/sales-report?report=user`,
	// 			{
	// 				headers: {
	// 					token: "4e3f5a55-14ba-42ca-a485-b29a13f4404d",
	// 				},
	// 			}
	// 		);
	// 		console.log(response.data.data, "userr");
	// 		setDataUser(response.data.data);
	// 	} catch (error) {}
	// };

	// let onGetDataProduct = async () => {
	// 	try {
	// 		let response = await axios.get(
	// 			`http://localhost:8000/admin/sales-report?report=product`,
	// 			{
	// 				headers: {
	// 					token: "4e3f5a55-14ba-42ca-a485-b29a13f4404d",
	// 				},
	// 			}
	// 		);
	// 		console.log(response.data.data, "product");
	// 		setDataProduct(response.data.data);
	// 	} catch (error) {}
	// };

	useEffect(() => {
		onGetData(``, "");
	}, []);

	return (
		<div className="bg-white px-10">
			<div>
				<div>
					{/* <h1>Sales Report {dataProduct[0].branch? dataProduct[0].branch.location :null }</h1> */}
					<DatePicker
						showMonthDropdown={true}
						showYearDropdown={true}
						scrollableYearDropdown={true}
						selected={selectedDate.from === "" ? null : selectedDate.from}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full"
						onChange={(date) => {
							setDate({ ...date, from: date.toISOString().split("T")[0] });
							setSelectedDate({ ...selectedDate, from: date });
						}}
					/>
					{console.log(date)}
					<DatePicker
						showMonthDropdown={true}
						showYearDropdown={true}
						scrollableYearDropdown={true}
						selected={selectedDate.to === "" ? null : selectedDate.to}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full"
						onChange={(date) => {
							setDate({ ...date, to: date.toISOString().split("T")[0] });
							setSelectedDate({ ...selectedDate, to: date });
						}}
					/>
				</div>

				<div>
					<h1>Transaction</h1>
					<button onClick={() => test()}>set date</button>

					<label
						for="countries"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Select an option
					</label>
					<select
						id="countries"
						onChange={(e) =>
							onGetData(
								date.from === "" && date.to === ""
									? ""
									: `${date.from}/${date.to}`,
								e.target.value
							)
						}
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option selected>sort by</option>
						<option value="date-asc">date ascending</option>
						<option value="date-desc">date descending</option>
						<option value="income-asc">income ascending</option>
						<option value="income-desc">income descending</option>
					</select>
				</div>
				<div>
					{dataTransaction ? (
						<table className=" border border-collapse ">
							{/* <thead >
						<tr>
							<th>
								<td>transaction id</td>
								<td>product name</td>
								<td>qty</td>
								<td>invoice</td>
								<td>date</td>
							</th>
						</tr>
					</thead> */}

							<thead>
								<tr className="border">
									<th className="px-2">ID</th>
									<th className=" px-10 flex justify-center">Product name</th>
									<th className="px-2">Quantity</th>
									<th className="px-2">Invoice</th>
									<th className="px-2">Date</th>
								</tr>
							</thead>

							{dataTransaction
								? dataTransaction.map((value, index) => {
										return (
											<tbody>
												<tr>
													<td className="text-center">
														{value.id ? value.id : value.transaction_id}
													</td>
													<td className="text">{value.product_name}</td>
													<td className="text-center">
														{value.qty ? value.qty : value.total_qty}
													</td>
													<td className="text-center">{value.invoice_no}</td>
													<td className="text-center">
														{value.createdAt.split("T")[0]}
													</td>
												</tr>
											</tbody>
										);
								  })
								: null}
						</table>
					) : null}
				</div>
			</div>
			<div className="mt-10">
				<h1>Sales Report</h1>

				<div>
					<h1>User</h1>
				</div>
				<div>
					{dataUser ? (
						<table className=" border border-collapse ">
							{/* <thead >
						<tr>
							<th>
								<td>transaction id</td>
								<td>product name</td>
								<td>qty</td>
								<td>invoice</td>
								<td>date</td>
							</th>
						</tr>
					</thead> */}

							<thead>
								<tr className="border">
									<th className="px-2">ID</th>
									<th className="pr-60 flex justify-center">User Name</th>
									<th className="px-2">Quantity</th>
									<th className="px-2">Invoice</th>
									<th className="px-2">Total income</th>
								</tr>
							</thead>

							{dataTransaction
								? dataUser.map((value, index) => {
										return (
											<tbody>
												<tr>
													<td className="text-center">{value.user_id}</td>
													<td className="text-center">{value.user.name}</td>
													<td className="text-center">{value.total_qty}</td>
													<td className="text-center">{value.invoice_no}</td>
													<td className="text-center">{value.total_price}</td>
												</tr>
											</tbody>
										);
								  })
								: null}
						</table>
					) : null}
				</div>
			</div>
			<div>
				<div className="mt-10">
					<h1>Sales Report</h1>
					<div>
						<h1>Product</h1>
					</div>
					<div>
						{dataProduct ? (
							<table className=" border border-collapse ">
								{/* <thead >
						<tr>
							<th>
								<td>transaction id</td>
								<td>product name</td>
								<td>qty</td>
								<td>invoice</td>
								<td>date</td>
							</th>
						</tr>
					</thead> */}

								<thead>
									<tr className="border">
										<th className="pr-72 flex justify-center">Product name</th>
										<th className="px-2">Quantity</th>
										<th className="px-2">Total Income</th>
										<th className="px-2">Location</th>
									</tr>
								</thead>

								{dataProduct
									? dataProduct.map((value, index) => {
											return (
												<tbody>
													<tr>
														<td className="text-center">
															{value.product_name}
														</td>
														<td className="text-center">{value.qty_sold}</td>
														<td className="text-center">
															{value.income_money}
														</td>
														<td className="text-center">
															{value.branch.location}
														</td>
													</tr>
												</tbody>
											);
									  })
									: null}
							</table>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}

export default SalesReport;

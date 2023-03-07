import React, { useEffect, useState } from "react";
import { Modal, Label, TextInput, Button, Spinner } from "flowbite-react";
import { useForm } from "react-hook-form";
import { FaFemale, FaMale } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import REST_API from "../support/services/RESTApiService";

export default function Profile(props) {
	const navigate = useNavigate();
	const [date, setdate] = useState();
	const [img, setimg] = useState();
	const [show, setshow] = useState({
		edit: false,
		loading: false,
		changePassword: false,
		changeAddress: false,
		changeProfilePic: false,
	});
	const [profile, setprofile] = useState({
		name: "",
		birthdate: "",
		gender: "",
		email: "",
		phone_number: "",
		profile_picture: "",
		address: "",
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

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

	const onSubmit = async (data) => {
		setshow({ ...show, loading: true });
		try {
			await REST_API({
				url: "user/edit",
				method: "PATCH",
				data: {
					name: data.name,
					email: data.email,
					phone_number: data.phone_number,
					gender: profile.gender,
					birthdate: data.birthdate,
				},
			});
			toast.success("Profile updated");
			setshow({ ...show, edit: false });
			getProfile();
		} catch (error) {
			toast.error("Something went wrong");
		} finally {
			setshow({ ...show, loading: false });
			setshow({ ...show, disable: false });
			navigate("/profile");
		}
	};

	const validateImage = (e) => {
		const err = {
			msg1: "Select 1 Image only!",
			msg2: `${e.target.files[0].name} more than 1MB`,
		};
		try {
			if (e.target.files > 1) throw err.msg1;

			if (e.target.files[0].size > 1000000) throw err.msg2;
			setimg(e.target.files[0]);
		} catch (error) {
			toast.error(error);
		}
	};

	const onSubmitPP = async () => {
		const fd = new FormData();
		try {
			fd.append("images", img);
			await REST_API({
				url: "user/profile/picture",
				method: "PATCH",
				data: fd,
			});
			toast("Profile picture updated");
		} catch (error) {
			toast.error("Upload image failed");
		}
	};

	const onSubmitChangePassword = async (data) => {
		const err = { msg: "Please input the same password" };
		setshow({ ...show, loading: true });
		try {
			if (data.newPassword !== data.confirmNewPassword) throw err;

			await REST_API({
				url: "user/profile/change-password",
				method: "PATCH",
				data: {
					oldPassword: data.oldPassword,
					newPassword: data.newPassword,
				},
			});
			setshow({ ...show, changePassword: false });
			props.state.getProfile();
			toast.success("Password changed");
		} catch (error) {
			toast.error(error.msg ? error.msg : error.response.data.message);
		} finally {
			setshow({ ...show, loading: false });
		}
	};

	const deleteAddress = async (id) => {
		try {
			await REST_API({
				url: `user/delete-address/${id}`,
				method: "DELETE",
			});
			getProfile();
			toast.success("Address deleted");
		} catch (error) {
			console.log(error);
		}
	};
	const editAddress = async (data) => {};
	const makeDefault = async (id) => {
		try {
			await REST_API({
				url: `user/main-address/${id}`,
				method: "PATCH",
			});
			props.func.getProfile();
			toast.success("Main address updated");
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		props.func.getProfile();
	}, []);
	return (
		<div className="pt-20 flex justify-center font-tokpedFont items-center h-screen">
			<div className=" max-w-screen-xl w-full grid grid-cols-3 rounded-lg border-[1px] h-[600px]">
				<div className=" col-span-1 shadow-md m-5 rounded-lg">
					<div className="flex justify-center p-5">
						<img
							src={`http://localhost:8000/${props.state.profile.profile_picture}`}
							alt="Profile"
							className="h-80 w-80 shadow-md object-cover"
						/>
					</div>
					<div className="flex flex-col justify-center py-3 px-5 space-y-5">
						<button
							onClick={() => setshow({ ...show, changeProfilePic: true })}
							className="border border-gray-400 text-[#6D7588] rounded-lg px-2 py-1 w-full"
						>
							Change Profile Picture
						</button>
						<button
							onClick={() => setshow({ ...show, changePassword: true })}
							className="border border-gray-400 text-[#6D7588] rounded-lg px-2 py-1 w-full"
						>
							Change Password
						</button>
						<button
							onClick={() => setshow({ ...show, changeAddress: true })}
							className="border border-gray-400 text-[#6D7588] rounded-lg px-2 py-1 w-full"
						>
							Change Addresses
						</button>
					</div>
				</div>
				<div className=" col-span-2 m-5 p-5">
					<div>
						<h3 className="text-2xl text-[#6D7588]">Change Profile</h3>
					</div>
					<table className="w-full mt-5 text-left text-[#848893]">
						<tr>
							<th className="py-5 font-medium">Name</th>
							<td> {`${props.state.profile.name} `}</td>
						</tr>
						<tr>
							<th className="py-5 font-medium">Birthdate</th>
							<td>
								{" "}
								{`${
									props.state.profile.birthdate
										? props.state.profile.birthdate
										: " "
								} `}
							</td>
						</tr>
						<tr>
							<th className="py-5 font-medium">Gender</th>
							<td>
								{" "}
								{`${
									props.state.profile.gender ? props.state.profile.gender : " "
								} `}
							</td>
						</tr>
						<tr>
							<th className="py-5 font-medium">Email</th>
							<td> {`${props.state.profile.email} `}</td>
						</tr>
						<tr>
							<th className="py-5 font-medium">Phone</th>
							<td> {`${props.state.profile.phone_number} `}</td>
						</tr>
					</table>
					<div className="flex justify-end space-x-5">
						<button
							onClick={() => setshow({ ...show, edit: true })}
							className="border border-black p-2 rounded-lg bg-red-700 text-white"
						>
							Edit profile
						</button>
					</div>
				</div>
			</div>
			<Modal
				show={show.edit}
				size="md"
				popup={true}
				onClose={() => setshow({ ...show, edit: false })}
				id="name modal"
			>
				<Modal.Header />
				<Modal.Body>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8"
					>
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">
							Change your profile
						</h3>
						<div className="space-y-2">
							<div className="mb-2 block">
								<Label htmlFor="name" value="Edit your name" />
							</div>
							<TextInput
								type="text"
								required={true}
								onChange={(e) =>
									props.state.setprofile({ ...profile, name: e.target.value })
								}
								defaultValue={props.state.profile.name}
								{...register("name")}
							/>
							<div className="mb-2 block">
								<Label htmlFor="birthdate" value="Edit your birthdate" />
							</div>
							<DatePicker
								showMonthDropdown={true}
								showYearDropdown={true}
								scrollableYearDropdown={true}
								onChange={(date) => {
									props.state.setprofile({
										...profile,
										birthdate: date.toISOString().split("T")[0],
									});
									setdate(date);
								}}
								selected={date}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full"
							/>
							<div className="mb-2 block">
								<Label htmlFor="gender" value="Select your gender" />
								<div className="flex justify-evenly py-2">
									<div className="flex flex-col justify-center items-center">
										<FaMale
											values="Male"
											className={`text-4xl rounded-full ${
												props.state.profile.gender === "Male"
													? "bg-blue-200"
													: null
											}`}
											onClick={() =>
												props.state.setprofile({ ...profile, gender: "Male" })
											}
										/>
										<p>Male</p>
									</div>
									<div className="flex flex-col justify-center items-center">
										<FaFemale
											values="Female"
											className={`text-4xl rounded-full ${
												props.state.profile.gender === "Female"
													? "bg-blue-200"
													: null
											}`}
											onClick={() =>
												props.state.setprofile({ ...profile, gender: "Female" })
											}
										/>
										<p>Female</p>
									</div>
								</div>
							</div>
							<div className="mb-2 block">
								<Label htmlFor="email" value="Edit your email" />
							</div>
							<TextInput
								type="text"
								required={true}
								defaultValue={props.state.profile.email}
								onChange={(e) =>
									props.state.setprofile({ ...profile, email: e.target.value })
								}
								{...register("email", {
									pattern: {
										value:
											/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
										message: "Please input a valid email",
									},
								})}
							/>
							<p>{errors.email?.message}</p>
							<div className="mb-2 block">
								<Label htmlFor="password" value="Edit your phone number" />
							</div>
							<TextInput
								type="text"
								required={true}
								defaultValue={props.state.profile.phone_number}
								onChange={(e) =>
									props.state.setprofile({
										...profile,
										phone_number: e.target.value,
									})
								}
								{...register("phone_number", {
									pattern: {
										value: /^[0-9]*$/,
										message: "Please input a valid phone number",
									},
								})}
							/>
							<p>{errors.phone_number?.message}</p>
						</div>
						<div className="w-full flex justify-end">
							{show.loading ? (
								<button>
									<Spinner aria-label="Default status example" />
								</button>
							) : (
								<Button type="submit">Submit</Button>
							)}
						</div>
					</form>
				</Modal.Body>
			</Modal>
			<Modal
				show={show.changeProfilePic}
				size="md"
				popup={true}
				onClose={() => setshow({ ...show, changeProfilePic: false })}
				id="name modal"
			>
				<Modal.Header />
				<Modal.Body>
					<div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">
							Change your profile picture
						</h3>
						<div className="space-y-2">
							<div className="mb-2 block">
								<Label htmlFor="password" value="Upload image" />
							</div>
							<input
								type="file"
								name="myImage"
								accept="image/png, image/gif, image/jpeg, image/jpg"
								onChange={(e) => validateImage(e)}
								className="rounded-lg bg-slate-500 text-white"
							/>
							<p className="text-xs">Upload image with .jpg, .png, .jpeg</p>
							<p className="text-xs">Max size 1MB</p>
						</div>
						<div className="w-full flex justify-end">
							{show.loading ? (
								<button>
									<Spinner aria-label="Default status example" />
								</button>
							) : (
								<Button onClick={() => onSubmitPP()}>Submit</Button>
							)}
						</div>
					</div>
				</Modal.Body>
			</Modal>
			<Modal
				show={show.changePassword}
				size="md"
				popup={true}
				onClose={() => setshow({ ...show, changePassword: false })}
				id="name modal"
			>
				<Modal.Header />
				<Modal.Body>
					<form
						onSubmit={handleSubmit(onSubmitChangePassword)}
						className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8"
					>
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">
							Change your password
						</h3>
						<div className="space-y-2">
							<div className="mb-2 block">
								<Label htmlFor="password" value="Old password" />
							</div>
							<TextInput type="password" {...register("oldPassword")} />
							<div className="mb-2 block">
								<Label htmlFor="password" value="New password" />
							</div>
							<TextInput
								type="password"
								{...register("newPassword", {
									pattern: {
										value:
											/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])([a-zA-Z0-9]+){8,16}$/,
										message:
											"Minimum password 8-16 characters and 1 capital letters",
									},
								})}
							/>
							<div className="mb-2 block">
								<Label htmlFor="password" value="Confirm new password" />
							</div>
							<TextInput type="password" {...register("confirmNewPassword")} />
							<p className="text-sm text-red-900">
								{errors.newPassword?.message}
							</p>
						</div>
						<div className="w-full flex justify-end">
							{show.loading ? (
								<button>
									<Spinner aria-label="Default status example" />
								</button>
							) : (
								<Button type="submit">Submit</Button>
							)}
						</div>
					</form>
				</Modal.Body>
			</Modal>
			<Modal
				show={show.changeAddress}
				size="3xl"
				popup={true}
				onClose={() => setshow({ ...show, changeAddress: false })}
				id="name modal"
			>
				<Modal.Header />
				<Modal.Body>
					<div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">
							Manage your addresses
						</h3>
						{props.state.profile.address
							? props.state.profile.address.map((value, index) => {
									return (
										<div
											className={`p-3 shadow-md rounded-lg space-y-2 ${
												value.main_address ? "bg-red-200" : null
											}`}
											key={index}
										>
											<p className="text-lg w-full font-semibold">
												{value.address}
											</p>
											<p className="text-md">{value.receiver_name}</p>
											<p className="text-md">{value.receiver_phone}</p>
											{value.main_address ? (
												<div className="right-2 top-1">
													<p className="text-sm px-2 bg-green-500 rounded-3xl w-fit">
														Main Address
													</p>
												</div>
											) : null}
											<div className="w-full flex space-x-2 pt-2">
												{show.loading ? (
													<button>
														<Spinner aria-label="Default status example" />
													</button>
												) : value.main_address ? null : (
													<>
														<Button
															size="xs"
															className="p-0"
															onClick={() => makeDefault(value.id)}
														>
															Make default
														</Button>
														<Button color="success" size="xs" className="p-0">
															Edit
														</Button>
														<Button
															size="xs"
															color="failure"
															className="p-0"
															onClick={() => deleteAddress(value.id)}
														>
															Delete
														</Button>
													</>
												)}
											</div>
										</div>
									);
							  })
							: null}
					</div>
				</Modal.Body>
			</Modal>
			<Toaster />
		</div>
	);
}

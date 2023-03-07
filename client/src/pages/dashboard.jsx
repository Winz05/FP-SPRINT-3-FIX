import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function Dashboard(params) {
	const [admin, setAdmin] = useState(true);
	const [navmenu, setNavmenu] = useState(true);

	function toggle(params) {
		if (navmenu === false) {
			setNavmenu(true);
		} else if (navmenu === true) {
			setNavmenu(false);
		}
	}

	return (
		<div>
			<nav className="bg-white flex justify-between px-4 fixed top-0 z-40 w-full h-14 min-[640px]:hidden ">
				<button onClick={() => toggle()} className=" min-[640px]:hidden">
					<svg
						class="w-6 h-6"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							clip-rule="evenodd"
							fill-rule="evenodd"
							d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
						></path>
					</svg>
				</button>
				<a class="flex items-center ml-2 min-[640px]:hidden md:mr-24">
					<img
						src="https://play-lh.googleusercontent.com/boZIokjjWqcraRXdblgqxqCquWz-zk626VsNYSgyLn9ltvjoW59uU5nlY9l-qnA1wlQ"
						class="h-6 w-6 mr-3 sm:h-6"
						alt="FlowBite Logo"
					/>
					<span class="self-center text-md font-semibold sm:text-xl whitespace-nowrap text-red-700 dark:text-white">
						tokonglomerat
					</span>
				</a>
			</nav>

			{
            admin=== true? 
            <div
				id="dropdown"
				class=" z-30 mt-6 ml-4  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute left-0"
				hidden={navmenu}
			>
				<ul
					class="py-2 text-sm text-gray-700 dark:text-gray-200"
					aria-labelledby="dropdownDefaultButton"
				>
					<li>
						<a
							href="#"
							class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Overview
						</a>
					</li>
					<li>
						<a
							href="#"
							class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Branch Admin Register
						</a>
					</li>
               <li>
						<a
							href="#"
							class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Transaction
						</a>
					</li>
               <li>
						<a
							href="#"
							class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Sales Report
						</a>
					</li>
               <li>
						<a
							href="#"
							class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Discount Management
						</a>
					</li>
               <li>
						<a
							href="#"
							class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Stock History
						</a>
					</li>
					<li>
						<a
							href="#"
							class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Sign out
						</a>
					</li>
				</ul>
			</div>
         :
         <div
				id="dropdown"
				class=" z-30 mt-6 ml-4  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute left-0"
				hidden={navmenu}
			>
				<ul
					class="py-2 text-sm text-gray-700 dark:text-gray-200"
					aria-labelledby="dropdownDefaultButton"
				>
					<li>
						<a
							href="#"
							class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Overview
						</a>
					</li>
					<li>
						<a
							href="#"
							class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Product Management
						</a>
					</li>
               <li>
						<a
							href="#"
							class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Transaction
						</a>
					</li>
               <li>
						<a
							href="#"
							class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Sales Report
						</a>
					</li>
               <li>
						<a
							href="#"
							class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Discount Management
						</a>
					</li>
               <li>
						<a
							href="#"
							class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Stock History
						</a>
					</li>
					<li>
						<a
							href="#"
							class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Sign out
						</a>
					</li>
				</ul>
			</div>
         }

			{admin === true ? 
				<aside
					id="logo-sidebar"
					class="fixed top-0 left-0 z-50 w-64 h-screen pt-10 max-[640px]:hidden bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
					aria-label="Sidebar"
				>
					<a href="https://flowbite.com" class="flex ml-2 md:mr-24">
						<img
							src="https://play-lh.googleusercontent.com/boZIokjjWqcraRXdblgqxqCquWz-zk626VsNYSgyLn9ltvjoW59uU5nlY9l-qnA1wlQ"
							class="h-8 mr-3"
							alt="FlowBite Logo"
						/>
						<span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-red-700 dark:text-white">
							tokonglomerat
						</span>
					</a>
					<div class="h-full pt-10 px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
						<div className="w-full flex-row items-center ">
							
							<img
								src="https://www.w3schools.com/howto/img_avatar.png"
								className="mx-16 rounded-full h-20 w-20"
							/>
                     <h1 className="pt-6 text-center mb-6">Hi Super Admin</h1>
						</div>
						<ul class="space-y-2">
							<li>
								<a
									href="#"
									class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
								>
									<svg
										aria-hidden="true"
										class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
										<path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
									</svg>
									<span class="ml-3">Overview</span>
								</a>
							</li>
							<li>
								<a
									href="#"
									class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
								>
									<svg
										aria-hidden="true"
										class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
											clip-rule="evenodd"
										></path>
									</svg>
									<span class="flex-1 ml-3 whitespace-nowrap">
										Branch Admin Register
									</span>
								</a>
							</li>
							<li>
								<a
									href="#"
									class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
								>
									<svg
										aria-hidden="true"
										class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M1 1.75A.75.75 0 011.75 1h1.628a1.75 1.75 0 011.734 1.51L5.18 3a65.25 65.25 0 0113.36 1.412.75.75 0 01.58.875 48.645 48.645 0 01-1.618 6.2.75.75 0 01-.712.513H6a2.503 2.503 0 00-2.292 1.5H17.25a.75.75 0 010 1.5H2.76a.75.75 0 01-.748-.807 4.002 4.002 0 012.716-3.486L3.626 2.716a.25.25 0 00-.248-.216H1.75A.75.75 0 011 1.75zM6 17.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
									</svg>
									<span class="flex-1 ml-3 whitespace-nowrap">Transaction</span>
								</a>
							</li>
							<li>
								<a
									href="#"
									class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
								>
									<svg
										aria-hidden="true"
										class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M10.75 10.818v2.614A3.13 3.13 0 0011.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 00-1.138-.432zM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 00-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.202.592.037.051.08.102.128.152z"></path>{" "}
										<path
											clip-rule="evenodd"
											fill-rule="evenodd"
											d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-6a.75.75 0 01.75.75v.316a3.78 3.78 0 011.653.713c.426.33.744.74.925 1.2a.75.75 0 01-1.395.55 1.35 1.35 0 00-.447-.563 2.187 2.187 0 00-.736-.363V9.3c.698.093 1.383.32 1.959.696.787.514 1.29 1.27 1.29 2.13 0 .86-.504 1.616-1.29 2.13-.576.377-1.261.603-1.96.696v.299a.75.75 0 11-1.5 0v-.3c-.697-.092-1.382-.318-1.958-.695-.482-.315-.857-.717-1.078-1.188a.75.75 0 111.359-.636c.08.173.245.376.54.569.313.205.706.353 1.138.432v-2.748a3.782 3.782 0 01-1.653-.713C6.9 9.433 6.5 8.681 6.5 7.875c0-.805.4-1.558 1.097-2.096a3.78 3.78 0 011.653-.713V4.75A.75.75 0 0110 4z"
										></path>
									</svg>
									<span class="flex-1 ml-3 whitespace-nowrap">
										Sales Report
									</span>
								</a>
							</li>

							<li>
								<a
									href="#"
									class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
								>
									<svg
										aria-hidden="true"
										class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											clip-rule="evenodd"
											fill-rule="evenodd"
											d="M4.93 1.31a41.401 41.401 0 0110.14 0C16.194 1.45 17 2.414 17 3.517V18.25a.75.75 0 01-1.075.676l-2.8-1.344-2.8 1.344a.75.75 0 01-.65 0l-2.8-1.344-2.8 1.344A.75.75 0 013 18.25V3.517c0-1.103.806-2.068 1.93-2.207zm8.85 5.97a.75.75 0 00-1.06-1.06l-6.5 6.5a.75.75 0 101.06 1.06l6.5-6.5zM9 8a1 1 0 11-2 0 1 1 0 012 0zm3 5a1 1 0 100-2 1 1 0 000 2z"
										></path>
									</svg>
									<span class="flex-1 ml-3 whitespace-nowrap">
										Discount Management
									</span>
								</a>
							</li>
							<li>
								<a
									href="#"
									class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
								>
									<svg
										aria-hidden="true"
										class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											clip-rule="evenodd"
											fill-rule="evenodd"
											d="M15.988 3.012A2.25 2.25 0 0118 5.25v6.5A2.25 2.25 0 0115.75 14H13.5V7A2.5 2.5 0 0011 4.5H8.128a2.252 2.252 0 011.884-1.488A2.25 2.25 0 0112.25 1h1.5a2.25 2.25 0 012.238 2.012zM11.5 3.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v.25h-3v-.25z"
										></path>{" "}
										<path
											clip-rule="evenodd"
											fill-rule="evenodd"
											d="M2 7a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V7zm2 3.25a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm0 3.5a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z"
										></path>
									</svg>
									<span class="flex-1 ml-3 whitespace-nowrap">
										Stock History
									</span>
								</a>
							</li>
						</ul>
					</div>
				</aside>
			 : 
				<aside
					id="logo-sidebar"
					class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
					aria-label="Sidebar"
				>
					<div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
						<h1 className="mb-6">Hi Super Admin</h1>
						<ul class="space-y-2">
							<li>
								<a
									href="#"
									class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
								>
									<svg
										aria-hidden="true"
										class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
										<path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
									</svg>
									<span class="ml-3">Overview</span>
								</a>
							</li>
							<li>
								<a
									href="#"
									class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
								>
									<svg
										aria-hidden="true"
										class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
											clip-rule="evenodd"
										></path>
									</svg>
									<span class="flex-1 ml-3 whitespace-nowrap">
										Product Management
									</span>
								</a>
							</li>
							<li>
								<a
									href="#"
									class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
								>
									<svg
										aria-hidden="true"
										class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M1 1.75A.75.75 0 011.75 1h1.628a1.75 1.75 0 011.734 1.51L5.18 3a65.25 65.25 0 0113.36 1.412.75.75 0 01.58.875 48.645 48.645 0 01-1.618 6.2.75.75 0 01-.712.513H6a2.503 2.503 0 00-2.292 1.5H17.25a.75.75 0 010 1.5H2.76a.75.75 0 01-.748-.807 4.002 4.002 0 012.716-3.486L3.626 2.716a.25.25 0 00-.248-.216H1.75A.75.75 0 011 1.75zM6 17.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
									</svg>
									<span class="flex-1 ml-3 whitespace-nowrap">Transaction</span>
								</a>
							</li>
							<li>
								<a
									href="#"
									class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
								>
									<svg
										aria-hidden="true"
										class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M10.75 10.818v2.614A3.13 3.13 0 0011.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 00-1.138-.432zM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 00-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.202.592.037.051.08.102.128.152z"></path>{" "}
										<path
											clip-rule="evenodd"
											fill-rule="evenodd"
											d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-6a.75.75 0 01.75.75v.316a3.78 3.78 0 011.653.713c.426.33.744.74.925 1.2a.75.75 0 01-1.395.55 1.35 1.35 0 00-.447-.563 2.187 2.187 0 00-.736-.363V9.3c.698.093 1.383.32 1.959.696.787.514 1.29 1.27 1.29 2.13 0 .86-.504 1.616-1.29 2.13-.576.377-1.261.603-1.96.696v.299a.75.75 0 11-1.5 0v-.3c-.697-.092-1.382-.318-1.958-.695-.482-.315-.857-.717-1.078-1.188a.75.75 0 111.359-.636c.08.173.245.376.54.569.313.205.706.353 1.138.432v-2.748a3.782 3.782 0 01-1.653-.713C6.9 9.433 6.5 8.681 6.5 7.875c0-.805.4-1.558 1.097-2.096a3.78 3.78 0 011.653-.713V4.75A.75.75 0 0110 4z"
										></path>
									</svg>
									<span class="flex-1 ml-3 whitespace-nowrap">
										Sales Report
									</span>
								</a>
							</li>

							<li>
								<a
									href="#"
									class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
								>
									<svg
										aria-hidden="true"
										class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											clip-rule="evenodd"
											fill-rule="evenodd"
											d="M4.93 1.31a41.401 41.401 0 0110.14 0C16.194 1.45 17 2.414 17 3.517V18.25a.75.75 0 01-1.075.676l-2.8-1.344-2.8 1.344a.75.75 0 01-.65 0l-2.8-1.344-2.8 1.344A.75.75 0 013 18.25V3.517c0-1.103.806-2.068 1.93-2.207zm8.85 5.97a.75.75 0 00-1.06-1.06l-6.5 6.5a.75.75 0 101.06 1.06l6.5-6.5zM9 8a1 1 0 11-2 0 1 1 0 012 0zm3 5a1 1 0 100-2 1 1 0 000 2z"
										></path>
									</svg>
									<span class="flex-1 ml-3 whitespace-nowrap">
										Discount Management
									</span>
								</a>
							</li>
							<li>
								<a
									href="#"
									class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
								>
									<svg
										aria-hidden="true"
										class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											clip-rule="evenodd"
											fill-rule="evenodd"
											d="M15.988 3.012A2.25 2.25 0 0118 5.25v6.5A2.25 2.25 0 0115.75 14H13.5V7A2.5 2.5 0 0011 4.5H8.128a2.252 2.252 0 011.884-1.488A2.25 2.25 0 0112.25 1h1.5a2.25 2.25 0 012.238 2.012zM11.5 3.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v.25h-3v-.25z"
										></path>{" "}
										<path
											clip-rule="evenodd"
											fill-rule="evenodd"
											d="M2 7a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V7zm2 3.25a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm0 3.5a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z"
										></path>
									</svg>
									<span class="flex-1 ml-3 whitespace-nowrap">
										Stock History
									</span>
								</a>
							</li>
						</ul>
					</div>
				</aside>
			}

			<div class="p-4 h-screen max-[640px]:mt-20 sm:ml-64">
                <Outlet/>
			</div>
         
    
		</div>
	);
}

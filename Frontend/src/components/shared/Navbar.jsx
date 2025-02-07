// import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
// import { Button } from "@/components/ui/button";
// import {
// 	Popover,
// 	PopoverContent,
// 	PopoverTrigger,
// } from "@radix-ui/react-popover";

import '../../css/LogoName.css'
import logo from '../../assets/photo/logo.png';
import { motion } from "motion/react";
import axios from "axios";
import { Bike,  HardHat,  ListOrdered } from "lucide-react"

 import { useDispatch } from "react-redux";


 import { Link, useNavigate } from "react-router-dom";
// import { User2 } from "lucide-react";
 import { setUser } from "@/store/authSlice";
import { toast } from "react-toastify";

function Navbar() {

	// const {user} = useSelector((store) => store.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	

 	const logoutHandler = async () => {		
		
 		try{			
 			const res = await axios.get('${USER_API_END_POINT}/logout' , {
 				withCredentials : true
 			});
 			if(res.data.success){
 				dispatch(setUser(null));
 				navigate('/login');
 				toast.success(res.data.message);
 			}
 		}catch(error) {
 			console.log("error at navbar logout", error);
 			toast.error(error.message);
 		}
 	}

	

	
    return (
		
		<div className="sticky top-0 z-50 w-full h-16 bg-gradient-to-r from-[#0F0F0F] to-[#0F0F0F] rounded-b-lg border-b-4 border-[#7c5a36] shadow-lg">
		
			<div className='flex items-center justify-between h-16 max-w-screen-xl px-5 mx-auto mb-5'>
{/* //&------------------------------------------------------------------------------------------  */}

				<div className="flex items-center ">
						<div className="flex">
							<Link to="/">
								<img className="w-16 h-16 bg-transparent rounded-md " src={logo} alt="logo" />
							</Link>
						</div>
					<h1 className="mx-5 text-3xl font-bold text-white-800">
						<Link to="/" className="flex items-center gap-1">
							{/* Student <span className="text-red-500">_Hub</span> */}
							 
							<a href="#" className="btn-shine text-red-500">Student_Hub</a>

						</Link>
					</h1>
				</div>

{/* //&------------------------------------------------------------------------------------------  */}

				<div className="flex items-center gap-4 ">

					<motion.ul 
						
						className="flex items-center gap-10 ">
						<motion.li
							whileHover={{ color: "#6674CC" }}
							transition={{ delay: 0.011 }}
							className="cursor-pointer text-white-800 ">
							<Link to="/">
								<div className="flex items-center gap-1">
									<Bike className="w-5 h-5" />
									<span>Home</span>
								</div>
							</Link>
						</motion.li>
						<motion.li
							whileHover={{ color: "#6674CC" }}
							// transition={{ delay: 0.011 }}
							className="cursor-pointer text-white-800 ">

							<Link to="/login">
								<div className="flex items-center gap-1">
									<ListOrdered className="w-5 h-5" />
									<span>OrderList</span>
								</div>
							</Link>

						</motion.li>
						
						<motion.li
							whileHover={{ color: "#6674CC" }}
							transition={{ delay: 0.011 }}
							className="mr-[90px] cursor-pointer text-white-800 md:text-lg">
							<Link to="/login">
								<div className="flex items-center gap-1">
									<HardHat className="w-5 h-5" />
									<span>favorite </span>
								</div>
							</Link>
						</motion.li>

					</motion.ul>

					<div className="flex items-center gap-4">
						<button
							className=" bg-red-500 rounded-md text-white-800 hover:bg-red-600"
							onClick={logoutHandler}
						>
							Logout
						</button>
					</div>
					
					<div className="flex items-center gap-4">
						<button
							className="  bg-[#515DB1] rounded-md text-white-800 hover:bg-[#6674CC]"
							onClick={logoutHandler}
						>
							Login
						</button>
					</div>

				</div>

				{/* //&------------------------------------------------------------------------------------------  */}

				
				
			</div>
		</div>
    )
}
export default Navbar
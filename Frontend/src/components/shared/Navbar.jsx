import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@radix-ui/react-popover";

import { Link } from "react-router-dom";
import { User2 } from "lucide-react";
import Login from "./Login";

function Navbar() {
    return (
		<>
		
			<div className='flex items-center justify-between h-16 px-5 mx-auto max-w-7xl '>
{/* //&------------------------------------------------------------------------------------------  */}

				<div className="flex items-center ">
						<div className="flex ">
							<img className="w-16 h-16 bg-transparent rounded-md" src="https://i.pinimg.com/564x/ee/b8/88/eeb8887be49a50318564804d44e353f8.jpg" alt="asdf" />
						</div>
					<h1 className="text-3xl font-bold text-zinc-800">
						Student <span className="text-red-500">_Hub</span>{" "}
					</h1>
				</div>

{/* //&------------------------------------------------------------------------------------------  */}

				<div className="flex items-center gap-4">
					<ul className="flex items-center space-x-4 font-bold text-zinc-800">
						{
							user && user.role === "hr" ? 
								(
									<>
										<li className="hover:underline "><Link to="/admin/companies">Companies</Link></li>
										<li className="hover:underline "><Link to="/admin/jobs">Job</Link></li>
									</>
								) 
							:
								(
									<>
										<li className="hover:underline "><Link to="/">Home</Link></li>
										<li className="hover:underline "><Link to="/jobs">Job</Link></li>
										<li className="hover:underline "><Link to="/browser">Browser</Link></li>
									</>
								)
						}	
					</ul>
							
							{
								!user ? (
									
									<div className="flex items-center gap-4">
										<Link to="/login"><Button variant="outline" className="">LogIn</Button></Link>
										<Link to="/signup"><Button className="bg-red-500">Signup</Button></Link>
										</div>
										
								) : (
									<Popover >
									<PopoverTrigger asChild > 
										<Avatar className="mx-5 shadow cursor-pointer ">
											<AvatarImage className="w-10 h-10 rounded-full "
												src={user?.profile?.profilephoto}
												alt="User Profile photo"/>
										</Avatar>
									</PopoverTrigger>
			 
									<PopoverContent className="max-w-xs p-4 mt-2 border border-gray-300 rounded shadow shadow-2xl ">
										
										{/* //&------------------------------------------------------------------------------------------  */}

										<div className="flex items-center gap-4 ml-5 space-y-2">
											<Avatar className="cursor-pointer">
												<AvatarImage className="max-w-[55px] max-h-[] rounded-full "
														src={user?.profile?.profilephoto}
														alt="User Profile photo"/>
											</Avatar>
										
										<div>  
											<h4 className="font-medium"> { user?.fullname} </h4>
											<p className="text-sm text-muted-foreground"> {user?.profile?.bio} </p>
										</div>
									</div> 
									
								{/* //&------------------------------------------------------------------------------------------  */}
										
										<div className="flex flex-col mx-5 mt-2 text-gray-700">

											{
												user && user.role === "student" && (
													<>
														<div className="flex items-center gap-2 cursor-pointer w-fit">
															< User2/>
															<Button variant="link"> <Link to="/profile"> View Profile </Link></Button>
														</div>
													</>
												)
											}

											<div className="flex items-center gap-2 cursor-pointer w-fit">
												<Login/>
												<Button onClick={logoutHandler}  variant="link"> Logout </Button> 
											</div>
											
										</div>
										
										{/* //&------------------------------------------------------------------------------------------  */}
									
										
									 </PopoverContent>
								   </Popover>
								)
								
							}
			
				</div>

				{/* //&------------------------------------------------------------------------------------------  */}
				
			</div>
		</>
    )
}
export default Navbar
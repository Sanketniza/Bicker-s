
import { useState, useEffect } from 'react';
import '../../css/LogoName.css'
import logo from '../../assets/photo/logo.png';
import { motion } from "motion/react";
import axios from "axios";
import { Bike,  HardHat,  ListOrdered } from "lucide-react"

 import { useDispatch } from "react-redux";


 import { Link, NavLink, useNavigate } from "react-router-dom";
 import { setUser } from "@/store/authSlice";
import { toast } from "react-toastify";

import { useLocation } from 'wouter';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Moon, Sun, User, LogOut, Package, Settings } from 'lucide-react';

// import { motion } from 'framer-motion';

function Navbar() {

	// const {user} = useSelector((store) => store.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const [, setLocation] = useLocation();
 	const [theme, setTheme] = useState('dark');
  	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

 	//  const [isAuthenticated, setIsAuthenticated] = useState(false);
 	//  const [userData, setUserData] = useState(null);

	  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    orders: [
      { id: 1, bike: 'Kawasaki Ninja', date: '2024-02-10' },
      { id: 2, bike: 'Honda CBR', date: '2024-02-15' }
    ]
  });

  useEffect(() => {
    // Mock authentication check
    localStorage.setItem('user', JSON.stringify(userData));
  }, []);

/*   useEffect(() => {
    // Check authentication status on mount
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    // Replace with your actual auth check
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
      setUserData(JSON.parse(user));
    }
  };
 */


  const user = userData || {
    name: 'Guest',
    email: 'guest@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest',
    orders: []
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogin = () => {
    // Add your login logic here
    setLocation('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUserData(null);
    setLocation('/');
  };

	
  const profile = () => {
	navigate('/profile');
  }

	
    return (
		
		<div className="sticky top-0 z-50 w-full h-16 bg-gradient-to-r from-[#0F0F0F] to-[#0F0F0F] rounded-b-lg border-b-4 border-[#7c5a36] shadow-lg">
		{/* <div className="sticky h-16 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"> */}
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
							 
							<a href="#" className="btn-shine text-red-500">Student Hub</a>

						</Link>
					</h1>
				</div>

{/* //&------------------------------------------------------------------------------------------  */}

				<div className="flex items-center justify-between ">

					<motion.ul 
						
						className="flex items-center gap-10 ">
						<motion.li
							whileHover={{ color: "#6674CC" }}
							transition={{ delay: 0.011 }}
							className="cursor-pointer text-white-800 ">

							<NavLink 
								to="/"
								className={({isActive}) => (isActive ? "text-red-500" : "text-white-800")}
							>
								<div className="flex items-center gap-1">
									<Bike className="w-5 h-5" />
									<span>Home</span>
								</div>

							</NavLink>
						</motion.li>
						
						<motion.li
							whileHover={{ color: "#6674CC" }}
							transition={{ delay: 0.011 }}
							className="cursor-pointer text-white-800 ">

							<NavLink 
								to="/road"
								className={({isActive}) => (isActive ? "text-red-500" : "text-white-800")}
							>
								<div className="flex items-center gap-1">
									<Bike className="w-5 h-5" />
									<span>list</span>
								</div>

							</NavLink>
						</motion.li>

						<motion.li
							whileHover={{ color: "#6674CC" }}
							// transition={{ delay: 0.011 }}
							className="cursor-pointer text-white-800 ">

							<NavLink 
								to="/login"
								className={({isActive}) => (isActive ? "text-red-500" : "text-white-800")}
							>	
								<div className="flex items-center gap-1">
									<ListOrdered className="w-5 h-5" />
									<span>OrderList</span>
								</div>
							</NavLink>

						</motion.li>

						<motion.li
							whileHover={{ color: "#6674CC" }}
							transition={{ delay: 0.011 }}
							className="mr-[90px] cursor-pointer text-white-800 md:text-lg">

							<NavLink 
								to="/WishListPage"
								className={({isActive}) => (isActive ? "text-red-500" : "text-white-800")}
							>	
								<div className="flex items-center gap-1">
									<HardHat className="w-5 h-5" />
									<span>WishList </span>
								</div>
							</NavLink>
							
						</motion.li>
						
					

						

					</motion.ul>

					{/* <div className="flex items-center gap-4">
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
							
						>
							Login
						</button>
					</div> */}

				</div>

				{/* //&------------------------------------------------------------------------------------------  */}
				<div className="flex items-center gap-4 ">

				<Button
					variant="ghost"
					size="icon"
					onClick={toggleTheme}
					className=""
				>
					{
						theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />
					}
				</Button>

				{
					isAuthenticated ? (
						<Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>

						<SheetTrigger asChild>
							<Button variant="ghost" className="relative h-8 w-12 rounded-full">
								<Avatar>
									<AvatarImage src={user.avatar} alt={user.name} />
									<AvatarFallback>{user.name[0]}</AvatarFallback>
								</Avatar>
							</Button>
						</SheetTrigger>
					
					<SheetContent 
						className="w-[500px]"
						style={{
							background: `radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.09), transparent 80%)`
							}}
					>
						<SheetHeader>
							<SheetTitle className="text-2xl font-semibold text-orange-500">Profile</SheetTitle>
						</SheetHeader>
						
						<div className="mt-6 space-y-6">
							<div className="flex items-center gap-4">
								<Avatar className="h-16 w-16  border-2 border-[#10B981] rounded-full">
									<AvatarImage src={user.avatar} alt={user.name} />
									<AvatarFallback>{user.name[0]}</AvatarFallback>
								</Avatar>
								<div>
									<h3 className="font-semibold">{user.name}</h3>
									<p className="text-sm text-muted-foreground">{user.email}</p>
								</div>
							</div>

						<div className="space-y-2">

							<Button 
								variant="ghost" 
								className="w-full justify-start hover:bg-red-100/10" 
								// onClick={() => {
								// 	setLocation('/profile');
								// 	setIsDrawerOpen(false);
								//   }}

								onClick={profile}
							>
							<User className="mr-2 h-4 w-4" />
							View Profile
							</Button>

							<Button 
							variant="ghost" 
							className="w-full justify-start hover:bg-red-100/10"
							onClick={() => setLocation('/orders')}
							>
							<Package className="mr-2 h-4 w-4" />
							Orders History
							</Button>

							<Button 
							variant="ghost" 
							className="w-full justify-start hover:bg-red-100/10"
							onClick={() => setLocation('/settings')}
							>
							<Settings className="mr-2 h-4 w-4" />
							Settings
							</Button>

							<Button 
							variant="ghost" 
							className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100/10"
							onClick={handleLogout}
							>
							<LogOut className="mr-2 h-4 w-4" />
							Logout
							</Button>

						</div>

						{
							user.orders.length > 0 && (
								<div className="border-t pt-4">
									<h4 className="mb-4 text-md font-medium text-orange-800">Recent Orders</h4>
									<div className="space-y-3">
										{
											user.orders.map(order => (

												<motion.div
													key={order.id}
													className="rounded-lg border p-3 border-1 border-[#10B981] "
													whileHover={{ scale: 1.02 }}
												>
													<div className="flex justify-between items-center">
														<p className="font-medium">{order.bike}</p>
														<p className="text-sm text-muted-foreground">{order.date}</p>
													</div>
												</motion.div>
											))
										}
									</div>
								</div>
						)}
						</div>
					</SheetContent>
					</Sheet>
				) : (
					<Button
						variant="default"
						onClick={handleLogin}
						className="flex items-center"
					>
					<User className="h-4 w-4" />
					Login
					</Button>
				)}

			</div>
				
			</div>
		</div>
    )
}
export default Navbar
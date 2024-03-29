import NutrinoLogo from "../assets/nutrino-logo.png"
import {Link, useLocation} from "react-router-dom";
import Button from "../components/Button.jsx";
import store from "../lib/zustand.js";

function NavBar() {
	const {pathname} = useLocation()
	const {user, auth} = store()
	return (
		<div className={"w-screen pr"}>
			<div className={`border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
				<div className={"bg-white flex flex-row justify-center"}>
					<Link to={"/"}>
						<img
							src={NutrinoLogo} alt={"Nutrino Logo"}
							className={"px-4 h-[80px] hidden lg:block"}
						/>
					</Link>
					<nav className={"gap-4 px-8 flex flex-row flex-grow justify-center items-center font-bold"}>
						<div className={"px-4 text-xl font-bold flex flex-grow gap-12 flex-row justify-center"}>
							<Link to={"/"}>Home</Link>
							<Link to={"/recipe"}>Recipes</Link>
							<Link to={"/productscanner"}>Product Scanner</Link>
							<Link to={"/community"}>Community</Link>
						</div>
						<Link
							to={pathname === "/login" ? "/signup" : "/login"}
							className={"text-green-600 block lg:hidden"}
						>
							{pathname === "/login" ? "SIGN UP" : "LOG IN"}
						</Link>
						{auth ?
							<Link to={"/profile"}>
								<Button color={"primary"}>PROFILE</Button>
							</Link>
							:
							<>
								<div className={"flex-row gap-4 hidden lg:flex"}>
									<Link to={"/login"}>
										<Button color={"empty"}>LOG IN</Button>
									</Link>
									<Link to={"/signup"}>
										<Button color={"primary"}>SIGN UP</Button>
									</Link>
								</div>
							</>}
					</nav>
				</div>
			</div>
		</div>
	)
}

export default NavBar
import {useState} from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import {Link, useNavigate} from "react-router-dom";
import store from "../lib/zustand";
import OrangeBG from "../assets/orange_bg.jpeg"


export default function LoginPage() {
	const [email, setemail] = useState("")
	const [password, setpassword] = useState("")
	const {setToast, setMessage, setAuth, setType, backend_url} = store()
	const navigate = useNavigate()
	

	const handleLogin = async (e) => {
		e.preventDefault()
		const url = backend_url
		try {
			const res = await fetch(`${url}/auth/login`, {
				method: "POST",
				body: JSON.stringify({email, password}),
				headers: {
					"Content-Type": "application/json"
				}
			})
			const data = await res.json()
			if (data.error) {
				setMessage(data.error)
				setType("danger")
				setToast(true)
				return
			}
			const token = data.authToken
			localStorage.setItem("auth-token", token)
			setAuth(true)
			setMessage("Login successful")
			setType("success")
			setToast(true)
			navigate("/profile")
		} catch (error) {
			setMessage("Something went wrong")
			setType("danger")
			setToast(true)
		}
	}
	return (
		<div
			style={{backgroundImage: `url(${OrangeBG})`}}
			className={"w-screen min-h-screen flex-grow flex justify-center items-center"}
		>
			<Card heading={"LOGIN"} headingColor={"bg-dgreen"}>
				<form onSubmit={(e) => handleLogin(e)}>
					<div className={"flex flex-col gap-2"}>
						<p className="font-bold mt-2">Email :</p>
						<Input required value={email} setValue={setemail} placeholder={"Enter Email : "}
							   type={"email"}/>
						<p className="font-bold mt-2">Password :</p>
						<Input required
							   value={password}
							   setValue={setpassword}
							   placeholder={"Enter Password : "}
							   type={"password"}
						/>
						<div className="mt-4 justify-center flex">
							<Button type={"submit"} color={"primary"}>
								Login
							</Button>
						</div>
						<p className="font-bold mt-2">Don&apos;t have an account?
							<Link to={"/signup"} className="pl-2 font-extrabold text-green-800 underline">Sign Up
								Here</Link></p>
					</div>
				</form>
			</Card>
		</div>
	)
}
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import VerifyOtp from "./pages/verify-otp/VerifyOtp";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import ResetPassword from "./pages/reset-password/ResetPassword";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
	const { authUser } = useAuthContext();
	return (
		<div className='p-4 h-screen flex items-center justify-center'>
			<Routes>
				<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
				<Route path='/verify-otp' element={authUser ? <Navigate to='/' /> : <VerifyOtp />} />
				<Route path='/forgot-password' element={authUser ? <Navigate to='/' /> : <ForgotPassword />} />
				<Route path='/resetPassword/:token' element={authUser ? <Navigate to='/' /> : <ResetPassword />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;

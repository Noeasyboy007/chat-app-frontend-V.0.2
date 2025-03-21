import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const logout = async () => {
		setLoading(true);
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"
			const res = await fetch(`${backendUrl}/api/auth/logout`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			if (res.ok) {
				toast.success('Logout successful');
			}

			localStorage.removeItem("chat-user");
			setAuthUser(null);
		} 
		catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
};
export default useLogout;

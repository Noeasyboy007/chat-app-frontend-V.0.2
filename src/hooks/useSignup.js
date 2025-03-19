import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const signup = async ({ first_name, last_name, email, username, password, confirmPassword, gender }) => {
		const success = handleInputErrors({ first_name, last_name, email, username, password, confirmPassword, gender });
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ first_name, last_name, email, username, password, confirmPassword, gender }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			// Don't store user in localStorage or set authUser yet
			// Wait until email verification is complete
			
			if (res.ok) {
				toast.success('Signup successful! Please check your email for verification code.');
				// Store email in sessionStorage for verification page
				sessionStorage.setItem("pendingVerificationEmail", email);
				navigate("/verify-otp");
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	
	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ first_name, last_name, email, username, password, confirmPassword, gender }) {
	if (!first_name || !last_name || !email || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}

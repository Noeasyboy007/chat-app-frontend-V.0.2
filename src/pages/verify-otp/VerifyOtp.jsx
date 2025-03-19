import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useVerifyOtp from "../../hooks/useVerifyOtp";
import useResendOtp from "../../hooks/useResendOtp";
import toast from "react-hot-toast";

const VerifyOtp = () => {
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const [email, setEmail] = useState("");
	const [resendDisabled, setResendDisabled] = useState(false);
	const [countdown, setCountdown] = useState(0);
	const { loading, verifyOtp } = useVerifyOtp();
	const { loading: resendLoading, resendOtp } = useResendOtp();
	const navigate = useNavigate();
	const inputRefs = useRef([]);
	const timerRef = useRef(null);

	useEffect(() => {
		// Initialize refs array
		inputRefs.current = inputRefs.current.slice(0, 6);
		
		const pendingEmail = sessionStorage.getItem("pendingVerificationEmail");
		if (!pendingEmail) {
			toast.error("No email pending verification");
			navigate("/signup");
			return;
		}
		setEmail(pendingEmail);
		
		// Focus the first input on component mount
		if (inputRefs.current[0]) {
			inputRefs.current[0].focus();
		}

		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [navigate]);

	const handleChange = (index, value) => {
		// Only allow numbers
		if (!/^\d*$/.test(value)) return;
		
		// Update the OTP array
		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);
		
		// Auto-focus next input if current input is filled
		if (value && index < 5) {
			inputRefs.current[index + 1].focus();
		}
	};

	const handleKeyDown = (index, e) => {
		// Move to previous input on backspace if current input is empty
		if (e.key === "Backspace" && !otp[index] && index > 0) {
			inputRefs.current[index - 1].focus();
		}
	};

	const handlePaste = (e) => {
		e.preventDefault();
		const pastedData = e.clipboardData.getData("text");
		
		// Check if pasted content is a 6-digit number
		if (/^\d{6}$/.test(pastedData)) {
			const digits = pastedData.split("");
			setOtp(digits);
			
			// Focus the last input after paste
			inputRefs.current[5].focus();
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const otpString = otp.join("");
		if (otpString.length !== 6) {
			toast.error("Please enter all 6 digits");
			return;
		}
		await verifyOtp(otpString);
	};

	const handleResendOtp = async () => {
		if (resendDisabled) return;
		
		await resendOtp(email);
		
		// Disable resend button for 60 seconds
		setResendDisabled(true);
		setCountdown(60);
		
		timerRef.current = setInterval(() => {
			setCountdown(prev => {
				if (prev <= 1) {
					clearInterval(timerRef.current);
					setResendDisabled(false);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
	};

	return (
		<div className="flex flex-col items-center justify-center min-w-96 mx-auto">
			<div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
				<h1 className="text-3xl font-semibold text-center text-gray-300">
					Verify <span className="text-purple-500">Email</span>
				</h1>

				{email && (
					<p className="text-center text-gray-300 mt-2 mb-4">
						We've sent a verification code to <span className="font-medium">{email}</span>
					</p>
				)}

				<form onSubmit={handleSubmit}>
					<div>
						<label className="label p-2">
							<span className="text-base label-text">Verification Code</span>
						</label>
						<div className="flex justify-between gap-2 mb-4">
							{otp.map((digit, index) => (
								<input
									key={index}
									type="text"
									maxLength="1"
									className="w-12 h-12 text-center text-xl font-bold input input-bordered"
									value={digit}
									onChange={(e) => handleChange(index, e.target.value)}
									onKeyDown={(e) => handleKeyDown(index, e)}
									onPaste={index === 0 ? handlePaste : null}
									ref={(el) => (inputRefs.current[index] = el)}
								/>
							))}
						</div>
					</div>

					<div className="mt-6">
						<button
							className="btn btn-block btn-sm border border-slate-700 bg-purple-700 hover:bg-purple-800"
							disabled={loading}
						>
							{loading ? (
								<span className="loading loading-spinner"></span>
							) : (
								"Verify Email"
							)}
						</button>
					</div>
				</form>

				<div className="mt-4 text-center">
					<p>
						Didn't receive a code?{" "}
						<button
							onClick={handleResendOtp}
							disabled={resendDisabled || resendLoading}
							className={`text-purple-500 hover:underline ${resendDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
						>
							{resendLoading ? (
								<span className="loading loading-spinner loading-xs"></span>
							) : resendDisabled ? (
								`Resend in ${countdown}s`
							) : (
								"Resend Code"
							)}
						</button>
					</p>
					<p className="mt-2">
						<Link to="/login" className="text-purple-500 hover:underline">
							Back to Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default VerifyOtp;

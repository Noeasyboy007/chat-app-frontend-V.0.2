import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useVerifyOtp = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const verifyOtp = async (code) => {
        if (!code || code.length !== 6) {
            toast.error("Please enter a valid 6-digit verification code");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/verify-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code }),
            });

            const data = await res.json();
            
            if (!data.success) {
                throw new Error(data.message || "Verification failed");
            }

            // Clear the pending verification email from session storage
            sessionStorage.removeItem("pendingVerificationEmail");
            
            toast.success("Email verified successfully!");
            navigate("/login");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, verifyOtp };
};

export default useVerifyOtp;    
import { useState } from "react";
import toast from "react-hot-toast";

const useResendOtp = () => {
  const [loading, setLoading] = useState(false);

  const resendOtp = async (email) => {
    if (!email) {
      toast.error("Email is required");
      return;
    }

    setLoading(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
      const res = await fetch(`${backendUrl}/api/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.message || "Failed to resend verification code");
      }

      toast.success("Verification code has been resent to your email");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, resendOtp };
};

export default useResendOtp; 
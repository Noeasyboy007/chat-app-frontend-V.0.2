import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import useResetPassword from "../../hooks/useResetPassword";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  const { loading, resetPassword } = useResetPassword();

  useEffect(() => {
    if (!token) {
      toast.error("Invalid reset link");
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword(token, password, confirmPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Reset <span className="text-purple-500">Password</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">New Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full input input-bordered h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full input input-bordered h-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="mt-6">
            <button
              className="btn btn-block btn-sm border border-slate-700 bg-purple-700 hover:bg-purple-800"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p>
            Remember your password?{" "}
            <Link to="/login" className="text-purple-500 hover:underline">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword; 
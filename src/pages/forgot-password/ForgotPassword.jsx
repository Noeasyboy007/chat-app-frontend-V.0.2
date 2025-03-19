import { useState } from "react";
import { Link } from "react-router-dom";
import useForgotPassword from "../../hooks/useForgotPassword";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { loading, emailSent, forgotPassword } = useForgotPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Forgot <span className="text-purple-500">Password</span>
        </h1>

        {!emailSent ? (
          <form onSubmit={handleSubmit}>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full input input-bordered h-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  "Send Reset Link"
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-4 text-center">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
              <p>
                Password reset link has been sent to your email. Please check your inbox.
              </p>
            </div>
            <p>
              Didn't receive the email? Check your spam folder or{" "}
              <button 
                className="text-purple-500 hover:underline"
                onClick={() => window.location.reload()}
              >
                try again
              </button>
            </p>
          </div>
        )}

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

export default ForgotPassword; 
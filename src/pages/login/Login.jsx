import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});

	const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(inputs.email, inputs.password);
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Login <span className='text-purple-500'>ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Email</span>
						</label>
						<input
							type='email'
							placeholder='Enter your email'
							className='w-full input input-bordered h-10'
							value={inputs.email}
							onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter your password'
							className='w-full input input-bordered h-10'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>

					<Link to='/forgot-password' className='text-sm hover:underline hover:text-purple-500 mt-2 inline-block'>
						Forgot Password?
					</Link>

					<div>
						<button
							className='btn btn-block btn-sm mt-2 border border-slate-700 bg-purple-700 hover:bg-purple-800'
							disabled={loading}
						>
							{loading ? <span className='loading loading-spinner'></span> : 'Login'}
						</button>
					</div>
				</form>

				<p className='text-center mt-4'>
					Don't have an account?{' '}
					<Link to='/signup' className='text-purple-500 hover:underline'>
						Register
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;

// STARTER CODE FOR THIS FILE
// const Login = () => {
// 	return (
// 		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
// 			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
// 				<h1 className='text-3xl font-semibold text-center text-gray-300'>
// 					Login
// 					<span className='text-blue-500'> ChatApp</span>
// 				</h1>

// 				<form>
// 					<div>
// 						<label className='label p-2'>
// 							<span className='text-base label-text'>email</span>
// 						</label>
// 						<input type='text' placeholder='Enter email' className='w-full input input-bordered h-10' />
// 					</div>

// 					<div>
// 						<label className='label'>
// 							<span className='text-base label-text'>Password</span>
// 						</label>
// 						<input
// 							type='password'
// 							placeholder='Enter Password'
// 							className='w-full input input-bordered h-10'
// 						/>
// 					</div>
// 					<a href='#' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
// 						{"Don't"} have an account?
// 					</a>

// 					<div>
// 						<button className='btn btn-block btn-sm mt-2'>Login</button>
// 					</div>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };
// export default Login;

import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-full flex-col font-pop">
      <div className="form bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-2">
          Login
        </h2>
        <div className="border h-[2px] bg-gray-200 mb-6"></div>
        <form className="flex flex-col">
          <div className="email flex flex-col mb-4">
            <label htmlFor="email" className="text-gray-600 mb-1 ml-2 text-sm">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter you email"
              className="p-2 focus:outline-none border-2 border-blue-100 rounded-md"
            />
          </div>
          <div className="password flex flex-col mb-8">
            <label
              htmlFor="password"
              className="text-gray-600 mb-1 ml-2 text-sm"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder=" Enter your password"
              className="p-2 focus:outline-none border-2 border-blue-100 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="p-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all"
          >
            Login
          </button>

          <div className="OR my-2 text-gray-600 mx-auto">OR</div>
          <button
            type="submit"
            className="p-4 bg-blue-600 text-white font-medium rounded-lg mb-6 hover:bg-blue-700 transition-all"
          >
            Browse as Guest
          </button>
          <div className="alreadyAcc text-sm">
            <span className="text-gray-600 font-thin">
              Do not have an account?{" "}
              <span className="text-blue-400">
                <Link to="/register">Register</Link>
              </span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

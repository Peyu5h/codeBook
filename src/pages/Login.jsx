import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const notify = (message, type) => {
    toast(message, {
      type: type,
      position: "top-center",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch("http://localhost:3001/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values), // Use values directly from the callback parameter
        });

        const data = await response.json();

        const { message, ...rest } = data;

        if (data.message === "Login Successful") {
          notify(data.message, "success");
          Cookies.set("user", JSON.stringify(rest));

          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          notify(data.message, "error");
        }
      } catch (error) {
        console.log(error);
      }

      resetForm(); // Move resetForm inside the try block to ensure it's called after the fetch
    },
  });

  return (
    <div className="flex items-center text-gray-800 justify-center h-full flex-col font-pop">
      <div className="form bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-2">
          Login
        </h2>
        <div className="border h-[2px] bg-gray-200 mb-6"></div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col">
          <div className="email flex flex-col mb-4">
            <label htmlFor="email" className="text-gray-600 mb-1 ml-2 text-sm">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Enter you email"
              className="p-2 focus:outline-none border-2 border-blue-100 rounded-md"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-xs ml-1">
                {formik.errors.email}
              </div>
            ) : null}
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder=" Enter your password"
              className="p-2 focus:outline-none border-2 border-blue-100 rounded-md"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-xs ml-1">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div onClick={formik.handleSubmit}>
            <button
              type="submit"
              className="p-4 w-full bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all"
            >
              Login
            </button>
          </div>
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
      <ToastContainer />
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "./Footer";
const Register = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  let name, value;
  const HandleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setRegister({ ...register, [name]: value });
  };
  const PostData = async (e) => {
    const { name, email, password, confirmpassword } = register;
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
        password,
        confirmpassword,
      }),
    });

    if (res.status === 201) {
      window.alert("User Registered Successfully");
      navigate("/login");
    } else if (res.status === 422) {
      window.alert("User Already Exist");
      navigate("/register");
    } else if (res.status === 423) {
      window.alert("Password did not match");
      navigate("/register");
    } else if (res.status === 500) {
      window.alert("User failed to register");
      navigate("/register");
    }
  };
  return (
    <>
      <div className="flex flex-col items-center creds">
        <p className="lg:text-3xl text-xl mt-16 napn text-white">
          Register for buying the best products
        </p>

        <div className="w-full max-w-screen-md mt-10">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

            <div className="mb-5">
              <label for="fname" className="block mb-2 text-sm font-medium text-gray-900">Enter full name</label>
              <input type="fname" id="fname" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John Doe" name="name" value={register.name} onChange={HandleInputs} required />
            </div>

            <div className="mb-5">
              <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
              <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@flowbite.com" name="email" value={register.email} onChange={HandleInputs} required />
            </div>
            <div className="mb-5">
              <label for="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
              <input type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="password" placeholder="******************" value={register.password} onChange={HandleInputs} required />
            </div>
            <div className="mb-5">
              <label for="repeat-password" className="block mb-2 text-sm font-medium text-gray-900">Repeat password</label>
              <input type="password" id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="confirmpassword" placeholder="******************" value={register.confirmpassword} onChange={HandleInputs} required />
            </div>
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
              </div>
              <label for="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
            </div>
            <div className="lg:flex items-center justify-between">
              <button type="submit" className="w-full lg:w-fit text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow -300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={PostData}>Register new account</button>
              <Link
                className="napn lg:inline-block block mt-5 lg:mt-0 lg:align-baseline font-semibold text-sm text-yellow-500 hover:text-yellow-600"
                to={"/login"}
              >
                Already Registered? Login
              </Link>
            </div>
          </form>

          <p className="text-center text-white text-xs napn">
            &copy;2023 Sujal. All rights reserved.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;

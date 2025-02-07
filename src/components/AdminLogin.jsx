import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import transition from "./transition";
function AdminLogin() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          navigate("/admin");
        })
        .catch((error) => {
          alert("Invalid Credentials!")
        });
  };

  return (
    <section className="h-screen w-full grid place-items-center">
      <div className="flex flex-col items-center justify-center pt-5 lg:pt-0 px-2 md:px-0 lg:pr-6">
        <div className="w-full max-w-lg rounded-lg shadow-lg p-4 md:p-6 bg-background">
          <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-4 font-sora">
            Admin Login
          </h2>
          <form className="flex flex-col w-full" onSubmit={handleSubmit}>
            <label
              htmlFor="email"
              className="text-sm md:text-lg text-text-light font-poppins mb-2"
            >
              Email
            </label>
            <input
              ref={emailRef}
              placeholder="Email"
              name="email"
              id="email"
              className="font-poppins bg-gray-100 text-text-light border border-text/20 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-primary transition ease-in-out duration-150"
              type="email"
              required
            />
            <label
              htmlFor="password"
              className="text-sm md:text-lg text-text-light font-poppins mb-2"
            >
              Password
            </label>
            <input
              ref={passwordRef}
              placeholder="Password"
              name="password"
              id="password"
              className="font-poppins bg-gray-100 text-text-light border border-text/20 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-primary transition ease-in-out duration-150"
              type="password"
              required
            />
            <button
              className="bg-gradient-to-r font-sora from-primary to-blue-500 text-white font-medium py-2 px-4 rounded-md mt-4  transition-all ease-in-out duration-300 shadow-lg shadow-primary/50 hover:scale-105 hover:from-primary/90 hover:to-blue-500"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
export default transition(AdminLogin);

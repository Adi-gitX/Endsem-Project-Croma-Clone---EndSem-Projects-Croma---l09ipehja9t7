import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Signin = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("projectID", "d4o4jfu5nlac");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email,
      password,
      appType: "ecommerce",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/user/login",
        requestOptions
      );
      const data = await response.json();
      if (data.status === "success") {
        const authToken = data.authToken;
        login(authToken);
        navigate("/");
      } else {
        setErrorMessage(data.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
    } catch (error) {
      console.error(error);
    }
  };

return (
    <div className="flex items-center justify-center min-h-screen grey">
        <div className="w-full max-w-md p-8 space-y-6 bg-stone-900 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-white">Sign In</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                    <div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-700 bg-stone-800 text-white rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                        />
                    </div>
                </div>
                <div>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="w-full px-3 py-2 mt-1 border border-gray-700 bg-stone-800 text-white rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    />
                </div>
                <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-teal-500 border border-red-500 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              PROCEED
            </button>
            {errorMessage && (
              <div className="text-red-600 text-center mt-2">
                {errorMessage}
              </div>
            )}
          </div>
            </form>
            <p className="text-sm text-center text-gray-400">
                Don't have an account?{" "}
                <Link to="/signup" className="text-teal-500 hover:underline">
                    Register
                </Link>
            </p>
        </div>
    </div>
);
};

export default Signin;

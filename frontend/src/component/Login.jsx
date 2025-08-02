import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  
  const { googleLogin } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl  shadow-2xl p-8 max-w-md w-full border border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to continue to your account</p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-center">
            <button
              onClick={googleLogin}
              className="flex items-center cursor-pointer justify-center w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 border border-gray-600 "
            >
              <svg
                className="w-6 h-6 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <span className="h-px bg-gray-600 w-16"></span>
            <span className="text-gray-400 text-sm">OR</span>
            <span className="h-px bg-gray-600 w-16"></span>
          </div>

          <div className="text-center text-sm text-gray-400">
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-400 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-400 hover:underline">
              Privacy Policy
            </a>
            .
          </div>
        </div>

        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>
            Don't have an account?{" "}
            <Link  to={"/signup"}
              className="text-blue-400 hover:underline focus:outline-none"
            >
              Sign up with Google
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
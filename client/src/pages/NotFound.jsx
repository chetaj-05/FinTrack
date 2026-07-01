import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-8xl font-bold text-indigo-600">404</h1>

      <h2 className="text-3xl font-semibold mt-4">Oops! Page Not Found 😕</h2>

      <p className="text-gray-500 mt-3">
        The page you're looking for doesn't exist.
      </p>

      <Link
        to="/dashboard"
        className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;

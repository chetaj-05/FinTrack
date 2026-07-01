import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">My Profile</h1>

      <p className="text-gray-500 mb-8">Manage your account information.</p>
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-5xl text-white font-bold shadow-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-3xl font-bold mt-4">{user.name}</h1>

          <p className="text-gray-500">{user.email}</p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex justify-between border-b pb-3">
            <span className="font-semibold">Name</span>

            <span>{user.name}</span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="font-semibold">Email</span>

            <span>{user.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Member Since</span>

            <span>{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between border-t pt-3">
            <span className="font-semibold">Status</span>

            <span className="text-green-600 font-semibold">● Active</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-8">
        <div className="bg-white shadow rounded-xl p-5 text-center">
          <h2 className="text-3xl font-bold text-indigo-600">✓</h2>
          <p className="text-gray-500 mt-2">Verified Account</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5 text-center">
          <h2 className="text-3xl font-bold text-green-600">🔒</h2>
          <p className="text-gray-500 mt-2">JWT Protected</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5 text-center">
          <h2 className="text-3xl font-bold text-orange-500">📊</h2>
          <p className="text-gray-500 mt-2">Expense Manager</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;

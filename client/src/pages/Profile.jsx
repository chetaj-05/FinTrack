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
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-4xl text-white font-bold">
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
        </div>
      </div>
    </div>
  );
}

export default Profile;

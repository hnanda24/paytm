import React, { useState, useEffect } from "react";
import TransferMoney from "./TransferMoney";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:3000/api/v1/user/displayUser", {
        method: "GET",
        headers: { token },
      });

      const data = await response.json();
      response.ok ? setUser(data) : setMessage(data.msg);
    } catch {
      setMessage("Error fetching user data.");
    }
  };

  const fetchBalance = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:3000/api/v1/account/balance", {
        method: "GET",
        headers: { token },
      });

      const data = await response.json();
      response.ok ? setBalance(data.balance) : setMessage(data.msg);
    } catch {
      setMessage("Error fetching balance.");
    }
  };

  const handleAddBalance = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:3000/api/v1/account/addBalance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ accountId: user?._id, balance: Number(amount) }),
      });

      const data = await response.json();
      response.ok ? setMessage("Balance added successfully!") && fetchBalance() : setMessage(data.msg);
    } catch {
      setMessage("Error adding balance.");
    }
  };

  return (
    <div>
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-center text-indigo-700">User Dashboard</h2>
        {message && <p className="text-center text-red-500">{message}</p>}

        {user ? (
          <div className="bg-gray-100 p-3 rounded-md shadow-sm text-center">
            <p className="text-lg font-semibold">{user.firstName} {user.lastName}</p>
            <p className="text-sm text-gray-600">@{user.username}</p>
          </div>
        ) : (
          <p className="text-center">Loading user data...</p>
        )}

        <button
          onClick={fetchBalance}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 mt-4"
        >
          Show My Balance
        </button>

        {balance !== null && (
          <p className="text-center text-lg font-bold text-green-600 mt-2">₹{balance}</p>
        )}

        <div className="flex gap-2 mt-4">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-300"
          />
          <button
            onClick={handleAddBalance}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

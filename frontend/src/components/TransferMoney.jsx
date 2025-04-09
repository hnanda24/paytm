import React, { useState } from "react";

const TransferMoney = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/user/search?filter=${searchTerm}`);
      const data = await response.json();
      response.ok ? setUsers(data.user) : setMessage("User search failed.");
    } catch {
      setMessage("An error occurred while searching users.");
    }
  };

  const handleTransfer = async () => {
    if (!selectedUser || !amount) {
      setMessage("Please select a user and enter an amount.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/v1/account/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          to: selectedUser._id,
          amount: parseFloat(amount),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Transfer Successful!");
        setAmount("");
        setSelectedUser(null);
        setSearchTerm("");
        setUsers([]);
      } else {
        setMessage(data.msg || "Transfer failed.");
      }
    } catch {
      setMessage("An error occurred while transferring money.");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
      <h2 className="text-xl font-bold text-center text-indigo-700 mb-4">Send Money</h2>

      {message && <p className="text-center text-red-500 mb-4">{message}</p>}

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search user by name"
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </div>

      {users.length > 0 && (
        <div className="mt-4">
          <h3 className="text-md font-semibold text-indigo-600 mb-2">Select User:</h3>
          <ul className="bg-gray-100 p-2 rounded-md">
            {users.map((user) => (
              <li
                key={user._id}
                className={`p-2 rounded-md cursor-pointer ${
                  selectedUser?._id === user._id
                    ? "bg-indigo-300"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => setSelectedUser(user)}
              >
                {user.firstName} {user.lastName} (@{user.username})
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedUser && (
        <div className="mt-4">
          <h3 className="text-md font-semibold text-indigo-600">Transfer to:</h3>
          <p className="text-gray-800">{selectedUser.firstName} {selectedUser.lastName}</p>
          <input
            type="number"
            placeholder="Enter amount"
            className="w-full px-3 py-2 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            onClick={handleTransfer}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md mt-4"
          >
            Send Money
          </button>
        </div>
      )}
    </div>
  );
};

export default TransferMoney;

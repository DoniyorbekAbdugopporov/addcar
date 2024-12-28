import React, { useState } from "react";
import { useUserStore } from "@/store/userStore";

const UserManager = () => {
  const { users, addUser, updateUser, deleteUser } = useUserStore();

  const [form, setForm] = useState({
    id: null,
    image: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstname, lastname, email, password, confirmPassword } = form;

    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      alert("Please fill out all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (isEditing) {
      updateUser(form);
      setIsEditing(false);
    } else {
      addUser(form);
    }

    setForm({
      id: null,
      image: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      address: "",
    });
  };

  const handleEdit = (user) => {
    setForm(user);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    deleteUser(id);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4 mb-6 max-w-2xl mx-auto"
      >
        <div className="flex space-x-4">
          <input
            type="text"
            name="firstname"
            value={form.firstname}
            onChange={handleInputChange}
            placeholder="First Name"
            className="flex-1 p-2 border rounded-lg"
          />
          <input
            type="text"
            name="lastname"
            value={form.lastname}
            onChange={handleInputChange}
            placeholder="Last Name"
            className="flex-1 p-2 border rounded-lg"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="flex space-x-4">
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="flex-1 p-2 border rounded-lg"
          />
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            className="flex-1 p-2 border rounded-lg"
          />
        </div>
        <div>
          <input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <textarea
            name="address"
            value={form.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleInputChange}
            placeholder="Image URL"
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {isEditing ? "Update User" : "Add User"}
        </button>
      </form>

      {/* User List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 bg-white shadow-md rounded-lg flex flex-col justify-between"
          >
            <div>
              {user.image && (
                <img
                  src={user.image}
                  alt="User"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
              )}
              <h3 className="text-lg font-bold text-center">
                {user.firstname} {user.lastname}
              </h3>
              <p className="text-gray-600 text-center">{user.email}</p>
              <p className="text-gray-600 text-center">{user.phoneNumber}</p>
              <p className="text-gray-600 text-center">{user.address}</p>
            </div>
            <div className="flex justify-around mt-4">
              <button
                onClick={() => handleEdit(user)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManager;

import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  users: JSON.parse(localStorage.getItem("users")) || [],

  addUser: (user) => {
    const users = [...get().users, { ...user, id: Date.now() }];
    set({ users });
    localStorage.setItem("users", JSON.stringify(users));
  },

  updateUser: (updatedUser) => {
    const users = get().users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    set({ users });
    localStorage.setItem("users", JSON.stringify(users));
  },

  deleteUser: (id) => {
    const users = get().users.filter((user) => user.id !== id);
    set({ users });
    localStorage.setItem("users", JSON.stringify(users));
  },
}));

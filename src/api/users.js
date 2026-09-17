import client from "./client";

export const getUsers = ({ username, name, phoneNumber, accountType } = {}) =>
  client.get("User", {
    params: {
      username: username || undefined,
      name: name || undefined,
      phoneNumber: phoneNumber || undefined,
      accountType,
    },
  });

export const getUser = (id) => client.get(`User/${id}`);
export const createUser = (user) => client.post("User", user);
export const login = (username, password) => client.post("User/login", { username, password });
export const updateUser = (user) => client.put("User", user);
export const deleteUser = (id) => client.delete(`User/${id}`);

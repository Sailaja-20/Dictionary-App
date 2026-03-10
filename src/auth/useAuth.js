import { useState } from "react";

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem("users") || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("currentUser") || "null");
  } catch {
    return null;
  }
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState(getCurrentUser);

  function signup({ name, email, password }) {
    if (!name?.trim())            return { success: false, error: "Name is required" };
    if (!email?.trim())           return { success: false, error: "Email is required" };
    if (!password?.trim())        return { success: false, error: "Password is required" };
    if (password.length < 6)      return { success: false, error: "Password must be 6+ characters" };

    const users = getUsers();
    const emailLower = email.trim().toLowerCase();

    if (users.some(u => u.email === emailLower)) {
      return { success: false, error: "Account already exists with this email" };
    }

    const newUser = {
      name: name.trim(),
      email: emailLower,
      password: password.trim(),
    };

    users.push(newUser);
    saveUsers(users);

    return { success: true };
  }

  function login({ email, password }) {
    if (!email?.trim())    return { success: false, error: "Email is required" };
    if (!password?.trim()) return { success: false, error: "Password is required" };

    const users = getUsers();
    const emailLower = email.trim().toLowerCase();
    const passwordTrimmed = password.trim();

    const validUser = users.find(
      u => u.email === emailLower && u.password === passwordTrimmed
    );

    if (!validUser) {
      return { success: false, error: "Invalid email or password" };
    }

    localStorage.setItem("currentUser", JSON.stringify(validUser));
    setCurrentUser(validUser);

    return { success: true };
  }

  function logout() {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  }


  function resetPassword({ email, newPassword }) {
    if (!email?.trim())          return { success: false, error: "Email is required" };
    if (!newPassword?.trim())    return { success: false, error: "Password is required" };
    if (newPassword.length < 6)  return { success: false, error: "Password must be 6+ characters" };

    const users = getUsers();
    const emailLower = email.trim().toLowerCase();
    const userIndex = users.findIndex(u => u.email === emailLower);

    if (userIndex === -1) {
      return { success: false, error: "No account found with this email" };
    }

    users[userIndex].password = newPassword.trim();
    saveUsers(users);

    return { success: true };
  }

  return { currentUser, signup, login, logout, resetPassword };
}

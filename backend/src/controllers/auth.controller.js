// src/controllers/auth.controller.js

export const register = (req, res) => {
  res.send("Register route");
};

export const login = (req, res) => {
  res.send("Login route");
};

// If you want to use addToHistory, define it:
export const addToHistory = (req, res) => {
  res.send("Add to history route");
};

export const getUserHistory = (req, res) => {
  res.send("get the User History");
};

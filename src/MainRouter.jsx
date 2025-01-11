import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login.jsx";
import App from "./App.jsx";
import PrivateRoute from "./auth/PrivateRoute.jsx";
import Header from "./Header";
import "./Router.css";
import Room from "./Room.jsx";
import Profile from "./Profile.jsx"

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">{children}</main>
    </div>
  );
};

const MainRouter = () => {
  return (
    <Layout>
      <Routes>
        {/* Public Route for Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Private Route for App */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        />
        
        {/* Private Route for Room */}
        <Route
          path="/room"
          element={
            <PrivateRoute>
              <Room />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </Layout>
  );
};

export default MainRouter;

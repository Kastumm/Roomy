import React from "react";
import { NavLink } from "react-router-dom";
import { LOGIN_URL } from "../../constants/constants";
import SignupForm from "./components/SignupForm";

const Signup: React.FC = (): JSX.Element => {
  return (
    <div className="auth d-flex justify-between align-center">
      <div className="content-left align-center">
        <div className="choose-action d-flex align-center clear">
          <NavLink
            to={LOGIN_URL}
            style={({ isActive }) => ({
              fontWeight: isActive ? "700" : "500",
              color: isActive
                ? "var(--login-action-color)"
                : "var(--login-action-color-2)",
            })}
          >
            LOGIN
          </NavLink>
          <NavLink to="">SIGNUP</NavLink>
        </div>
        <div className="pointer pointer-move"></div>
        <div className="form-box">
          <SignupForm />
        </div>
      </div>
      <div className="content-right d-flex">
        <p>Welcome! Let’s sign in to your account.</p>
      </div>
    </div>
  );
};

export default Signup;
import { NavLink } from "react-router-dom";
import { SIGNUP_URL } from "../../constants/constants";
import LoginForm from "./components/LoginForm";
import "./Auth.scss";

const Login: React.FC = (): JSX.Element => {
  return (
    <div className="auth d-flex justify-between align-center">
      <div className="content-left align-center">
        <div className="choose-action d-flex align-center clear">
          <NavLink to="">LOGIN</NavLink>
          <NavLink
            to={SIGNUP_URL}
            style={({ isActive }) => ({
              fontWeight: isActive ? "700" : "500",
              color: isActive
                ? "var(--login-action-color)"
                : "var(--login-action-color-2)",
            })}
          >
            SIGNUP
          </NavLink>
        </div>
        <div className="pointer"></div>
        <div className="form-box">
          <LoginForm />
        </div>
      </div>
      <div className="content-right d-flex">
        <p>Welcome! Let’s sign in to your account.</p>
      </div>
    </div>
  );
};

export default Login;
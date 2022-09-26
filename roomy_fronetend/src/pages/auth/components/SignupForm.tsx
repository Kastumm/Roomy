import { useState, useContext, SyntheticEvent, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LOGIN_URL, SIGNUP_API_URL } from "../../../constants/constants";
import AuthContext from "../../../context/AuthProvider";
import Button from "../../../components/button/Button";
import Icon from "../../../components/icon/Icon";
import axios from "../../../api/axios";
import jwtDecode from "jwt-decode";

const SignupForm: React.FC = (): JSX.Element => {
  const { setAuth }: any = useContext(AuthContext);
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const nameRef: any = useRef();
  const passwordErrorRef: any = useRef();
  const emailErrorRef: any = useRef();

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    setPasswordErrorMessage("");
    setEmailErrorMessage("");
  }, [username, email, password, checkPassword]);

  const handleSignup = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      if (password != checkPassword) {
        setPasswordErrorMessage("*Passwords don't match");
        throw new Error("*Passwords don't match");
      }

      const response = await axios.post(SIGNUP_API_URL, {
        username,
        email,
        password,
        isAdmin,
      });
      const accessToken = response?.data.access_token;
      localStorage.setItem("access_token", `Bearer ${accessToken}`);

      const userData: any = jwtDecode(accessToken);

      setAuth(userData);
      setUsername("");
      setEmail("");
      setPassword("");
      setCheckPassword("");
      setIsAdmin(false);

      navigate("/dashboard");
    } catch (error: any) {
      if (error.response?.status === 409) {
        setEmailErrorMessage("A user with this email is already registered");
      }
    }
  };

  const togglePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <p>SIGN UP</p>
      <form onSubmit={handleSignup}>
        <li>Name</li>
        <input
          ref={nameRef}
          autoComplete="off"
          type="text"
          placeholder="Enter name"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
          required
        />

        <li>Email</li>
        <input
          autoComplete="off"
          type="text"
          placeholder="Enter email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          required
        />
        <li
          ref={emailErrorRef}
          className={emailErrorMessage ? "error-message mg-0" : "offset mg-0"}
          aria-live="assertive"
        >
          {emailErrorMessage}
        </li>

        <li>Password</li>
        <div className="password">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Min 8 characters, one capital letter, one number"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            required
          />
          <Icon
            type="hide"
            style={"password-hide-icon white-theme"}
            onClick={togglePasswordVisible}
          />
        </div>
        <li
          ref={passwordErrorRef}
          className={
            passwordErrorMessage ? "error-message mg-0" : "offset mg-0"
          }
          aria-live="assertive"
        >
          {passwordErrorMessage}
        </li>

        <li>Confirm Password</li>
        <div className="password">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Min 8 characters, one capital letter, one number"
            onChange={(event) => setCheckPassword(event.target.value)}
            value={checkPassword}
            required
          />
          <Icon
            type="hide"
            style={"password-hide-icon white-theme"}
            onClick={togglePasswordVisible}
          />
        </div>
        <li
          ref={passwordErrorRef}
          className={
            passwordErrorMessage ? "error-message mg-0" : "offset mg-0"
          }
          aria-live="assertive"
        >
          {passwordErrorMessage}
        </li>

        <div className="additional d-flex justify-between">
          <div className="rememberMe">
            <input
              type="checkbox"
              id="rememberMe"
              value="register-admin"
              onClick={() => {
                setIsAdmin(!isAdmin);
              }}
            />
            <label htmlFor="rememberMe" />
            <li>Register As Admin</li>
          </div>
        </div>
        <Button style={"button-main-transparent"} value="SIGN UP" />
      </form>
      <div className="here clear">
        <li>
          Not A Member? Sign In&nbsp;&nbsp;
          <NavLink to={LOGIN_URL}>Here.</NavLink>
        </li>
      </div>
    </>
  );
};

export default SignupForm;

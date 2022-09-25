import { useState, useRef, useEffect, useContext, SyntheticEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthProvider";
import jwtDecode from "jwt-decode";
import axios from "../../../api/axios";
import Button from "../../../components/button/Button";
import Icon from "../../../components/icon/Icon";
import "./Form.scss";

const LOGIN_URL = "/auth/login";

const LoginForm: React.FC = (): JSX.Element => {
  const { setAuth }: any = useContext(AuthContext);
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const emailRef: any = useRef();
  const errorRef: any = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [email, password]);

  const handleLogin = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, { email, password });
      const accessToken = response?.data.access_token;
      localStorage.setItem("access_token", `Bearer ${accessToken}`);

      const userData: any = jwtDecode(accessToken);

      await setAuth(userData);
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (error: any) {
      if (!error.response) {
        setErrorMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrorMsg("Wrong Username or Password");
      } else if (error.response?.status === 401) {
        setErrorMsg("Unauthorized");
      } else {
        setErrorMsg("Login Failed");
      }
      errorRef.current.focus();
    }
  };

  const togglePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <p>LOG IN</p>
      <p
        ref={errorRef}
        className={errorMsg ? "error-message mg-0" : "offscreen mg-0"}
        aria-live="assertive"
      >
        {errorMsg}
      </p>
      <form onSubmit={handleLogin}>
        <li>Email</li>
        <input
          ref={emailRef}
          autoComplete="off"
          type="email"
          placeholder="Enter email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          required
        ></input>

        <li>Password</li>
        <div className="password">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Enter password"
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

        <div className="additional d-flex justify-between">
          <div className="rememberMe">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe"/>
            <li>Remember Me</li>
          </div>
          <p>
            <a href="http://google.com">Forgot Password?</a>
          </p>
        </div>
        <Button style={"button-main-transparent"} value={"LOG IN"} />
      </form>
      <div className="here clear">
        <li>
          Not A Member? Sign Up&nbsp;&nbsp;
          <NavLink to="/signup">Here.</NavLink>
        </li>
      </div>
    </>
  );
};

export default LoginForm;

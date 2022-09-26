import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  DASHBOARD_URL,
  ROOMS_URL,
  SCHEDULE_URL,
} from "../../constants/constants";
import ThemeContext from "../../context/ThemeProvider";
import AuthContext from "../../context/AuthProvider";
import TQuarterLogo from "./components/TQuarterLogo";
import ToggleDark from "../switch/ToggleDark";
import UserInfo from "./components/UserInfo";
import Icon from "../icon/Icon";
import "./Header.scss";
import "../../theme/darkTheme.scss";

const Header: React.FC = (): JSX.Element => {
  const { theme }: any = useContext(ThemeContext);
  const { auth, setAuth }: any = useContext(AuthContext);

  return (
    <header className="d-flex justify-between align-center">
      <div className="header-left d-flex align-center">
        <TQuarterLogo />
        {auth?.id ? (
          <>
            <Icon type={"bar"} />
            <nav className="navigation d-flex clear">
              <NavLink to={DASHBOARD_URL} style={navigationStyle}>
                DASHBOARD
              </NavLink>
              <NavLink to={ROOMS_URL} style={navigationStyle}>
                MEETING ROOMS
              </NavLink>
              <NavLink to={SCHEDULE_URL} style={navigationStyle}>
                YOUR SCHEDULE
              </NavLink>
            </nav>
          </>
        ) : (
          <></>
        )}
      </div>
      <ul className="header-right d-flex align-center">
        <div className="toggle d-flex align-center">
          <span>DARK</span>
          <ToggleDark theme={theme} />
          <span>WHITE</span>
        </div>
        {auth?.id ? (
          <>
            <Icon type={"bar"} />
          </>
        ) : (
          <></>
        )}
        <UserInfo />
      </ul>
    </header>
  );
};

const navigationStyle = ({ isActive }: any) => ({
  opacity: isActive ? "1" : "0.6",
  fontWeight: isActive ? "700" : "500",
});

export default Header;

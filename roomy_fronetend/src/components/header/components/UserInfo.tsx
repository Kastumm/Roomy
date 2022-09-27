import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../../../constants/constants";
import AuthContext from "../../../context/AuthProvider";
import Button from "../../button/Button";
import "./UserInfo.scss";

const UserInfo: React.FC = (): JSX.Element => {
  const { auth, setAuth }: any = useContext(AuthContext);
  const navigate = useNavigate();

  const [logoutVisible, setLogoutVisible] = useState(false);

  const handleLogout = async () => {
    await window.localStorage.clear();
    setAuth(null);
    navigate(LOGIN_URL);
  };

  const handleClick = () => {
    setLogoutVisible((current) => !current);
  };

  return (
    <>
      {auth?.id ? (
        <div
          onClick={handleClick}
          className="user-info d-flex align-center clear"
        >
          {!logoutVisible && (
            <>
              <div className="avatar">
                <li>{auth?.username?.at(0)}</li>
              </div>
              <div className="data">
                <li>{auth?.username}</li>
                <li>{auth?.email}</li>
              </div>
            </>
          )}
          {logoutVisible && (
            <div className="d-flex g-5 p-4">
              <Button
                onClick={handleLogout}
                value="Logout"
                style="button-short-filled"
              />
              <Button value="Go Back" style="button-short-filled" />
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default UserInfo;

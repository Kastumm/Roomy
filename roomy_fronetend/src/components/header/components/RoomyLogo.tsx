import { NavLink } from "react-router-dom";
import { DASHBOARD_URL } from "../../../constants/constants";
import Icon from "../../icon/Icon";
import "./RoomyLogo.scss";

const TQuarterLogo: React.FC = (): JSX.Element => {
  return (
    <div className="tq-logo">
      <Icon type="logo-mark" />
      <NavLink to={DASHBOARD_URL}>
        <Icon type="logo-name" />
      </NavLink>
    </div>
  );
};

export default TQuarterLogo;

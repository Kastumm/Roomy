import { NavLink } from "react-router-dom";
import Icon from "../../icon/Icon";
import "./TQuarterLogo.scss";

const TQuarterLogo: React.FC = (): JSX.Element => {
  return (
    <div className="tq-logo">
      <Icon type="logo-mark" />
      <NavLink to="/dashboard">
        <Icon type="logo-name" style={"white-theme"} />
      </NavLink>
    </div>
  );
};

export default TQuarterLogo;

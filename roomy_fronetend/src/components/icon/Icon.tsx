import IIconComponent from "../../interfaces/IIconComponent";
import arrowRight from "../../assets/img/arrowRight.svg";
import calendar from "../../assets/img/calendar.svg";
import logoName from "../../assets/img/logoName.svg";
import logoMark from "../../assets/img/logoMark.svg";
import member from "../../assets/img/member.svg";
import clock from "../../assets/img/clock.svg";
import cross from "../../assets/img/cross.svg";
import hide from "../../assets/img/hide.svg";
import edit from "../../assets/img/edit.svg";
import bin from "../../assets/img/bin.svg";
import bar from "../../assets/img/bar.svg";
import "./Icon.scss";

const Icon: React.FC<IIconComponent> = ({
  type,
  style,
  onClick,
}: IIconComponent): JSX.Element => {
  let icon = "";
  switch (type) {
    case "member":
      icon = member;
      break;
    case "logo-name":
      icon = logoName;
      break;
    case "logo-mark":
      icon = logoMark;
      break;
    case "clock":
      icon = clock;
      break;
    case "edit":
      icon = edit;
      break;
    case "bin":
      icon = bin;
      break;
    case "arrowRight":
      icon = arrowRight;
      break;
    case "calendar":
      icon = calendar;
      break;
    case "bar":
      icon = bar;
      break;
    case "hide":
      icon = hide;
      break;
    case "cross":
      icon = cross;
      break;
  }
  return <img src={icon} className={style} onClick={onClick} />;
};

export default Icon;

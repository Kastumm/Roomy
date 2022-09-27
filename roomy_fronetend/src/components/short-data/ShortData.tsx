import Icon from "../icon/Icon";
import "./ShortData.scss";

const ShortData: React.FC<any> = ({
  icontype,
  value,
  additional,
}: any): JSX.Element => {
  return (
    <span className={"short-data"}>
      <Icon type={icontype} />
      <li>
        {value}
        {additional}
      </li>
    </span>
  );
};

export default ShortData;
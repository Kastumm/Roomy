import IListDataComponent from "../../interfaces/IListDataComponent";
import "./ListData.scss";

const ListData: React.FC<any> = ({
  title,
  value,
  unit,
}: IListDataComponent): JSX.Element => {
  return (
    <li className="list-data">
      {title + " "}
      <span>
        {value} {unit}
      </span>
    </li>
  );
};

export default ListData;

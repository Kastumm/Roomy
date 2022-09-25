import ITableComponent from "../../interfaces/ITableComponent";
import "./Table.scss";

const Table: React.FC<ITableComponent> = ({
  keyRenderer,
  keys,
  style,
  data,
  columns,
  unit,
}: ITableComponent): JSX.Element => {
  return (
    <div className={style}>
      <table>
        <thead>
          <tr>
            {columns.map((columnName, keyIndex) => (
              <th key={keyIndex}>{columnName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, rowIndex) => (
            <tr key={row._id}>
              {keys.map((key, keyIndex) =>
                keyRenderer?.[key] ? (
                  <td key={keyIndex}>{keyRenderer[key](row, rowIndex)}</td>
                ) : (
                  <td key={keyIndex}>{`${row[key]} ${unit[keyIndex]}`}</td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
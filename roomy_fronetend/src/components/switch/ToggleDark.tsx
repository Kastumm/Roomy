import { useContext } from "react";
import ThemeContext from "../../context/ThemeProvider";
import "./ToggleDark.scss";

const ToggleDark:React.FC<any> = (props: any): JSX.Element => {
  const { setDarkTheme }: any = useContext(ThemeContext);
  return (
    <>
      <input
        type="checkbox"
        id="switch"
        onClick={() => {
          setDarkTheme((current: any) => !current);
        }}
      />
      <label className="mode-switch" htmlFor="switch"></label>
    </>
  );
};

export default ToggleDark;

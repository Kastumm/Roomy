import IButtonComponent from "../../interfaces/IButtonComponent";
import "./Button.scss";

const Button: React.FC<IButtonComponent> = ({
  value,
  style,
  type,
  form,
  id,
  onClick,
}: IButtonComponent): JSX.Element => {
  return (
    <button id={id} onClick={onClick} className={style} type={type} form={form}>
      {value}
    </button>
  );
};

export default Button;
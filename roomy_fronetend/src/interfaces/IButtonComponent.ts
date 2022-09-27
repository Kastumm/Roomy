import { MouseEventHandler } from "react";

interface IButtonComponent {
  value?: string;
  style?: string;
  type?: "button" | "submit" | "reset" | undefined;
  form?: string;
  id?: string;
  onClick?: MouseEventHandler;
}

export default IButtonComponent;

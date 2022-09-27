import { MouseEventHandler } from "react";

interface IIconComponent {
  type: string;
  style?: string;
  onClick?: MouseEventHandler;
}

export default IIconComponent;

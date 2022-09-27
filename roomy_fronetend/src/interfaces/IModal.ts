import { Dispatch, SetStateAction } from "react";

interface IModal {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  modalContent: JSX.Element;
  modalActionButton: JSX.Element;
}

export default IModal;

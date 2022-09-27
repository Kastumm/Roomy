import IModal from "../../interfaces/IModal";
import Button from "../button/Button";
import Icon from "../icon/Icon";
import "./Modal.scss";

const Modal: React.FC<IModal> = ({
  setIsOpen,
  modalContent,
  modalActionButton,
}: IModal): JSX.Element => {
  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)}></div>
      <div className="centered">
        <div className="modal">
          <div
            className="cross d-flex align-center"
            onClick={() => setIsOpen(false)}
          >
            <Icon type="cross" />
          </div>
          {modalContent}
          <div className="actions d-flex justify-between align-center">
            <Button
              onClick={() => setIsOpen(false)}
              value="Cancel"
              style="button-short-transparent"
            />
            {modalActionButton}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

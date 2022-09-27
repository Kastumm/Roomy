import { SyntheticEvent, useState, useEffect, useRef } from "react";
import axios from "../../../api/axios";
import "./AddRoomForm.scss";

const AddRoomForm: React.FC<any> = ({ setIsOpen }: any): JSX.Element => {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState<number | undefined | string>(0);

  const nameRef: any = useRef();

  const handleSave = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("/rooms", {
        name,
        capacity,
      });
      setName("");
      setCapacity(0);
      setIsOpen(false);
    } catch (error: any) {}
  };

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  return (
    <div className="modal-content">
      <p>Add New Room</p>
      <form
        className="d-flex justify-between"
        onSubmit={handleSave}
        id="create-room"
      >
        <div className="input d-grid g-5">
          <label>Name</label>
          <input
            ref={nameRef}
            type="text"
            placeholder="Enter Name"
            onChange={(event) => setName(event.target.value)}
            value={name}
            required
          />
        </div>
        <div className="input d-grid g-5">
          <label>Capacity</label>
          <input
            type="number"
            min={0}
            placeholder="Enter Capacity"
            onChange={(event) => setCapacity(event.target.valueAsNumber)}
            value={capacity}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default AddRoomForm;

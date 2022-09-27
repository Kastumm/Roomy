import axios from "../../../api/axios";
import { SyntheticEvent, useState, useEffect, useRef } from "react";
import "./AddRoomForm.scss";

const UpdateRoomForm:React.FC<any> = ({ setIsOpen, data }: any): JSX.Element => {
  const [name, setName] = useState(data?.name);
  const [capacity, setCapacity] = useState<number | undefined | string>(
    data?.capacity
  );

  const nameRef: any = useRef();

  const handleUpdate = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      await axios.put(`/rooms/${data._id}`, {
        name,
        capacity,
      });

      setName("");
      setCapacity(0);
      setIsOpen(false);
    } catch (error: any) {
    }
  };

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  return (
    <div className="modal-content">
      <p>Update Room</p>
      <form
        className="d-flex justify-between"
        onSubmit={handleUpdate}
        id="update-room"
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

export default UpdateRoomForm;
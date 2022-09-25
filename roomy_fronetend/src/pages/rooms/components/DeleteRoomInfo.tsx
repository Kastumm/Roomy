import ListData from "../../../components/short-data/ListData";
import ShortData from "../../../components/short-data/ShortData";
import "./DeleteRoomInfo.scss";

const DeleteRoomInfo:React.FC<any> = ({ data }: any): JSX.Element => {
  return (
    <div className="modal-content clear">
      <p>Delete Room?</p>
      <div className="delete-info-top-text">
        <li>You are about to delete the following meeting room.</li>
        <li>Would you like to proceed?</li>
      </div>
      <div className="room-info">
        <li className="room-name">{data.name.toUpperCase()}</li>
        <ListData
          title={"Current status"}
          value={data.currentStatus}
          unit={""}
        />
        <div className="room-info-modal d-flex">
          <ShortData
            icontype="member"
            value={data.capacity}
            additional=" members"
          />
          <ShortData
            icontype="clock"
            value={data.futureAppointments}
            additional=" active appointments"
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteRoomInfo;
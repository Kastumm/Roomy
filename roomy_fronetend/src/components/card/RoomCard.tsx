import IRoomCardComponent from "../../interfaces/IRoomCardComponent";
import ListData from "../short-data/ListData";
import "./RoomCard.scss";

const RoomCard: React.FC<IRoomCardComponent> = ({
  name,
  status,
  capacity,
  permision,
  activeMeetings,
  actionButton,
  actionButtonAdmin,
}: IRoomCardComponent): JSX.Element => {
  return (
    <>
      <div className="room-card">
        <div className="card-content clear">
          <div className="info">
            <h3>{name}</h3>
            <ListData title={"Currently"} value={status} />
            <ListData title={"Capacity"} value={capacity} unit={"Members"} />
            <ListData
              title={"Active meetings"}
              value={activeMeetings}
              unit={"future meetings"}
            />
          </div>
        </div>
        <div className="room-card-border clear">
          {permision ? actionButtonAdmin : <></>}
          {actionButton}
        </div>
      </div>
    </>
  );
};

export default RoomCard;
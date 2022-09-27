import IScheduleCardComponent from "../../interfaces/IScheduleCardComponent";
import ShortData from "../short-data/ShortData";
import Icon from "../icon/Icon";
import "./ScheduleCard.scss";

const ScheduleCard: React.FC<IScheduleCardComponent> = ({
  meetingTitle,
  roomName,
  date,
  noParticipants,
  actionButton,
  duration,
}): JSX.Element => {
  return (
    <div className="schedule-card d-flex justify-between align-center clear">
      <p className="left-side">{meetingTitle}</p>
      <div className="right-side d-flex align-center">
        <li>{roomName}</li>
        <Icon type={"bar"} />
        <ShortData icontype={"clock"} value={duration} additional={" h"} />
        <Icon type={"bar"} />
        <ShortData icontype={"calendar"} value={date} />
        <Icon type={"bar"} />
        <ShortData icontype={"member"} value={noParticipants} />
        <Icon type={"bar"} />
        {actionButton}
      </div>
    </div>
  );
};

export default ScheduleCard;
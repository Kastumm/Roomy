import IDashCardComponent from "../../interfaces/IDashCardComponent";
import randomColor from "../../utils/utils";
import ShortData from "../short-data/ShortData";
import "./DashCard.scss";

const colors = ["#F6921E", "#FFC132", "#F05B40"];

const DashCard: React.FC<IDashCardComponent> = (
  props: IDashCardComponent
): JSX.Element => {
  return (
    <>
      <div className="dash-card d-flex">
        <div className="card-content d-flex justify-between">
          <div className="card-left-side">
            <div className="meeting-info">
              <h3>{props.title.toUpperCase()}</h3>
              <span className="appoint">
                <li>Appointed for&nbsp;&nbsp;</li>
                <p>{props.time}</p>
              </span>
              <span className="appoint">
                <li>Appointed by&nbsp;&nbsp;</li>
                <p>{props.owner}</p>
              </span>
            </div>
          </div>
          <div className="card-right-side d-grid">
            <ShortData icontype="member" value={props.noParticipants} />
            <ShortData
              icontype="clock"
              value={props.duration}
              additional={" h"}
            />
          </div>
        </div>
        <div
          className={"border"}
          style={{ backgroundColor: randomColor(colors) }}
        ></div>
      </div>
    </>
  );
};

export default DashCard;

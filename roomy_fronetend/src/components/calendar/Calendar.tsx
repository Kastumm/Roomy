import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./Calendar.scss";

const localizer = momentLocalizer(moment);

const MyCalendar: React.FC<any> = ({ events }: any): JSX.Element => {
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor={"start"}
        endAccessor={"end"}
        style={{ height: 500 }}
      />
    </div>
  );
};

export default MyCalendar;

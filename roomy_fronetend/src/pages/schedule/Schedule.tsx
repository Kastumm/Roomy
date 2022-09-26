import { useContext, useState, useEffect } from "react";
import ScheduleCard from "../../components/card/ScheduleCard";
import MeetingsContext from "../../context/MeetingsProvider";
import AuthContext from "../../context/AuthProvider";
import Button from "../../components/button/Button";
import IMeeting from "../../interfaces/IMeeting";
import axios from "../../api/axios";
import "./Schedule.scss";

const Schedule: React.FC = (): JSX.Element => {
  const { auth }: any = useContext(AuthContext);
  const { meetingsData, getMeetingsData }: any = useContext(MeetingsContext);

  const [futureMeetingsData, setFutureMeetingsData] = useState<IMeeting[]>([]);
  const [pastMeetingsData, setPastMeetingsData] = useState<IMeeting[]>([]);

  async function getUserMeetingsData() {
    getMeetingsData();

    const userMeetingsData = meetingsData?.filter(
      (meeting: IMeeting) => meeting.owner_id === auth.id
    );

    const currentTime = new Date();

    setFutureMeetingsData(
      userMeetingsData
        .filter(
          (meeting: IMeeting) =>
            new Date(meeting.date_iso).getTime() > currentTime.getTime()
        )
        .sort((a: IMeeting, b: IMeeting) => {
          return (
            new Date(a.date_iso).valueOf() - new Date(b.date_iso).valueOf()
          );
        })
    );

    setPastMeetingsData(
      userMeetingsData.filter(
        (meeting: IMeeting) =>
          new Date(meeting.date_iso).getTime() < currentTime.getTime()
      )
    );
  }

  async function handleMeetingDelete(meeting: IMeeting) {
    try {
      await axios.delete(`/meetings/${meeting._id}`);
      getUserMeetingsData();
    } catch (error) {}
  }

  useEffect(() => {
    getUserMeetingsData();
  }, []);

  return (
    <main className="meetings">
      <div className="future-meetings">
        <h1>Your Future Meetings</h1>
        {futureMeetingsData.map((meeting) => (
          <ScheduleCard
            meetingTitle={meeting.title.toUpperCase()}
            roomName={meeting.room_name}
            date={meeting.date}
            noParticipants={meeting.noParticipants}
            duration={meeting.duration}
            key={meeting._id}
            actionButton={
              <Button
                style={"button-short-filled"}
                value={"End Meeting"}
                onClick={() => handleMeetingDelete(meeting)}
              />
            }
          />
        ))}
      </div>
      <div className="past-meetings">
        <h1> Your Past Meetings</h1>
        {pastMeetingsData.map((meeting) => (
          <ScheduleCard
            meetingTitle={meeting.title.toUpperCase()}
            roomName={meeting.room_name}
            date={meeting.date}
            noParticipants={meeting.noParticipants}
            duration={meeting.duration}
            key={meeting._id}
          />
        ))}
      </div>
    </main>
  );
};

export default Schedule;

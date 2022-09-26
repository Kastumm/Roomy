import { SyntheticEvent, useContext, useEffect, useRef, useState } from "react";
import { MEETINGS_API_URL } from "../../../constants/constants";
import MyCalendar from "../../../components/calendar/Calendar";
import CalendarEvent from "../../../models/calendarEvent";
import AuthContext from "../../../context/AuthProvider";
import axios from "../../../api/axios";
import "./AddMeetingForm.scss";

const AddMeetingForm: React.FC<any> = ({
  data,
  setIsOpen,
  selectedRoom,
  meetingsData,
}: any): JSX.Element => {
  const { auth }: any = useContext(AuthContext);

  const [selectedRoomName, setSelectedRoomName] = useState(selectedRoom?.name);

  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [day, setDay] = useState("");
  const [room_id, setRoom_id] = useState(selectedRoom?._id || data?.at(0)?._id);

  const [userEmail, setUserEmail] = useState("");
  const [participants, setParticipants] = useState<string[]>([auth.id]);
  const [participantsEmail, setParticipantsEmail] = useState<string[]>([]);

  const [events, setEvents] = useState<any[]>([]);

  const [errorMsg, setErrorMsg] = useState("");
  const [timeExceedErrorMessage, setTimeExceedErrorMessage] = useState("");

  const addMemberRef: any = useRef();
  const timeExceedErrorRef: any = useRef();
  const errorRef: any = useRef();

  function createDate(date: any) {
    const isoDate = date?.toISOString();
    return isoDate;
  }

  const startDate = createDate(new Date(`${day}T${startTime}`));
  const endDate = createDate(new Date(`${day}T${endTime}`));

  const handleAddMembers = async (event: any) => {
    try {
      const { data: user } = await axios.get(
        `/users/find/${event.target.value}`
      );
      setParticipantsEmail((participantsEmail) => [
        ...participantsEmail,
        user.email,
      ]);
      setParticipants((participants) => [...participants, user._id]);
      setUserEmail("");
      addMemberRef.current.focus();
    } catch (error) {
      setErrorMsg("This user does not exist");
      addMemberRef.current.focus();
    }
  };

  useEffect(() => {
    const keyDownHandler = (event: any) => {
      if (
        event.key === "Enter" &&
        document.activeElement === addMemberRef.current
      ) {
        handleAddMembers(event);
      }
    };
    document.addEventListener("keydown", keyDownHandler);
  }, []);

  useEffect(() => {
    setErrorMsg("");
    setTimeExceedErrorMessage("");
  }, [userEmail, startTime, endTime, day]);

  const handleSave = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (document.activeElement === addMemberRef.current) {
    } else {
      try {
        // const response =
        await axios.post(MEETINGS_API_URL, {
          name,
          startDate,
          endDate,
          room_id,
          participants,
        });
        setName("");
        setStartTime("");
        setDay("");
        setParticipants([]);
        setParticipantsEmail([]);
        setIsOpen(false);
      } catch (error: any) {
        setTimeExceedErrorMessage("Time should be not more than 2 hours");
      }
    }
  };

  useEffect(() => {
    const meetingsForRoom = meetingsData.filter(
      (meeting: any) => meeting.room_id === room_id
    );

    setEvents(
      meetingsForRoom.map(
        (meeting: any) =>
          new CalendarEvent(
            meeting.title,
            new Date(meeting.startDate),
            new Date(meeting.endDate)
          )
      )
    );
  }, []);

  function handleRoomChange(event: any) {
    setRoom_id(data.find((room: any) => room.name === event.target.value)._id);

    const meetingsForRoom = meetingsData.filter(
      (meeting: any) => meeting.room_id === room_id
    );

    setEvents(
      meetingsForRoom.map(
        (meeting: any) =>
          new CalendarEvent(
            meeting.title,
            new Date(meeting.startDate),
            new Date(meeting.endDate)
          )
      )
    );
    setSelectedRoomName(event.target.value);
  }

  return (
    <div className="d-flex">
      <form id="create-meeting" className="meeting-form" onSubmit={handleSave}>
        <li>Select Meeting Room</li>
        <select
          id="rooms-names"
          value={selectedRoomName}
          placeholder="Select Room"
          onChange={handleRoomChange}
        >
          {data.map((room: any) => (
            <option key={room.name} value={room.name}>
              {room.name}
            </option>
          ))}
        </select>
        <li>Title/Subject</li>
        <input
          type={"text"}
          placeholder="Enter Title"
          onChange={(event) => setName(event.target.value)}
          required
        />
        <li>Pick Time</li>
        <span className="pick-date align-center">
          <input
            type={"date"}
            onChange={(event) => setDay(event.target.value)}
          />
          <span className="pick-time d-flex align-center g-5">
            <input
              type={"time"}
              onChange={(event) => setStartTime(event.target.value)}
            />
            <li>to</li>
            <input
              type={"time"}
              onChange={(event) => setEndTime(event.target.value)}
            />
          </span>
        </span>
        <li
          ref={timeExceedErrorRef}
          className={
            timeExceedErrorMessage ? "error-message mg-0" : "offscreen mg-0"
          }
          aria-live="assertive"
        >
          {timeExceedErrorMessage}
        </li>
        <li>Add Members</li>
        <input
          ref={addMemberRef}
          value={userEmail}
          type={"text"}
          placeholder="Enter email"
          onChange={(event) => setUserEmail(event.target.value)}
        />
        <li
          ref={errorRef}
          className={errorMsg ? "error-message mg-0" : "offscreen mg-0"}
          aria-live="assertive"
        >
          {errorMsg}
        </li>
        <div className="meeting-members">
          {participantsEmail.map((member: any) => (
            <Member member={member} />
          ))}
        </div>
      </form>
      <MyCalendar events={events} />
    </div>
  );
};

const Member: React.FC<any> = ({ props }: any): JSX.Element => (
  <span className="member-card">{props.member}</span>
);

export default AddMeetingForm;

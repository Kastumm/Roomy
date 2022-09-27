import { useContext, useEffect, useState } from "react";
import AddMeetingForm from "../schedule/components/AddMeetingForm";
import UpdateRoomForm from "../rooms/components/UpdateRoomForm";
import MeetingsContext from "../../context/MeetingsProvider";
import RoomsContext from "../../context/RoomsProvider";
import RoomCard from "../../components/card/RoomCard";
import DashCard from "../../components/card/DashCard";
import AuthContext from "../../context/AuthProvider";
import Button from "../../components/button/Button";
import IMeeting from "../../interfaces/IMeeting";
import Modal from "../../components/modal/Modal";
import Icon from "../../components/icon/Icon";
import IRoom from "../../interfaces/IRoom";
import "./Dashboard.scss";

const Dashboard: React.FC = (): JSX.Element => {
  const { auth }: any = useContext(AuthContext);
  const { roomsData, getRoomsData }: any = useContext(RoomsContext);
  const { meetingsData, getMeetingsData }: any = useContext(MeetingsContext);

  const [isScheduleMeetingModalOpen, setScheduleMeetingModalIsOpen] =
    useState(false);
  const [isUpdateRoomModalOpen, setUpdateRoomModalIsOpen] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState<any>({});

  useEffect(() => {
    getRoomsData();
    getMeetingsData();
  }, []);

  useEffect(() => {
    const keyDownHandler = (event: any) => {
      if (event.key === "Escape") {
        setScheduleMeetingModalIsOpen(false);
        setUpdateRoomModalIsOpen(false);
      }
    };
    document.addEventListener("keydown", keyDownHandler);
  }, []);

  function handleAppointMeeting(room: IRoom) {
    setSelectedRoom(room);
    setScheduleMeetingModalIsOpen(true);
  }

  function handleOnEditClick(room: IRoom) {
    setSelectedRoom(room);
    setUpdateRoomModalIsOpen(true);
  }
  return (
    <>
      {isScheduleMeetingModalOpen && (
        <Modal
          setIsOpen={setScheduleMeetingModalIsOpen}
          modalContent={
            <AddMeetingForm
              data={roomsData}
              selectedRoom={selectedRoom}
              meetingsData={meetingsData}
            />
          }
          modalActionButton={
            <Button
              id="create-meeting-button"
              style="button-short-filled"
              value="Save"
              type="submit"
              form="create-meeting"
            />
          }
        />
      )}

      {isUpdateRoomModalOpen && (
        <Modal
          setIsOpen={setUpdateRoomModalIsOpen}
          modalContent={
            <UpdateRoomForm
              data={selectedRoom}
              setIsOpen={setUpdateRoomModalIsOpen}
            />
          }
          modalActionButton={
            <Button
              style="button-short-filled"
              value="Update"
              type="submit"
              form="update-room"
            />
          }
        />
      )}

      <div className="dashboard d-flex justify-between">
        <main className="left-side">
          <h1>Welcome back!</h1>
          <p>
            Control your schedule, be flexible and appoint new meetings with
            your co-workers whenever you need
          </p>
          <div className="last-updates d-flex justify-between">
            <h2>LAST UPDATES</h2>
            <Button
              onClick={() => setScheduleMeetingModalIsOpen(true)}
              value="SCHEDULE A MEETING"
              style="button-main-filled"
            />
          </div>
          <div className="meetings">
            {meetingsData?.map((meeting: IMeeting) => (
              <DashCard
                permision={auth?.isAdmin}
                title={meeting.title}
                owner={meeting.owner}
                time={meeting.date}
                duration={meeting.duration}
                noParticipants={meeting.noParticipants}
                key={meeting._id}
              />
            ))}
          </div>
        </main>
        <div className="right-side">
          <span className="side">
            <p>SCHEDULE A MEETING ROOM</p>
            {roomsData?.map((room: IRoom) => (
              <RoomCard
                permision={auth?.isAdmin}
                name={room.name}
                capacity={room.capacity}
                activeMeetings={room.futureAppointments}
                status={room.currentStatus}
                key={room._id}
                actionButtonAdmin={
                  <button onClick={() => handleOnEditClick(room)}>EDIT</button>
                }
                actionButton={
                  <button onClick={() => handleAppointMeeting(room)}>
                    APPOINT&nbsp;&nbsp;
                    <Icon type={"arrowRight"} />
                  </button>
                }
              />
            ))}
          </span>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

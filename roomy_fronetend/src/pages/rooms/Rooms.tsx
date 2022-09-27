import { useEffect, useState, useContext } from "react";
import AddMeetingForm from "../schedule/components/AddMeetingForm";
import MeetingsContext from "../../context/MeetingsProvider";
import UpdateRoomForm from "./components/UpdateRoomForm";
import DeleteRoomInfo from "./components/DeleteRoomInfo";
import RoomsContext from "../../context/RoomsProvider";
import AuthContext from "../../context/AuthProvider";
import Button from "../../components/button/Button";
import AddRoomForm from "./components/AddRoomForm";
import Table from "../../components/table/Table";
import Modal from "../../components/modal/Modal";
import Icon from "../../components/icon/Icon";
import IRoom from "../../interfaces/IRoom";
import axios from "../../api/axios";
import "./Rooms.scss";

const Rooms: React.FC = (): JSX.Element => {
  const { auth }: any = useContext(AuthContext);
  const { roomsData, getRoomsData }: any = useContext(RoomsContext);
  const { meetingsData, getMeetingsData }: any = useContext(MeetingsContext);

  const [isAddRoomModalOpen, setAddRoomModalIsOpen] = useState(false);
  const [isDeleteRoomModalOpen, setDeleteRoomModalIsOpen] = useState(false);
  const [isUpdateRoomModalOpen, setUpdateRoomModalIsOpen] = useState(false);
  const [isScheduleMeetingModalOpen, setScheduleMeetingModalIsOpen] =
    useState(false);

  const [selectedRoom, setSelectedRoom] = useState<IRoom>();

  useEffect(() => {
    const keyDownHandler = (event: any) => {
      if (event.key === "Escape") {
        setAddRoomModalIsOpen(false);
        setUpdateRoomModalIsOpen(false);
        setDeleteRoomModalIsOpen(false);
        setScheduleMeetingModalIsOpen(false);
      }
    };
    document.addEventListener("keydown", keyDownHandler);
  }, []);

  useEffect(() => {
    getRoomsData();
    getMeetingsData();
  }, [isDeleteRoomModalOpen, isAddRoomModalOpen, isUpdateRoomModalOpen]);

  function handleOnBinClick(room: IRoom) {
    setSelectedRoom(room);
    setDeleteRoomModalIsOpen(true);
  }

  function handleOnUpdateClick(room: IRoom) {
    setSelectedRoom(room);
    setUpdateRoomModalIsOpen(true);
  }

  function handleOnScheduleMeetingClick(room: IRoom) {
    setSelectedRoom(room);
    setScheduleMeetingModalIsOpen(true);
  }

  async function handleRoomDelete() {
    try {
      await axios.delete(`/rooms/${selectedRoom?._id}`);
      setDeleteRoomModalIsOpen(false);
    } catch (error) {}
  }

  return (
    <>
      <div className="rooms">
        <h1>Meeting Rooms</h1>
        <p>Enter a meeting room to see it's calendar view of the events</p>

        {isAddRoomModalOpen && (
          <Modal
            setIsOpen={setAddRoomModalIsOpen}
            modalContent={<AddRoomForm setIsOpen={setAddRoomModalIsOpen} />}
            modalActionButton={
              <Button
                style="button-short-filled"
                value="Save"
                type="submit"
                form="create-room"
              />
            }
          />
        )}

        {isDeleteRoomModalOpen && (
          <Modal
            setIsOpen={setDeleteRoomModalIsOpen}
            modalContent={<DeleteRoomInfo data={selectedRoom} />}
            modalActionButton={
              <Button
                style="button-short-filled"
                value="Yes, delete"
                onClick={() => handleRoomDelete()}
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

        {isScheduleMeetingModalOpen && (
          <Modal
            setIsOpen={setScheduleMeetingModalIsOpen}
            modalContent={
              <AddMeetingForm
                data={roomsData}
                selectedRoom={selectedRoom}
                meetingsData={meetingsData}
                setIsOpen={setScheduleMeetingModalIsOpen}
              />
            }
            modalActionButton={
              <Button
                style="button-short-filled"
                value="Save"
                type="submit"
                form="create-meeting"
              />
            }
          />
        )}
      </div>
      <div className="filters">
        {auth?.isAdmin ? (
          <Button
            onClick={() => setAddRoomModalIsOpen(true)}
            value={"ADD MEETING ROOM"}
            style={"button-main-filled"}
          />
        ) : (
          <div></div>
        )}
      </div>
      <div>
        <Table
          style={"room-table"}
          keyRenderer={{
            iconEdit: (room: IRoom) => (
              <Icon type={"edit"} onClick={() => handleOnUpdateClick(room)} />
            ),
            iconBin: (room: IRoom) => (
              <Icon type={"bin"} onClick={() => handleOnBinClick(room)} />
            ),
            button: (room: IRoom) => (
              <Button
                value={"Schedule meeting"}
                style={"button-short-filled"}
                onClick={() => handleOnScheduleMeetingClick(room)}
              />
            ),
          }}
          data={roomsData}
          columns={
            auth?.isAdmin
              ? [
                  "Name",
                  "Current Status",
                  "Capacity",
                  "Active Appointments",
                  "",
                  "",
                  "",
                ]
              : [
                  "Name",
                  "Current Status",
                  "Capacity",
                  "Active Appointments",
                  "",
                ]
          }
          keys={
            auth?.isAdmin
              ? [
                  "name",
                  "currentStatus",
                  "capacity",
                  "futureAppointments",
                  "iconBin",
                  "iconEdit",
                  "button",
                ]
              : [
                  "name",
                  "currentStatus",
                  "capacity",
                  "futureAppointments",
                  "button",
                ]
          }
          unit={
            auth?.isAdmin
              ? ["", "", "Members", "future meetings", "", ""]
              : ["", "", "Members", "future meetings"]
          }
        />
      </div>
    </>
  );
};

export default Rooms;

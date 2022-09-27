interface IMeeting {
  _id: string;
  title: string;
  date: string;
  date_iso: string;
  endDate: string;
  startDate: string;
  duration: number;
  owner: string;
  owner_id: string;
  room_id: string;
  room_name: string;
  participants: string[];
  noParticipants: number;
}

export default IMeeting;

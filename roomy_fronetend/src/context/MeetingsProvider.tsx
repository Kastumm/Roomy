import { createContext, useEffect, useState } from "react";
import axios from "../api/axios";

const MeetingsContext = createContext({});

export const MeetingsProvider = ({ children }: any) => {
  const [meetingsData, setMeetingsData] = useState();

  async function getMeetingsData() {
    try {
      const { data: meetingsData } = await axios.get("/meetings");
      setMeetingsData(meetingsData);
    } catch (error) {}
  }

  useEffect(() => {
    getMeetingsData();
  }, []);

  return (
    <MeetingsContext.Provider
      value={{ meetingsData, setMeetingsData, getMeetingsData }}
    >
      {children}
    </MeetingsContext.Provider>
  );
};

export default MeetingsContext;

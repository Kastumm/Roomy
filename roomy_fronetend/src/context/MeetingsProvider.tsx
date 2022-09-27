import { createContext, useEffect, useState } from "react";
import { MEETINGS_API_URL } from "../constants/constants";
import axios from "../api/axios";

const MeetingsContext = createContext({});

export const MeetingsProvider = ({ children }: any) => {
  const [meetingsData, setMeetingsData] = useState();

  async function getMeetingsData() {
    try {
      const { data: meetingsData } = await axios.get(MEETINGS_API_URL);
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

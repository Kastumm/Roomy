import { createContext, useEffect, useState } from "react";
import { ROOMS_URL } from "../constants/constants";
import axios from "../api/axios";

const RoomsContext = createContext({});

export const RoomsProvider = ({ children }: any) => {
  const [roomsData, setRoomsData] = useState();

  async function getRoomsData() {
    try {
      const { data: roomsData } = await axios.get(ROOMS_URL);
      setRoomsData(roomsData);
    } catch (error) {}
  }

  useEffect(() => {
    getRoomsData();
  }, []);

  return (
    <RoomsContext.Provider value={{ roomsData, setRoomsData, getRoomsData }}>
      {children}
    </RoomsContext.Provider>
  );
};

export default RoomsContext;

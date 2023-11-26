import { useContractEvent } from "wagmi";
import abiJson from "../../abi/game-abi.json";
import { useState } from "react";
import { Log } from "viem";

export const EventFeed = () => {
  const [events, setEvents] = useState<Log[]>([]);
  useContractEvent({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: abiJson.abi,
    eventName: "Played",
    listener(log) {
      console.log(log);
      setEvents([...events, ...log]);
    },
  });

  return (
    <>
      <div>Events:</div>
      <ul>{events.map((log) => JSON.stringify(log))}</ul>
    </>
  );
};

import { readContract } from "@wagmi/core";
import abiJson from "../../abi/game-abi.json";
import { deserialize, useAccount } from "wagmi";
import { useEffect, useState } from "react";

export const GameInfo = () => {
  const [potSize, setPotSize] = useState("Loading...");
  const [leader, setLeader] = useState("Loading...");
  const { address } = useAccount();

  useEffect(() => {
    (async function getGameInfo() {
      const rawPotSize = await readContract({
        address: import.meta.env.VITE_CONTRACT_ADDRESS,
        abi: abiJson.abi,
        functionName: "potBalance",
      });
      const deserialised = deserialize(rawPotSize as unknown as string);
      setPotSize(deserialised);

      const rawLeader = await readContract({
        address: import.meta.env.VITE_CONTRACT_ADDRESS,
        abi: abiJson.abi,
        functionName: "currentLeader",
      });

      setLeader(rawLeader as unknown as string);
    })();
  }, []);

  if (!address) {
    return null;
  }

  return (
    <>
      <div>Pot size: {potSize}</div>
      <div>Leader: {leader}</div>
    </>
  );
};

import { readContract } from "@wagmi/core";
import abiJson from "../../abi/game-abi.json";
import { deserialize, useAccount, Address } from "wagmi";
import { useEffect, useState } from "react";
import { formatEthAddress } from "../../utils";

export const GameInfo = () => {
  const [potSize, setPotSize] = useState<string | undefined>();
  const [leader, setLeader] = useState<Address | undefined>();
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

      setLeader(rawLeader as Address);
    })();
  }, []);

  if (!address) {
    return null;
  }

  const leaderDisplay = leader ? formatEthAddress(leader) : "Loading...";

  return (
    <>
      <div>Pot size: {potSize ?? "Loading..."}</div>
      <div>Leader: {leaderDisplay}</div>
    </>
  );
};

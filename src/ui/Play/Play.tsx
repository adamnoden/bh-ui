import { useEffect, useState } from "react";
import { readContract } from "@wagmi/core";
import { deserialize, useAccount, useContractWrite } from "wagmi";
import abiJson from "../../abi/game-abi.json";

const PlayButton: React.FC<{ ticketPrice: string; rawTicketPrice: bigint }> = ({
  ticketPrice,
  rawTicketPrice,
}) => {
  const { address } = useAccount();

  const { data, isLoading, isSuccess, write, error, isError } =
    useContractWrite({
      address: import.meta.env.VITE_CONTRACT_ADDRESS,
      abi: abiJson.abi,
      functionName: "play",
      value: rawTicketPrice,
    });
  if (!address) {
    return null;
  }

  const handleClick = () => {
    write();
  };

  return (
    <div>
      {isSuccess ? `Successful bid. Tx: ${data?.hash}` : ""}
      <br />
      <button disabled={isLoading || !ticketPrice} onClick={handleClick}>
        Play (costs {ticketPrice ?? ""} wei)
      </button>
      <br />

      {isError ? error?.message : ""}
    </div>
  );
};

export const Play = () => {
  const [ticketPrice, setTicketPrice] = useState<string | null>(null);
  const [rawTicketPrice, setRawTicketPrice] = useState<bigint | null>(null);
  useEffect(() => {
    (async function getGameInfo() {
      const rawTicketPriceInner = await readContract({
        address: import.meta.env.VITE_CONTRACT_ADDRESS,
        abi: abiJson.abi,
        functionName: "ticketPrice",
      });
      const deserialised = deserialize(
        rawTicketPriceInner as unknown as string
      );
      setRawTicketPrice(rawTicketPriceInner as unknown as bigint);
      setTicketPrice(deserialised);
    })();
  }, []);

  if (!ticketPrice || !rawTicketPrice) {
    return null;
  }

  return (
    <PlayButton ticketPrice={ticketPrice} rawTicketPrice={rawTicketPrice} />
  );
};

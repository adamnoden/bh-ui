import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { formatEthAddress } from "../../utils";

export const Profile = () => {
  const { address, isConnected } = useAccount();

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  if (isConnected && address)
    return (
      <div>
        Connected to {formatEthAddress(address)}
        <br />
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  return <button onClick={() => connect()}>Connect Wallet</button>;
};

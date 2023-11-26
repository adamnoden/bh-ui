import { WagmiConfig, createConfig, mainnet } from "wagmi";
import { createPublicClient, http } from "viem";
import { localhost } from "viem/chains";
import { Profile } from "./Profile/Profile";
import { GameInfo } from "./GameInfo/GameInfo";
import { Play } from "./Play/Play";
import "./App.css";

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: import.meta.env.DEV ? localhost : mainnet,
    transport: http(),
  }),
});

function App() {
  return (
    <WagmiConfig config={config}>
      <Profile />
      <GameInfo />
      <Play />
    </WagmiConfig>
  );
}

export default App;

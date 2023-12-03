import { Address } from "wagmi";

export function formatEthAddress(address: Address) {
  if (!address || address.length < 8) {
    return address;
  }
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;
}

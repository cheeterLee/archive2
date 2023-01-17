import { HardhatUserConfig } from "hardhat/config";
import "dotenv/config"
import "@nomicfoundation/hardhat-toolbox";

const GOERLI_URL = process.env.GOERLI_URL as string
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY as string

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: GOERLI_URL,
      accounts: [GOERLI_PRIVATE_KEY],
    }
  }
};

export default config;

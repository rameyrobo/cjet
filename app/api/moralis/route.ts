import { SolNetwork } from "@moralisweb3/common-sol-utils";
import Moralis from "moralis";


let moralisStarted = false;

export async function GET() {
  if (!moralisStarted) {
    await Moralis.start({
      apiKey: process.env.MORALIS_API_KEY,
    });
    moralisStarted = true;
  }

  const network = SolNetwork.MAINNET;

  const addresses = [
    process.env.JOSLIN_ADDRESS,
    process.env.GIVING_ADDRESS,
    process.env.SKATEPARK_ADDRESS,
    process.env.GO_FUND_ME_ADDRESS,
  ].filter(Boolean);

  const results = await Promise.all(
    addresses.map(async (address) => {
      const response = await Moralis.SolApi.account.getPortfolio({ address, network });
      return {
        address,
        portfolio: response.toJSON(),
      };
    })
  );

  return new Response(JSON.stringify(results), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
const IOST = require("@kunroku/iost");
const iost_config = require("../config/iost.json");
const { address } = require("../config/contract.json");

if (!address)
  throw new Error("contract not deployed");

const iost = new IOST(iost_config);
iost.rpc.blockchain.getContractStorage(address, "msg", "").then(({ data }) => {
  console.log(data);
});

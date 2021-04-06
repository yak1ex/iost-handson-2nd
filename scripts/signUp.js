const IOST = require("@kunroku/iost");
const fs = require("fs");
const iost_config = require("../config/iost.json");
const { admin, id: iost_id, secret_key } = require("../config/account.json");
const parse_args = require("./parse_args");

if (iost_id || secret_key) {
  throw new Error('account information already exists');
}

const { id } = parse_args({
  id: (value) => {
    return value;
  }
});

const iost = new IOST(iost_config);
const account = new IOST.Account("admin");
const kp = new IOST.KeyPair.Ed25519(IOST.Bs58.decode(admin));
account.addKeyPair("active", kp);
iost.setPublisher(account);

const newKp = IOST.KeyPair.Ed25519.randomKeyPair();
const tx = iost.contract.auth.signUp(id, IOST.Bs58.encode(newKp.publicKey), IOST.Bs58.encode(newKp.publicKey));
iost.contract.gas.pledge(account.id, id, 1000, tx);
iost.contract.ram.buy(account.id, id, 1024, tx);
iost.contract.token.transfer('iost', account.id, id, 50000, "initial transfer", tx);

const handler = iost.signAndSend(tx, true);
handler.listen({ irreversible: true });
handler.onSuccess(res => {
  fs.writeFileSync("config/account.json", JSON.stringify({
    admin: admin,
    id: id,
    secret_key: IOST.Bs58.encode(newKp.secretKey)
  }), "utf-8");
  console.log(res);
});
handler.onFailed(console.log);

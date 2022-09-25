import { fromBase64, toHex } from "@cosmjs/encoding";
import { encodeBech32Pubkey, decodeBech32Pubkey } from "@cosmjs/launchpad"
import { sha256 } from "@cosmjs/crypto";

const pubkey = {
        type: "tendermint/PubKeyEd25519",
        value: "CM0tuwBVM2UPzc1eKOvvraQdSnIWC3riTabKQc2pvYc=",
};
const bech32Pubkey = encodeBech32Pubkey(pubkey, "cosmosvaloper");
console.log(bech32Pubkey);

const addressData = sha256(fromBase64(pubkey.value)).slice(0, 20);
const address = toHex(addressData).toUpperCase();

console.log(address);

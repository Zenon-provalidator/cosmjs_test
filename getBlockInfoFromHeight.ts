import { QueryClient, setupAuthExtension, StargateClient  } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { Any } from "cosmjs-types/google/protobuf/any";
import { fromBase64, toBase64 } from "@cosmjs/encoding";

async function f() {
  const rpcUrl = "https://rpc.cosmos.network:443"
  let height = 11604289; // from db height
  const tmClient = await Tendermint34Client.connect(rpcUrl);
  let blocks = await tmClient.block(height)
  .then(async (blocks)=>{
    const client = await StargateClient.connect(rpcUrl);
    let txs = await client.searchTx({ height: height })
    console.log(blocks);
    console.log(txs);
  })
  .catch(err =>{
      console.error(`Not found ${height}.\n${err}`);
  });


  // const client = QueryClient.withExtensions(tmClient, setupAuthExtension);
  // const accounts = await client.auth.account("cosmos1g48268mu5vfp4wk7dk89r0wdrakm9p5xnm5pr9");
  // let account = Any.toJSON(accounts)
  // console.log(account.value);

}

f();

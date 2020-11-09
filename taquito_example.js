const {Tezos} = require('@taquito/taquito');
const {InMemorySigner} = require('@taquito/signer');
const hStorage = require('./hashStorage.json');

const secretKey = "insert_private_key_here" ;
const delphiNet_hashStorage = "KT1JFhUFdddM8HkbjD3wqP1mwzLGewohBgtY";
const cNet_hashStorage = "KT1D28kXcmQpKsob19bYTdSDu7bSbNnX7FjS";

Tezos.setProvider({rpc: 'https://delphinet-tezos.giganode.io/', signer: InMemorySigner.fromSecretKey("insert_private_key_here")});

//check balance
const getBalanceAmount = async() => {
    const accountInitialBalance = await (await Tezos.tz.getBalance('tz1KiNkbiZFypXTPZEmn2U4xEsU5w5LZBXtW')).toNumber()/1000000;
    console.log(accountInitialBalance);
}
(async () => {
  await getBalanceAmount(); 
  })().catch(e => console.error(e));

//inserting hashKey into the smart contract storage
// InMemorySigner.fromSecretKey("insert_private_key_here")
// .then( theSigner =>{
//   Tezos.setProvider({signer: theSigner})
//   Tezos.contract.at(delphiNet_hashStorage)
//   .then(contract =>{
//     const hashKey = "testing123";
//     console.log(`Calling default entrypoint, inserting ${hashKey} in`);
//     return contract.methods.main(hashKey).send();
//   })
//   .then(op => {
//     console.log(`Awaiting for ${op.hash} to be confirmed...`);
//     return op.confirmation(1).then(() => op.hash);
//   })
//   .then(hash => console.log(`operation injected`))
//   .catch(error => console.log(`Error: ${JSON.stringify(error,null,20)}`))
// });

//checking whether key exist (exist example)
InMemorySigner.fromSecretKey("insert_private_key_here")
.then( theSigner =>{
  Tezos.setProvider({signer: theSigner})
  Tezos.contract.at(delphiNet_hashStorage)
  .then(contract =>{
    return contract.storage()
  })
  .then(myStorage  => {
    return myStorage['hStorage'].get("testing123")
  }).then( value => {
    console.log(`Value exist : ${value}`);
  }).catch(error => console.log(`Error: ${JSON.stringify(error,null,20)}`))
});

//checking whether key exist (do not exist example)
InMemorySigner.fromSecretKey("insert_private_key_here")
.then( theSigner =>{
  Tezos.setProvider({signer: theSigner})
  Tezos.contract.at(delphiNet_hashStorage)
  .then(contract =>{
    return contract.storage()
  })
  .then(myStorage  => {
    return myStorage['hStorage'].get("hahahah")
  }).then( value => {
    console.log(`Do not exist : ${value}`);
  }).catch(error => console.log(`Error: ${JSON.stringify(error,null,20)}`))
});


//originating smart contract 
// InMemorySigner.fromSecretKey("insert_private_key_here")
// .then( theSigner =>{
//   Tezos.setProvider({signer: theSigner})
//   Tezos.contract.originate({
//     code : hStorage,
//     init :{ "prim": "Pair", "args": [ { "string": "tz1KiNkbiZFypXTPZEmn2U4xEsU5w5LZBXtW" }, [] ] },
//   })
// }).then(originationOp => {
//       console.log(`Waiting for confirmation of origination for ${originationOp.contractAddress}...`);
//       return originationOp.contract()
//     }).then (contract => {
//       console.log(`Origination completed.`);
//     }).catch(error => console.log(`Error: ${JSON.stringify(error, null, 2)}`));


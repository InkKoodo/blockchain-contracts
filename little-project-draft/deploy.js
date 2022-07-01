const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'amazing neutral shadow congress protect huge palace gas erosion ball tragic tilt',
  'https://rinkeby.infura.io/v3/5e10e4b09d3042b18a34d1fc5ca8eae4'
);

const web3 = new Web3(provider);

const deploy = async () => {
  // take accounts
  const accounts = await web3.eth.getAccounts();
  // create a contract
  try {
    console.log(accounts[0])
    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there']})
    .send({ from: accounts[0], gas: '1000000'});
    console.log('deployment done');

    console.log(result.options.address);
    provider.engine.stop();
  } catch (error) {
    console.log(error);
  };
  
};

deploy();
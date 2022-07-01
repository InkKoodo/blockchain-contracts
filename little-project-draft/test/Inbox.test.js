const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
const INITIAL_MESSAGE = 'Setup Message';

beforeEach(async () => {
  // if we call web3 always use await to wait for response!!!!!!
  accounts = await web3.eth.getAccounts();

  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: [INITIAL_MESSAGE]})
    .send({ from: accounts[0], gas: '1000000' })
})

describe('Inbox testing', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address) // check if value is exists 
  })

  it('has initial properties', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_MESSAGE);
  })

  it('can change message', async () => {
    //call change func
    await inbox.methods.setMessage('Message Changed').send({from: accounts[0]})

    //check is message had changed
    // whenever we use web3 (middleware for our provider) use await to wait for response
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Message Changed');
  });
})
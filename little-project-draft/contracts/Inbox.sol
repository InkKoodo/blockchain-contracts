pragma solidity ^0.4.17;
// linter warnings (red underline) about pragma version can igonored!

contract Inbox {
  string public message;

  function Inbox (string defaultMessage) {
    message = defaultMessage;
  }

  function setMessage(string newMessage) {
    message = newMessage;
  }
}

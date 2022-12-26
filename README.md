# Smart Contract


  //SPDX-License-Identifier: UNLICENSED
  pragma solidity ^0.8.7;

  contract NftTokenMint {
  
      address public minter;

      //Mappings
      // TokenId to Address
      mapping(uint256=>address) public tokenOwner;

      //Address to NFT Total
      mapping(address=>uint256) public ownedTokensBalance;

      //Events
      event Sent(address from, address to, uint256 tokenId);

      //Setting up the contract creator has a unique minter;
      constructor() {
          minter = msg.sender;
      }

      // Aux function to control if token already exists in mapping of this contract.
      function _exists(uint256 tokenId) public view returns(bool) {
          address owner = tokenOwner[tokenId];

          return owner != address(0);
      }

      // Function to mint a NFT anexing a owner to this token and adding a balance to address sender
      function mint(uint256 tokenId) public {
          require(!_exists(tokenId), "ERROR: Token already exist!");
          require(msg.sender == minter, "ERROR: You are not a minter!");

          tokenOwner[tokenId] = msg.sender;
          ownedTokensBalance[msg.sender] += 1;

      }

      // Function to check addres of token owner
      function _ownerOf(uint256 tokenId) internal view returns(address) {
          address owner = tokenOwner[tokenId];
          require(owner != address(0), "ERROR: Invalid token!");

          return owner;
      }

      // Functino to send a NFT to other owner
      function send(address receiver, uint256 tokenId) public {
          require(_ownerOf(tokenId) == msg.sender);
          require(receiver != address(0), "ERROR: Wrong receiver!");

          tokenOwner[tokenId] = receiver;
          ownedTokensBalance[receiver] += 1;
          ownedTokensBalance[msg.sender] -= 1;

          emit Sent(msg.sender, receiver, tokenId);
      }

  }

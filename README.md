The concept that I ended up doing was an educational cryptocurrency & math game you could implement into your LMS application, with a real, usable in-game NFT platform to view, buy and trade NFTS.

In CryptoZombies, each Zombie object created with CreateRandomZombie() was linked to a zombieId from _createZombie, which is mapped to an address. The mapping ownerZombieCount[] is then incremented. zombieToOwner[] links the newly created zombie to the address.  These mean that each new instance of zombies can later be added to the blockchain (recognized as owned by you). [More research needed]
However, in the backend CryptoZombies has images linked to the characters in the hashed zombieId, which allows for customization and then production of a unique zombie Token every time.


Fish.io is the project I am making, with the features of CryptoZombies and more, where each fish will be a unique token. The catch is that the math game will be the main part, where you have to answer the questions with increasing difficulty and once you've beat the level, you catch a new "fish". Additionally, the NFT platform will have a UI to track your fish, buy others using ETH and to trade your fish for others. This is a very expandable idea and covers many concepts learned within the course, though for this implementation it will cover just the basic mathematics module.


The Javascript + CSS + HTML front-end uses PIXI.js as a framework, due to its compatibility with WebGL 2, and its mutability in comparison to other rigid frameworks like GDevelop. Nonetheless, the solidity portion is still a work in-progress due to the nature of my project being a game which can only be built with clear functionality before even adding the NFT layer. I just completed the game logic, of over 2000 code lines (although highly simplified within Pixi.js framework), and I plan to complete the solidity portion within the week, tops. 

The point of the game is demonstrative, and can be expanded more upon with the use of NFTs and a microeconomy of users who trade them.


Currently Implementing these Solidity Functions:

View NFTs that were minted / earned during the game process

View the type of Fish(es) that the user owns


View total number of fish NFTs minted 


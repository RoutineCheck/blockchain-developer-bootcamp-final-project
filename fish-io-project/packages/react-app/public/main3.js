import * as PIXI from "pixi.js";
const {Howl, Howler} = require('howler');
export const app = new PIXI.Application({
  width: 1700,
  height: 900,
  transparent: false,
  antialias: true,
});
export const startBtnSpr = './Game Files/Sprites/GameSprites/StartGame.png'
export const startBtnOvrSpr ='./Game Files/Sprites/GameSprites/StartGameClicked.png'
export function globalFunction() {
let data;

const myForm = document.createElement("form");
myForm.setAttribute("method", "post");
myForm.setAttribute("action", "submit.php");
const csvFile = document.createElement("input");
csvFile.setAttribute("type", "file");
csvFile.setAttribute("accept", "file");
const inputFish = document.createElement("input");
inputFish.setAttribute("type", "text");
inputFish.setAttribute("name", "fishName");
inputFish.setAttribute("placeholder", "e.g. Big Fish");
var s = document.createElement("input");
s.setAttribute("type", "submit");
s.setAttribute("value", "Submit");

// Append the csvFile input to the form
myForm.append(csvFile); 

// Append the fish Name to the form
myForm.append(inputFish); 

// Append the button to the form
myForm.append(s); 

document.getElementsByTagName("body")[0].appendChild(myForm);


let fishName = "";
let fishNames = [];
let fishDetails = [];
let fishID;
const fishIDs = [];
let fishNamesTS;


myForm.addEventListener("submit", function (e) {
  e.preventDefault();

  fishName = document.getElementById("inputFish").value

  alert("Your fish name will be " + fishName);
  const input = csvFile.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;
    data = csvToArray(text);
  };

  reader.readAsText(input);
});



function csvToArray(str, delimiter = ",") {
  // slice from start of text to the first \n index
  // use split to create an array from string by delimiter
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

  // slice from \n index + 1 to the end of the text
  // use split to create an array of each MainFncsv value row
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");

  // Map the rows
  // split values from each row into an array
  // use headers.reduce to create an object
  // object properties derived from headers:values
  // the object passed as an element of the array
  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  // return the array
  return arr;
}



// NEW APPLICATION



app.renderer.backgroundColor = 0x23395D;





//Initialize Global Variables

const Graphics = PIXI.Graphics;



let maxSpeed = -24;
let minSpeed = -6;
let sIncrement = 1;

let gameEnded = false;
let gameWon = false;

let bkg;
let bkg2;

let bgBack;
let bgMiddle;
let bgFront;

let blueGroup;
let blueShadow;
let greyFish1;
let greyFish2;

let fgGrass1;
let fgGrass2;
let fgGrass3;

let fgBack;
let fgMiddle;
let fgFront;

let bgFish1;
let bgFish2;
let bgFish3;

let player;

let middle = 870;


let bgX = 0;
let bgF = 0;
let bgF2 = 0;
let bgH = 4370;
let bgSpeed = -5;


let buttonStarted = false;
let delayStart = false;


let loadingSprite;
let scores = [];
let score;
let scoreCounter = 0;

let board1;
let board2;
let board3;
let question;

let hookDown;
let hookUp = [];
let hookCombo = [];
let hookQs = [];
let hookQsR = [];
let hookQsW = [];
let hookQsvis = [false, false, false];
let hookQsRvis = [false, false, false];
let hooksCreated = false;
let hooksRemoved = false;
let hooksPlay = false;
let moveQAs = false;
let hookPosf;


//levels 
let hooksCalled = 0;
//Testing with 1-5 for now
let level1 = false;
let level2 = false;
let level3 = false;
let level4 = false;
let level5 = false;
let bossLevel = level5;
//Will create later

let level6 = false;
let level7 = false;
let level8 = false;
let level9 = false;
let level10 = false;
let levels = [];
let nextLevel = false;

//Boss Level Win (useful for high # of Levels)

let bossLevelWin = false;

//Question and Answer pairs, along with Correct Answer pairs
let pairQ1 = [];
let pairQ2 = [];
let pairQ3 = [];
let pairQ4 = [];
let pairQ5 = [];
let pairQuestions = [];


let cAnswer1 = "";
let cAnswer2 = "";
let cAnswer3 = "";
let cAnswer4 = "";
let cAnswer5 = "";
let correctAnswers = [];


//
// Fish Types
let fishTypes = ["GreyFish", "BlueFish", "OrangeFish"];
let randomType;
let randomTypes = [];
let numOfTypes = 3;

//Left/Right Arrow Counter to Display Different NFTS
let arrowCounter = 0;
// document.getElementById("myApp").style.cursor = "pointer";


// ALL STYLES

// TEXT STYLE: TITLE
const style = new PIXI.TextStyle({
  fontFamily: 'Montserrat',
  fontSize: 90,
  fill: 'deepskyblue',
  stroke: '#fffffff',
  strokeThickness: 4,
  dropShadow: true,
  dropShadowDistance: 10,
  dropShadowAngle: Math.PI / 2,
  dropShadowBlur: 4,
  dropShadowColor: '#000000'
});

//TEXT STYLE: GAME INSTRUCTIONS
const style1 = new PIXI.TextStyle({
  fontFamily: 'Montserrat',
  fontSize: 45,
  fill: 'white',
  stroke: '#fffffff',
  strokeThickness: 4,
  dropShadow: true,
  dropShadowDistance: 3,
  dropShadowAngle: Math.PI / 2,
  dropShadowBlur: 4,
  dropShadowColor: '#000000'
});

// SCORE STYLE
const style2 = new PIXI.TextStyle({
  fontFamily: 'Montserrat',
  fontSize: 45,
  fill: 'white',
  stroke: '#fffffff',
  wordWrap: true,
  wordWrapWidth: 900,
  strokeThickness: 4,
  dropShadow: true,
  dropShadowDistance: 3,
  dropShadowAngle: Math.PI / 2,
  dropShadowBlur: 4,
  dropShadowColor: '#000000'
});


//TEXT STYLE: QUESTION BOARD TEXT
const style3 = new PIXI.TextStyle({
  fontFamily: 'Helvetica',
  fontSize: 50,
  fontStyle: "italic",
  fill: 'orange',
  stroke: '#4a4a4a',
  strokeThickness: 3,
  // dropShadow: false,
  // dropShadowDistance: 10,
  // dropShadowAngle: Math.PI / 2,
  // dropShadowBlur: 4,
  // dropShadowColor: '#000000'
});

const style4 = new PIXI.TextStyle({
  fontFamily: 'Montserrat',
  fontSize: 45,
  fill: 'white',
  stroke: '#fffffff',
  strokeThickness: 4,
  // dropShadow: false,
  // dropShadowDistance: 10,
  // dropShadowAngle: Math.PI / 2,
  // dropShadowBlur: 4,
  // dropShadowColor: '#000000'
});


// START MENU CONTAINER: SCONTAINER
const sContainer = new PIXI.Container();

// GAME CONTAINER: xContainer
const xContainer = new PIXI.Container();

// HOOK CONTAINER: bContainer
const bContainer = new PIXI.Container();

// FOREGROUND GAME CONTAINER: fgContainer
const fgContainer = new PIXI.Container();

// GAME OVER CONTAINER: goContainer
const goContainer = new PIXI.Container();

// LOADING... CONTAINER: LCONTAINER

const lContainer = new PIXI.Container();

// GAME MENU CONTAINER: GMCONTAINER

const gmContainer = new PIXI.Container();
gmContainer.visible = false;


//ANIMATED SPRITES CONTAINER: ACONTAINER & BKG CONTAINER
const bkgContainer = new PIXI.Container();
const aContainer = new PIXI.Container();


// Background Filter

const bkgFilter = new Graphics();
bkgFilter.beginFill(0x0077BE, 0.25)
  // .lineStyle(4, 0xFFFFFF, 1)
  .drawRect(0, 0, app.screen.width, app.screen.height)
  .endFill();


//NFT WORK HERE

// NFT DISPLAY CONTAINER: nftContainer
const nftContainer = new PIXI.Container();
nftContainer.width = 1000;
nftContainer.height = 1000;
// NFT POPUP CONTAINER: popupContainer
const popupContainer = new PIXI.Container();
const popupInfo = new PIXI.Text('Your NFTs', style4);
popupInfo.position.set(780, 400);
popupInfo.style.wordWrap = false;
popupInfo.style.align = 'center';


//Currently the NFT consists of NFT name + type + image

const myNFTName = new PIXI.Text("", style2);
myNFTName.position.set(520, 700);
myNFTName.style.wordWrap = false;
// myNFTName.style.align = 'center';
myNFTName.visible = false;

const myNFTImage1 = new PIXI.Sprite.from("./Game Files/NFTs/greyFish.png");
// myNFTImage1.scale.set(0.5);
myNFTImage1.position.set(870, 690);
myNFTImage1.visible = false;
// myNFTImage1.anchor.set(0.5);
const myNFTImage2 = new PIXI.Sprite.from("./Game Files/NFTs/blueFish.png");
// myNFTImage2.scale.set(0.5);
myNFTImage2.position.set(870, 690);
myNFTImage2.visible = false;

// myNFTImage2.anchor.set(0.5);
const myNFTImage3 = new PIXI.Sprite.from("./Game Files/NFTs/orangeFish.png");
// myNFTImage3.scale.set(0.5);
myNFTImage3.position.set(870, 690);
myNFTImage3.visible = false;

const NFTImages = []
NFTImages.push(myNFTImage1, myNFTImage2, myNFTImage3);

// myNFTImage3.anchor.set(0.5);
console.log("fishName is: " + fishName.toString());


const myNFTMarket = new PIXI.Sprite.from("./Game Files/Sprites/GameSprites/BoxesShadow.png");
myNFTMarket.position.set(1370, 180);
myNFTMarket.angle = 1;
myNFTMarket.alpha = 0;

const myNFTbox = new PIXI.Sprite.from("./Game Files/Sprites/GameSprites/BoxShadow.png");
// myNFTbox.position.set(1270, 100);
myNFTbox.position.set(1372, 692);
myNFTbox.alpha = 0;
myNFTbox.angle = -2;

const myNFTInfo = new PIXI.Text('Earn NFTs to trade in-game.', style1);
myNFTInfo.alpha = 0;
myNFTInfo.position.set(650, 220);
// myNFTInfo.style.wordWrap = false;
// myNFTInfo.style.align = 'center';




const nftRect = new Graphics();
nftRect.beginFill(0x008B8B)
  .lineStyle(4, 0xFFFFFF, 1)
  .drawRect(380, 400, 980, 450)
  .endFill();



popupContainer.addChild(nftRect);
sContainer.addChild(myNFTMarket);
lContainer.addChild(myNFTbox);

popupContainer.addChild(popupInfo);

for (let i = 0; i < 3; i++) {
  popupContainer.addChild(NFTImages[i]);

}

popupContainer.addChild(myNFTName);
popupContainer.visible = false;

const viewButton = PIXI.Texture.from('./Game Files/Sprites/GameSprites/NFTs/viewNfTs.png');
const viewButtonOver = PIXI.Texture.from('./Game Files/Sprites/GameSprites/NFTs/viewNfTsClicked.png');

const rightButton = PIXI.Texture.from('./Game Files/Sprites/GameSprites/RightButton.png');
const rightButtonOver = PIXI.Texture.from('./Game Files/Sprites/GameSprites/RightButtonClicked.png');

const leftButton = PIXI.Texture.from('./Game Files/Sprites/GameSprites/LeftButton.png');
const leftButtonOver = PIXI.Texture.from('./Game Files/Sprites/GameSprites/LeftButtonClicked.png');

//ALL MUSIC(USING HOWL LIBRARY)
const technoMusic = new Howl({
  src: ['./Game Files/Music/technoMusic.wav'],
  loop: true,
  volume: 0.75
});

//ALL SFX (USING HOWL LIBRARY)
const buttonSFX = new Howl({
  src: ['./Game Files/Music/SFX/mixkit-quick-positive-video-game-notification-interface-265.wav']
});

const oceanSFX = new Howl({
  src: ['./Game Files/Music/SFX/mixkit-sinking-in-the-sea-1178-loop.wav'],
  loop: true
});

const hookSplashSFX = new Howl({
  src: ['./Game Files/Music/SFX/hookSplash.wav']

});

const hookRemoveSFX = new Howl({
  src: ['./Game Files/Music/SFX/hookRemove.wav']

});

const questionCorrectSFX = new Howl({
  src: ['./Game Files/Music/SFX/questionCorrect.mp3']

});

const fishObtainedSFX = new Howl({
  src: ['./Game Files/Music/SFX/fishObtained.mp3']

});

const togglePopupSFX = new Howl({
  src: ['./Game Files/Music/SFX/togglePopup.mp3']

});

//TITLE TEXT

const myTitle = new PIXI.Text('Fish.io', style);



myTitle.position.set(780, 100);
myTitle.style.wordWrap = false;
// myTitle.style.wordWrapWidth = 200;
myTitle.style.align = 'center';
lContainer.addChild(myTitle);



// GAME INSTRUCTIONS

const myInfo = new PIXI.Text("Use the Mouse to move & the Arrow keys to change speed. Escape the fishhooks!", style3);
myInfo.position.set(500, 100);
myInfo.style.wordWrap = true;
myInfo.style.wordWrapWidth = 700;

myInfo.style.align = 'center';
myInfo.visible = false;



//LEVEL WIN TEXTS
const correct = new PIXI.Text("" + " is Correct!", style1);
correct.position.set(900, 300);
correct.style.wordWrap = true;
correct.style.wordWrapWidth = 700;
correct.style.align = 'center';
correct.visible = false;

let myLevel = new PIXI.Text("Level: 1", style4);
myLevel.position.set(750, 50);
myLevel.style.wordWrap = false;
// myLevel.style.wordWrapWidth = 700;
myLevel.style.align = 'center';
myLevel.visible = false;

//TEXT: HIGH SCORE
let myHScore = new PIXI.Text("High Score", style2);

myHScore.position.set(800, 220);
myHScore.style.wordWrap = true;
myHScore.style.wordWrapWidth = 300;
myHScore.style.align = 'center';
myHScore.visible = false;
lContainer.addChild(myHScore);

sContainer.interactive = true;
sContainer.buttonMode = true;
// app.renderer.plugins.interaction.defaultCursorStyle = 'inherit';

const defaultIcon = "url('./Game Files/Sprites/GameSprites/BlueCursor.png'),auto";
const hoverIcon = "url('./Game Files/Sprites/GameSprites/BlueCursor.png'),auto";

app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;
app.renderer.plugins.interaction.cursorStyles.pointer = hoverIcon;


//GAME OVER DISPLAY BOX
const gameoverRect = new Graphics();
gameoverRect.beginFill(0x008B8B)
  .lineStyle(4, 0xFFFFFF, 1)
  .drawRect(700, 100, 400, 500)
  .endFill();


//GAME WIN DISPLAY BOX
const gamewinRect = new Graphics();
gamewinRect.beginFill(0xFFFFFF)
  .lineStyle(4, 0x000000, 3)
  .drawRect(700, 100, 400, 500)
  .endFill();




//ALL LOGICAL FUNCTIONS

//Function to get Random Number 

function setTsnRight(sprite, finalx, finaly) {
  if (sprite.visible == true) {
    // hookSplashSFX.play();
    if (sprite.x > finalx) {
      sprite.x -= 11.8;
    }
    if (sprite.alpha < 1) {
      sprite.alpha += 0.04;
    }
  }




}

function setTsnSlowR(sprite, finalx, finaly) {
  if (sprite.visible == true) {
    if (sprite.x > finalx) {
      sprite.x -= 10.8;
    }
    if (sprite.alpha < 1) {
      sprite.alpha += 0.04;
    }
  }
}






function setTsnSlowTR(sprite) {
  if (sprite.visible == true) {
    // if (sprite.y > finaly) {
    // sprite.y -= 2;
    // }
    if (sprite.alpha < 1) {
      sprite.alpha += 0.01;
    }
  }




}

function setTsnReset(sprite, finalx, finaly) {
  if (sprite.x != undefined) {
    sprite.x = finalx;
    // sprite.y = finaly;

    // if (sprite.y > finaly) {
    // sprite.y -= 2;
    // }
    sprite.alpha = 0;
  }


}

function setTsnTReset(sprite) {
  if (sprite.x != undefined) {

    // sprite.y = finaly;

    // if (sprite.y > finaly) {
    // sprite.y -= 2;
    // }
    sprite.alpha = 0;
  }


}


function getRandomInt(max) {
  randomType = Math.floor(Math.random() * max);
  return randomType;
}


//Function to Toggle Booleans
function toggleFlag(value) {
  var toggle = value ? false : true
  return toggle;


}

//FUnction to init question array variables

function initVars() {
  correctAnswers = [];
  pairQuestions = [];
}

//Function to reset  global variable values
function resetVars() {
  gameWon = false;
  bgX = 0;
  bgF = 0;
  bgF2 = 0;
  bgH = 4370;
  bgSpeed = -5;

  board1.visible = false;
  board2.visible = false;
  board3.visible = false;
  question.visible = false;

  rButton.visible = false;
  lButton.visible = false;

  for (let i = 0; i < 3; i++) {

    hookUp[i].visible = false;
    hookCombo[i].visible = false;
    hookQs[i].visible = false;
    hookQsR[i].visible = false;
    hookQsW[i].visible = false;
  }

  try {

    //reset hooks and question baord sprites
    for (let i = 0; i < 3; i++) {



      if (hookUp[i].playing) {
        hookUp[i].stop();
      }
      if (hookCombo[i].playing) {
        hookCombo[i].stop();
      }
      // if (hookQs[i].playing) {
      //     hookQs[i].stop();
      // }
      // if (hookQsR[i].playing) {
      //     hookQsR[i].stop();
      // }
      // if (hookQsW[i].playing) {
      //     hookQsW[i].stop();
      // }

    }
    //reset ticker speed related variables

  } catch (error) {
    console.log("Variables are not initialized");
  }
}



//Function to loop Game when level is won 

function onLevelWin() {

  scoreCounter += 100;

  if (level5 == true) {
    scoreCounter += 500;
  }
  questionCorrectSFX.play();
  // myLevel.visible = true;
  for (let i = 0; i < levels.length - 1; i++) {
    if (levels[i] == true) {
      console.log("Correct Answer!");
      console.log(levels.length);
      // myLevel.text = "Level: " + (i + 1);
      // console.log(myLevel.text + " Loaded")
      correct.text = correctAnswers[i].replace('*', '') + " is Correct!"


    }
  }


  let fn = levels.length - 1



  if (buttonStarted == true) {
    correct.visible = true;
    myLevel.visible = true;
    console.log("Level Loaded (delay)");

  }



  setTimeout(() => {
    for (let i = 0; i < 3; i++) {
      hookQsR[i].visible = false;
      hookQsW[i].visible = false;
      hookUp[i].visible = false;
    }; bgH = 4370; nextLevel = true; hookPlay(); correct.visible = false;
  }, 1000);



}

//Function to notify players upon winning the game
function loopOnGameWin() {
  onGameWin();

}
function onGameWin() {
  gameWon = true;
  console.log("Game Won!");
  // const regExf = new RegExp(/[^a-z0-9]/gi);
  // let fishNTrim = fishName.replace(/\s+/g, '');
  let minLength = 4;
  let maxLength = 9;
  let fName = '';
  let answer = ""


  if (fishName == "" || fishName == null || fishName.replace(/\s+/g, '') == '' || fishNames.includes(fishName) || fishName.length < minLength || fishName.length > maxLength) {




    while (fName == "" || fName.replace(/\s+/g, '') == '' || fishNames.includes(fName) || fName.length < minLength || fName.length > maxLength) {
      console.log(fName == "", fName.replace(/\s+/g, '') == '', fishNames.includes(fName), fName.length > maxLength)
      fName = window.prompt('Please provide a unique alphanumeric fishname between ' + minLength + ' - ' + maxLength + 'characters');
      if (fName == null) {
        answer = window.prompt("Do you want to continue without creating a fish NFT? Please enter 'Yes' or 'No'.");
        console.log(answer);

        if (answer == "Yes" || answer == "yes") {
          break;
        } else if (answer == "No" || answer == "no") {

          answer = "";
          fName = "";
          // loopOnGameWin();

        } else {
          break;
        }
      }

    }


    if (fName != null) {

      // fName += " - " + fishTypes[getRandomInt(fishTypes.length - 1)];

      fishName = fName;



      fishNames.push(fishName);

      fishDetails.push(fishName + " - " + fishTypes[getRandomInt(numOfTypes)]);

      // fishDetails = fishDetails.map(i => i + " - " + fishTypes[getRandomInt(numOfTypes)]);

      console.log("fishDetails" + randomType + "    " + randomType);
      fishNamesTS = fishDetails.join(' ');


      randomTypes.push(randomType);
      for (let i = 0; i < 3; i++) {
        NFTImages[i].visible = false;
      }
      arrowCounter = 0;
      myNFTName.text = fishDetails[arrowCounter];

      NFTImages[randomTypes[arrowCounter]].visible = true;

      fishObtainedSFX.play();

      alert("Hi " + fishName + ", Congrats! Your NFT is in your inventory. It's type is: " + fishTypes[randomType]);
    }
    arrowCounter = 0;


    miniOnGameEnd();
    miniRemoveHQs();



    gmContainer.visible = false;
    sContainer.visible = true;
    hookSplashSFX.play();
    lContainer.visible = true;
    nftContainer.visible = true;
    // popupContainer.visible = true;
    goContainer.visible = false;
    bContainer.visible = false;
    myNFTName.visible = true;



    document.getElementById("myForm").style.display = 'block';




  } else {

    fishNames.push(fishName);
    fishObtainedSFX.play();
    alert("Hi " + fishName + ", Congrats! Your NFT is in your inventory. It's type is: " + fishTypes[randomType]);
    console.log("Validated Names!");
    miniOnGameEnd();
    miniRemoveHQs();

    gmContainer.visible = false;
    sContainer.visible = true;
    hookSplashSFX.play();
    lContainer.visible = true;
    nftContainer.visible = true;
    popupContainer.visible = true;
    goContainer.visible = false;
    bContainer.visible = false;
    myNFTName.visible = true;


    document.getElementById("myForm").style.display = 'none';



  }




  console.log("You Won! See your high score.");
  console.log(fishNames.toString());
}


//Function for on Game End (if player did not lose)
function miniOnGameEnd() {
  resetVars();

  buttonStarted = false;
  gameEnded = true;
  score.visible = false;
  myLevel.visible = false;
  correct.visible = false;
  question.visible = false;
  goContainer.visible = false;

  bContainer.visible = false;




  hooksCalled = 0;
  level1 = false;
  level2 = false;
  level3 = false;
  level4 = false;
  level5 = false;
  levels = [];

  cAnswer1 = "";
  cAnswer2 = "";
  cAnswer3 = "";
  cAnswer4 = "";
  cAnswer5 = "";
  // correctAnswers = [];

  // pairQuestions = [];

}

//Function for on Game End (if player lost)
function onGameEnd() {
  resetVars();
  buttonStarted = false;
  gameEnded = true;

  gameEnd();

  gmContainer.visible = false;
  score.visible = false;
  myLevel.visible = false;
  question.visible = false;
  goContainer.visible = true;
  const gameOver = new PIXI.Text("Game Over!", style1);
  gameOver.position.set(800, 100);
  gameOver.style.wordWrap = true;
  gameOver.style.wordWrapWidth = 700;
  gameOver.style.align = 'center';

  app.stage.addChild(goContainer);
  bContainer.visible = false;
  goContainer.addChild(gameoverRect);
  goContainer.addChild(gameOver);
  goContainer.addChild(button5);
  goContainer.addChild(button6);

  delayStart = false;

  hooksCalled = 0;
  level1 = false;
  level2 = false;
  level3 = false;
  level4 = false;
  level5 = false
  levels = [];

  cAnswer1 = "";
  cAnswer2 = "";
  cAnswer3 = "";
  cAnswer4 = "";
  cAnswer5 = "";
  // correctAnswers = [];

  // pairQuestions = [];


}
// FUNCTIONS TO CREATE AND RETRIEVE SCORES
function getScore(message) {
  score = new PIXI.Text(message.toString(), style2);

  score.position.set(800, 100);

  return score;
}

function updateScore(message) {
  score.text = message.toString();
}


//FUNCTION TO CHECK IF NUM IS IN RANGE
function between(x, min, max) {
  return x >= min && x <= max;
}

//FUNCTION TO CHECK IF ARRAYS ARE FULLY TRUE
let checker = arr => arr.includes(true);


//Function to Set Level

function returnLevel() {

  console.log("Returning Level");

  if (hooksCalled == 1) {
    level1 = true;
    level2 = false;
    level3 = false;
    level4 = false;
    level5 = false;
    console.log("")

    console.log("Level 1");
  }
  else if (hooksCalled == 2) {
    level1 = false;
    level2 = true;
    level3 = false;
    level4 = false;
    level5 = false;
    console.log("Level 2");
  }
  else if (hooksCalled == 3) {
    level1 = false;
    level2 = false;
    level3 = true;
    level4 = false;
    level5 = false

    console.log("Level 3");
  }
  else if (hooksCalled == 4) {
    level1 = false;
    level2 = false;
    level3 = false;
    level4 = true;
    level5 = false;

    console.log("Level 4");
  }
  else if (hooksCalled == 5) {
    level1 = false;
    level2 = false;
    level3 = false;
    level4 = false;
    level5 = true;
  } else if (hooksCalled == 6) {
    level1 = false;
    level2 = false;
    level3 = false;
    level4 = false;
    level5 = false;

    console.log("About to return win!")

    onGameWin();


  } else {
    console.log("No Level");
  }

  levels = [level1, level2, level3, level4, level5];

  console.log("Hooks called = " + hooksCalled);
  console.log("Level 1 = true?" + level1);
  console.log("Level 2 = true?" + level2);
  console.log("Level 3 = true?" + level3);
  console.log("Level 4 = true?" + level4);
  console.log("Level 5 = true?" + level5);
  console.log("Level 1 = true?" + level1);
  console.log("Level 2 = true?" + level2);
  console.log("Level 3 = true?" + level3);
  console.log("Level 4 = true?" + level4);
  console.log("Level 5 = true?" + level5);
  console.log(gameEnded);
}

//Function to return data from file into N arrays of strings (One per question)

function returnQAnswers() {
  let qaList = [];
  let newList = [];
  let tempList;

  for (let i = 0; i < Object.keys(data).length; i++) {
    // for (key in datakeys) {
    let datavalues = data[Object.keys(data)[i]];
    for (const values in datavalues) {
      if (`${datavalues[values]}` !== 'undefined') {
        console.log(typeof (`${datavalues[values]}`) == 'string');
        qaList.push(`${datavalues[values]}`);
        console.log("qaList" + qaList);
      }
    }

  }
  for (const value in qaList) {
    tempList = `${qaList[value]}`
    console.log("tempList" + tempList);
    newList.push(tempList);
  }
  try {



    console.log("newList = " + newList);

    pairQ1 = newList.slice(0, 4);
    pairQ2 = newList.slice(4, 8);
    pairQ3 = newList.slice(8, 12);
    pairQ4 = newList.slice(12, 16);
    pairQ5 = newList.slice(16, 20);



  } catch (err) { "undefined pairs" }

  for (let i = 0; i < pairQ1.length; i++) {
    if (pairQ1[i].indexOf('*') > -1) {
      cAnswer1 = pairQ1[i];
      pairQ1[i] = pairQ1[i].replace('*', '');
    }
  }

  for (let i = 0; i < pairQ2.length; i++) {
    if (pairQ2[i].indexOf('*') > -1) {
      cAnswer2 = pairQ2[i];
      pairQ2[i] = pairQ2[i].replace('*', '');
    }
  }

  for (let i = 0; i < pairQ3.length; i++) {
    if (pairQ3[i].indexOf('*') > -1) {
      cAnswer3 = pairQ3[i];
      pairQ3[i] = pairQ3[i].replace('*', '');
    }
  }
  for (let i = 0; i < pairQ4.length; i++) {
    if (pairQ4[i].indexOf('*') > -1) {
      cAnswer4 = pairQ4[i];
      pairQ4[i] = pairQ4[i].replace('*', '');
    }
  }
  for (let i = 0; i < pairQ5.length; i++) {
    if (pairQ5[i].indexOf('*') > -1) {
      cAnswer5 = pairQ5[i];
      pairQ5[i] = pairQ5[i].replace('*', '');
    }
  }



  // console.log(pairQ1);
  // console.log(pairQ2);
  // console.log(pairQ3);
  // console.log(pairQ4);


}




//Function to create Question Sprites from Inputted Questions
function getQandA(m1, m2, m3, q) {

  board1 = new PIXI.Text(m1.toString(), style3);
  board2 = new PIXI.Text(m2.toString(), style3);
  board3 = new PIXI.Text(m3.toString(), style3);
  question = new PIXI.Text(q.toString(), style3);

  board1.position.set(800, 100);
  board2.position.set(800, 400);
  board3.position.set(800, 700);
  question.position.set(500, 200);

  bContainer.addChild(board1);
  bContainer.addChild(board2);
  bContainer.addChild(board3);

  question.visible = true;
  // console.log(board1.text, board2.text, board3.text, question.text);
  // console.log("boards: ", board1, "boards2" + board2);
  return board1, board2, board3, question;
}

function updateQandA(m1, m2, m3, q) {
  bContainer.visible = true;
  console.log("bcontainer.visible = " + bContainer.visible);
  console.log("board1 =" + board1);
  board1.visible = true;
  board2.visible = true;
  board3.visible = true;
  question.visible = true;
  board1.text = m1.toString();
  board2.text = m2.toString();
  board3.text = m3.toString();
  question.text = q.toString();


}




//ALL BUTTON LOGIC


// START BUTTON


const startButton = PIXI.Texture.from(startBtnSpr);
const startButtonOver = PIXI.Texture.from(startBtnOvrSpr);



const button1 = new PIXI.Sprite(startButton);

button1.buttonMode = true;

button1.anchor.set(0.5);
button1.x = 200;
button1.y = 200;

// make the button interactive...
button1.interactive = true;
button1.buttonMode = true;

button1

  .on('pointerdown', onButtonDown)
  .on('pointerup', onButtonUp)
  .on('pointerupoutside', onButtonUp)
  .on('pointerover', onButtonOver)
  .on('pointerout', onButtonOut);


// add it to the stage
sContainer.addChild(button1);




// HIGH SCORE BUTTON

const hscoreButton = PIXI.Texture.from('./Game Files/Sprites/GameSprites/HighScore.png')
const hscoreButtonOver = PIXI.Texture.from('./Game Files/Sprites/GameSprites/HighScoreClicked.png')



const button2 = new PIXI.Sprite(hscoreButton);

button2.buttonMode = true;

button2.anchor.set(0.5);
button2.x = 200;
button2.y = 400;

button2.interactive = true;
button2.buttonMode = true;

button2

  .on('pointerdown', onButtonDown)
  .on('pointerup', onButtonUp)
  .on('pointerupoutside', onButtonUp)
  .on('pointerover', onButtonOver)
  .on('pointerout', onButtonOut);



sContainer.addChild(button2);


// HOME BUTTON

const homeButton = PIXI.Texture.from('./Game Files/Sprites/GameSprites/Home2.png')
const homeButtonOver = PIXI.Texture.from('./Game Files/Sprites/GameSprites/Home2Clicked2.png')

const homeButton2 = PIXI.Texture.from('./Game Files/Sprites/GameSprites/Home2.png')
const homeButtonOver2 = PIXI.Texture.from('./Game Files/Sprites/GameSprites/Home2Clicked2.png')


const button3 = new PIXI.Sprite(homeButton);

button3.buttonMode = true;

button3.anchor.set(0.5);
button3.x = 1600;
button3.y = 100;

button3.interactive = true;
button3.buttonMode = true;

button3

  .on('pointerdown', onButtonDown)
  .on('pointerup', onButtonUp)
  .on('pointerupoutside', onButtonUp)
  .on('pointerover', onButtonOver)
  .on('pointerout', onButtonOut);



gmContainer.addChild(button3);


// RESET BUTTON


const resetButton = PIXI.Texture.from('./Game Files/Sprites/GameSprites/Reset2.png')
const resetButtonOver = PIXI.Texture.from('./Game Files/Sprites/GameSprites/ResetClicked2.png')

const resetButton2 = PIXI.Texture.from('./Game Files/Sprites/GameSprites/Reset2.png')
const resetButtonOver2 = PIXI.Texture.from('./Game Files/Sprites/GameSprites/ResetClicked2.png')



const button4 = new PIXI.Sprite(resetButton);

button4.buttonMode = true;

button4.anchor.set(0.5);
button4.x = 1500;
button4.y = 100;

button4.interactive = true;
button4.buttonMode = true;

button4

  .on('pointerdown', onButtonDown)
  .on('pointerup', onButtonUp)
  .on('pointerupoutside', onButtonUp)
  .on('pointerover', onButtonOver)
  .on('pointerout', onButtonOut);


gmContainer.addChild(button4);




// GAME OVER - HOME BUTTON

const button5 = new PIXI.Sprite(homeButton2);

button5.buttonMode = true;

button5.anchor.set(0.5);
button5.x = 900;
button5.y = 250;
button5.scale.set(1.5, 1.5);

button5.interactive = true;
button5.buttonMode = true;

button5

  .on('pointerdown', onButtonDown)
  .on('pointerup', onButtonUp)
  .on('pointerupoutside', onButtonUp)
  .on('pointerover', onButtonOver)
  .on('pointerout', onButtonOut);










const button6 = new PIXI.Sprite(resetButton2);

button6.buttonMode = true;

button6.anchor.set(0.5);
button6.x = 900;
button6.y = 450;
button6.scale.set(1.5, 1.5);

button6.interactive = true;
button6.buttonMode = true;

button6

  .on('pointerdown', onButtonDown)
  .on('pointerup', onButtonUp)
  .on('pointerupoutside', onButtonUp)
  .on('pointerover', onButtonOver)
  .on('pointerout', onButtonOut);









const nftButton = new PIXI.Sprite(viewButton);



nftButton.buttonMode = true;

nftButton.anchor.set(0.5);
nftButton.scale.set(0.75, 1.05);
nftButton.angle = 3;
nftButton.x = 1820;
nftButton.y = 290;
nftButton.alpha = 0;

// make the button interactive...
nftButton.interactive = true;
nftButton.buttonMode = true;

nftButton
  // Mouse & touch events are normalized into
  // the pointer* events for handling different
  // button1 events.
  .on('pointerdown', onButtonDown)
  .on('pointerup', onButtonUp)
  .on('pointerupoutside', onButtonUp)
  .on('pointerover', onButtonOver)
  .on('pointerout', onButtonOut);


lContainer.addChild(myNFTInfo);

nftContainer.addChild(nftButton);


const rButton = new PIXI.Sprite(rightButton);

rButton.buttonMode = true;

rButton.anchor.set(0.5);
rButton.position.set(1280, 650);
rButton.scale.set(0.7, 0.7);

// make the button interactive...
rButton.interactive = true;
rButton.buttonMode = true;
rButton.visible = false;

rButton
  // Mouse & touch events are normalized into
  // the pointer* events for handling different
  // button1 events.
  .on('pointerdown', onButtonDown)
  .on('pointerup', onButtonUp)
  .on('pointerupoutside', onButtonUp)
  .on('pointerover', onButtonOver)
  .on('pointerout', onButtonOut);



popupContainer.addChild(rButton);


const lButton = new PIXI.Sprite(leftButton);

lButton.buttonMode = true;

lButton.anchor.set(0.5);
lButton.position.set(450, 650);
lButton.scale.set(0.7, 0.7);
// make the button interactive...
lButton.interactive = true;
lButton.buttonMode = true;
lButton.visible = false;
lButton
  // Mouse & touch events are normalized into
  // the pointer* events for handling different
  // button1 events.
  .on('pointerdown', onButtonDown)
  .on('pointerup', onButtonUp)
  .on('pointerupoutside', onButtonUp)
  .on('pointerover', onButtonOver)
  .on('pointerout', onButtonOut);



popupContainer.addChild(lButton);



function onButtonDown() {

  this.isdown = true;

  if (this == button1) {
    this.texture = startButton;
    if (typeof (data) == 'undefined') {
      alert("Please enter a valid CSV file!")
    } else {
      initVars();
      buttonSFX.play();


      document.getElementById("myForm").style.display = 'none';


      gameEnded = false;

      myLevel.visible = false;
      returnQAnswers();

      pairQuestions.push(pairQ1, pairQ2, pairQ3, pairQ4, pairQ5);
      correctAnswers.push(cAnswer1, cAnswer2, cAnswer3, cAnswer4, cAnswer5);

      // console.log(pairQ1, pairQ2, cAnswer1, cAnswer2);

      console.log("correctAnswers.length" + correctAnswers.length);
      console.log("levels.length" + levels.length);
      console.log(pairQ1.length)


      sContainer.visible = false;
      lContainer.visible = false;
      loadingSprite.visible = true;
      player.visible = true;
      delayStart = true;
      bkg.visible = false;
      bkg2.visible = true;
      myInfo.visible = true;
      nftContainer.visible = false;
      popupContainer.visible = false;
      onGameStart();

      player.position.set(app.view.width / 2, app.view.height / 2);

      setTimeout(function () {
        gmContainer.visible = true;
        buttonStarted = true;
        loadingSprite.visible = false;
        myInfo.visible = false;
        //Score should be visible and update when question is answered correctly
        score.visible = true;
        createHookQs();
        myLevel.visible = true;

      }, 4000);

    }
  } else if (this == button2) {
    togglePopupSFX.play();
    this.texture = hscoreButton;
    myHScore.visible = toggleFlag(myHScore.visible);
    myNFTInfo.alpha = 1;
    myNFTInfo.visible = toggleFlag(myNFTInfo.visible);



  } else if (this == button3) {

    buttonSFX.play();
    miniOnGameEnd();
    miniRemoveHQs();
    this.texture = homeButton;
    gmContainer.visible = false;
    sContainer.visible = true;
    hookSplashSFX.play();
    lContainer.visible = true;

    nftContainer.visible = true;
    popupContainer.visible = false;

    goContainer.visible = false;
    bContainer.visible = false;
    nftContainer.visible = true;
    popupContainer.visible = true;
    myLevel.visible = false;



    document.getElementById("myForm").style.display = 'block';


  } else if (this == button4) {
    togglePopupSFX.play();
    miniOnGameEnd();
    miniRemoveHQs();
    goContainer.visible = false;
    bContainer.visible = false;
    this.texture = resetButton;
    myLevel.visible = false;
    initVars();

    returnQAnswers();

    pairQuestions.push(pairQ1, pairQ2, pairQ3, pairQ4, pairQ5);
    correctAnswers.push(cAnswer1, cAnswer2, cAnswer3, cAnswer4, cAnswer5);
    console.log(pairQ1, pairQ2, cAnswer1, cAnswer2);
    console.log("correctAnswers.length" + correctAnswers.length);
    console.log("levels.length" + levels.length);

    loadingSprite.visible = true;
    player.visible = true;
    delayStart = true;
    bkg.visible = false;
    bkg2.visible = true;
    myInfo.visible = true;
    player.position.set(app.view.width / 2, app.view.height / 2);
    onGameStart();


    setTimeout(function () {

      gmContainer.visible = true;
      buttonStarted = true;
      loadingSprite.visible = false;
      myInfo.visible = false;
      //Score should be visible and update when question is answered correctly
      score.visible = true;
      createHookQs();
      myLevel.visible = true;
      gameEnded = false;


    }, 4000);



  } else if (this == button5) {
    miniOnGameEnd();
    miniRemoveHQs();
    buttonSFX.play();
    this.texture = homeButton2;
    gmContainer.visible = false;
    sContainer.visible = true;
    hookSplashSFX.play();
    lContainer.visible = true;
    nftContainer.visible = true;
    popupContainer.visible = false;
    goContainer.visible = false;
    bContainer.visible = false;
    myLevel.visible = false;


    document.getElementById("myForm").style.display = 'block';



  } else if (this == button6) {
    togglePopupSFX.play();
    miniRemoveHQs();
    goContainer.visible = false;
    bContainer.visible = false;
    this.texture = resetButton2;

    xContainer.addChild(myLevel);
    myLevel.visible = false;
    initVars();
    returnQAnswers();
    console.log("correctAnswers.length" + correctAnswers.length);
    console.log("levels.length" + levels.length);
    console.log(pairQ1.length)

    pairQuestions.push(pairQ1, pairQ2, pairQ3, pairQ4, pairQ5);
    correctAnswers.push(cAnswer1, cAnswer2, cAnswer3, cAnswer4, cAnswer5);
    console.log("pairslog" + pairQ1, pairQ2, pairQ3, pairQ4, pairQ5);


    loadingSprite.visible = true;
    player.visible = true;
    delayStart = true;
    bkg.visible = false;
    bkg2.visible = true;
    myInfo.visible = true;
    player.position.set(app.view.width / 2, app.view.height / 2);
    onGameStart();

    setTimeout(function () {
      gmContainer.visible = true;
      buttonStarted = true;
      loadingSprite.visible = false;
      myInfo.visible = false;
      //Score should be visible and update when question is answered correctly
      score.visible = true;
      createHookQs();
      myLevel.visible = true;
      gameEnded = false;


    }, 4000);

  } else if (this == nftButton) {
    togglePopupSFX.play();
    this.texture = viewButtonOver;
    popupContainer.visible = toggleFlag(popupContainer.visible);
    rButton.visible = toggleFlag(rButton.visible);
    lButton.visible = toggleFlag(lButton.visible);
    console.log("Rbutton is !visible" + rButton.visible);
  } else if (this == rButton) {
    if (fishDetails.length > 1 && arrowCounter >= 0 && arrowCounter < fishDetails.length - 1) {
      NFTImages[randomTypes[arrowCounter]].visible = false;
      arrowCounter += 1;
      NFTImages[randomTypes[arrowCounter]].visible = true;
      myNFTName.text = fishDetails[arrowCounter];
      console.log("aC" + arrowCounter + "  " + randomTypes);

    }
    togglePopupSFX.play();
    this.texture = rightButtonOver;

  } else if (this == lButton) {
    if (fishDetails.length > 1 && arrowCounter > 0) {
      NFTImages[randomTypes[arrowCounter]].visible = false;
      arrowCounter -= 1;
      NFTImages[randomTypes[arrowCounter]].visible = true;
      myNFTName.text = fishDetails[arrowCounter];
      console.log("aC" + arrowCounter + "  " + randomTypes)

    }
    togglePopupSFX.play();
    this.texture = leftButtonOver;

  }
  // buttonSFX.play();

  this.alpha = 1;
}


//Function when Button is Released
function onButtonUp() {
  this.isdown = false;
  if (this.isOver) {
    if (this == button1) {
      this.texture = startButton;
    } else if (this == button2) {
      this.texture = hscoreButton;
    } else if (this == button3) {
      this.texture = homeButton;
    } else if (this == button4) {
      this.texture = resetButton;
    } else if (this == button5) {
      this.texture = homeButton2;
    } else if (this == button6) {
      this.texture = resetButton2;
    } else if (this == nftButton) {
      this.texture = viewButton
    } else if (this == rButton) {
      this.texture = rightButton;
    } else if (this == lButton) {
      this.texture = leftButton;
    }
  }
  else {
    if (this == button1) {
      this.texture = startButton;
    } else if (this == button2) {
      this.texture = hscoreButton;
    } else if (this == button3) {
      this.texture = homeButton;
    } else if (this == button4) {
      this.texture = resetButton;
    } else if (this == button5) {
      this.texture = homeButton2;
    } else if (this == button6) {
      this.texture = resetButton2;
    } else if (this == nftButton) {
      this.texture = viewButton
    } else if (this == rButton) {
      this.texture = rightButton;
    } else if (this == lButton) {
      this.texture = leftButton;
    }

  }
}

//Function when Button is Hovered Over

function onButtonOver() {
  this.isOver = true;
  if (this.isdown) {
    return;
  }
  if (this == button1) {
    this.texture = startButtonOver;
  } else if (this == button2) {
    this.texture = hscoreButtonOver;
  } else if (this == button3) {
    this.texture = homeButtonOver;
  } else if (this == button4) {
    this.texture = resetButtonOver;
  } else if (this == button5) {
    this.texture = homeButtonOver2;
  } else if (this == button6) {
    this.texture = resetButtonOver2;
  } else if (this == nftButton) {
    this.texture = viewButtonOver
  } else if (this == rButton) {
    this.texture = rightButtonOver;
  } else if (this == lButton) {
    this.texture = leftButtonOver;
  }


}

//Function when Button is not Hovered Over

function onButtonOut() {
  this.isOver = false;
  if (this.isdown) {
    return;
  }
  if (this == button1) {
    this.texture = startButton;
  } else if (this == button2) {
    this.texture = hscoreButton;
  } else if (this == button3) {
    this.texture = homeButton;
  } else if (this == button4) {
    this.texture = resetButton;
  } else if (this == button5) {
    this.texture = homeButton2;
  } else if (this == button6) {
    this.texture = resetButton2;
  } else if (this == nftButton) {
    this.texture = viewButton
  } else if (this == rButton) {
    this.texture = rightButton;
  } else if (this == lButton) {
    this.texture = leftButton;
  }

}
// LOADER 


app.loader.baseUrl = "./Game Files/Sprites/backgroundItems/BackgroundItems/Final";
app.loader

  //Background Sprites
  .add("bgBack", "/Shadows/foliageShadow.png")
  .add("bgMiddle", "/Shadows/RaggedRockShadow.png")
  .add("bgFront", "/Shadows/coralReef2Shadow.png")
  .add("fgBack", "foliage.png")
  //Background Animated Sprites
  .add("blueGroup", "/Shadows/BlueGroup/BlueGroup-0.json")
  .add("blueShadow", "/Shadows/BlueShadow/BlueShadow.json")
  .add("greyFish1", "/Shadows/GreyFish1/GreyShadow.json")
  .add("greyFish2", "/Shadows/GreyFish2/GreyNShadow.json")
  //Foreground Sprites
  .add("fgMiddle", "coralReef2.png")
  .add("fgFront", "RaggedRock.png")
  .add("fgGrass1", "foregroundGrass1.png")
  .add("fgGrass2", "foregroundGrass2.png")
  .add("fgGrass3", "foregroundGrass3.png")
  //Backgrounds
  .add("bkg", "MidOceanB.png")
  .add("bkg2", "MidOcean.png")
  // Player Sprite
  .add("player", "/BlueFishS/BlueFish2.json")
  //Game Sprites   
  .add("hookQs", "/Hook/hookQuestion.png")
  .add("hookQsR", "/Hook/HQR/HQR-0.json")
  .add("hookQsW", "/Hook/HQW/HQW-0.json")
  .add("loadingSprite", "/LoadingS/LoadingS.json")
  .add("hookDown", "/Hook/HookD/HookD.json")
  .add("hookUp", "/Hook/HookU/HookU.json")

  .add("hookCombo", "/Hook/HookDC/HookDC.json")





app.loader.onComplete.add(initLevel)


// app.loader.load(setup);

// function setup() {
//     const bfTextures = [];
//     for (let i = 0; i < 16; i++) {
//         const texture = PIXI.Texture.from(`./Game Files/Sprites/backgroundItems/BackgroundItems/Final/BlueFishS/bluefish_${i}.png`);
//         bfTextures.push(texture);
//     }
//     player = new PIXI.AnimatedSprite(bfTextures);
//     player.position.set(800, 300);
//     player.scale.set(1,1);
//     player.animationSpeed = 1; 
//     player.play();
// }

app.loader.load();

// function updateBg() {
//     bgX = (bgX + bgSpeed);
//     bgFront.tileposition.x = bgX;
//     bgMiddle.tileposition.x = bgX / 2;
//     bgBack.tileposition.x = bgX / 4;
// }

//mouse interactions
app.stage.interactive = true;
app.stage.on("pointermove", movePlayer);

let playerReset = false;
let timeout;


function movePlayer(e) {
  clearTimeout(timeout);
  let pos = e.data.global;
  // if (player != undefined) {

  // let diffY = pos.y - player.y



  if (delayStart == true) {
    player.angle = 0;


  }
  if (buttonStarted == true) {

    let angle1 = Math.atan2(pos.y, 1200) * (180 / Math.PI);

    let angle2 = Math.atan2(player.y, 1200) * (180 / Math.PI);


    function rotatePlayer() {


      // if ((Math.abs(angle1 - angle2) * 20) < 35) {
      //     player.angle = (angle1 - angle2) * 22;
      //     console.log("Player Angle" + player.angle);
      // }

      if (between((Math.abs(angle1 - angle2) * 20), 0, 0.5)) {
        player.angle = (angle1 - angle2);

      } else if (between((Math.abs(angle1 - angle2) * 20), 0.5, 1)) {
        player.angle = (angle1 - angle2) * 1.5;

      } else if (between((Math.abs(angle1 - angle2) * 20), 1, 2.5)) {
        player.angle = (angle1 - angle2) * 2;

      } else if (between((Math.abs(angle1 - angle2) * 20), 2, 3)) {
        player.angle = (angle1 - angle2) * 4;

      } else if (between((Math.abs(angle1 - angle2) * 20), 3, 5)) {
        player.angle = (angle1 - angle2) * 7;

      } else if (between((Math.abs(angle1 - angle2) * 20), 5, 8)) {
        player.angle = (angle1 - angle2) * 10;

      } else if (between((Math.abs(angle1 - angle2) * 20), 9, 12)) {
        player.angle = (angle1 - angle2) * 12;

      } else if (between((Math.abs(angle1 - angle2) * 20), 12, 16)) {
        player.angle = (angle1 - angle2) * 13;

      } else if (between((Math.abs(angle1 - angle2) * 20), 16, 20)) {
        player.angle = (angle1 - angle2) * 14;

      } else if (between((Math.abs(angle1 - angle2) * 20), 20, 30)) {
        player.angle = (angle1 - angle2) * 15;


      } else if (between((Math.abs(angle1 - angle2) * 20), 30, 35)) {
        player.angle = (angle1 - angle2) * 16;

      }
      console.log("Player Angle" + player.angle);

    }

    player.y = pos.y;

    playerReset = true;
    console.log("Pivot X: " + player.pivot.x);
    console.log("Pivot Y: " + player.pivot.y);



    console.log("Pos Y: " + pos.y);
    console.log("Pos X: " + pos.x);


    rotatePlayer();

    // if ((Math.abs(angle1 - angle2) * 20) < 35) {
    //     // player.angle = (angle1 - angle2) * 22;
    //     // console.log("Player Angle" + player.angle);
    // }


    // if (playerReset == false) {
    //     setTimeout(() => {
    //         rotatePlayer();
    //     }, 500)
    // }


    // timeout = setTimeout(function () {


    //     player.angle = 0;
    // }, 100);

  }
  if (gameEnded == true) {
    player.angle = 0;
  }


}
// LOOP FUNCTION
function gameLoop(delta) {

  updateBg();

}


// LOADER LOOP / GAME UPDATE LOOP

function updateBg() {

  // console.log(delayStart == true)
  hookPosf = (bgH / 3) + 30;

  console.log("ButtonStarted = " + buttonStarted);
  if (buttonStarted == true) {
    setTsnReset(myNFTbox, 1472);
    setTsnReset(nftButton, 1620);
    setTsnReset(myNFTMarket, 1370);
    setTsnTReset(myNFTInfo);



    console.log("myNFTbox X: " + myNFTbox.x)
    bgH = (bgH + bgSpeed);
    // scoreCounter += 1;

    // console.log(hookPosf);
    // console.log(bgH);
    // console.log("bgH counter" + bgH);
    updateScore(scoreCounter);



    if (hooksPlay == true && moveQAs == false && gameWon == false && gameEnded == false) {


      if (bgH < 2422) {
        console.log("hookQs x " + hookQs[0].x);

        removeHookQs();
      }
      // console.log(moveQAs);
    }

    if (bgH > -1200) {
      // for (let i = 1; i < 3; i++) {


      //     if (hookQs[i-1].x > -1200) {
      //         hookCombo[i-1].x = (bgH / 3) + (30 * i);
      //         hookQs[i-1].x = (bgH / 3)  + (30 * i)

      //     } else {
      //         bgH = 4370; 
      //         hookCombo[i-1].x = (bgH / 3) + (30 * i);
      //         hookQs[i-1].x = (bgH / 3)  + (30 * i)

      //         }
      //     }
      if (hooksCreated == true) {
        try {
          for (let i = 0; i < 3; i++) {


            if (hookQs[i].visible == true) {
              hookQsvis[i] = true;
            } else {
              hookQsRvis[i] = false;
            }


            if (hookQsR[i].visible == false) {
              hookQsRvis[i] = true;
            } else {
              hookQsRvis[i] = false;
            }


          }

          for (let i = 0; i < 3; i++) {

            // console.log(hooksRemoved);


            hookCombo[i].x = (bgH / 3) + 120 - (28 * (i + 1));
            hookQs[i].x = (bgH / 3) + (30 * (i + 1));


            // console.log(hookCombo[i]);
            // console.log("HookCombo Pos: " + hookCombo[i].x);



          }

          if (moveQAs == true) {

            for (let i = 0; i < 3; i++) {
              // console.log("HookQsR Pos: " + hookQsR[i].x);
              hookQsR[i].x = (bgH / 3) + (30 * (i + 1));
              hookQsW[i].x = (bgH / 3) + (30 * (i + 1));
            }
            // console.log("hookQsR Pos:" + hookQsR[0].x + 40);
          }
          if (checker(hookQsvis)) {
            console.log("QSvis" + checker(hookQsvis));
            bContainer.visible = true;
            // board1.visible = true;
            // board2.visible = true;
            // board3.visible = true;
            // question.visible = true;

            board1.x = hookQs[0].x + 35;
            board2.x = hookQs[1].x + 35;
            board3.x = hookQs[2].x + 35;

            board1.y = hookQs[0].y + 55;
            board2.y = hookQs[1].y + 55;
            board3.y = hookQs[2].y + 55;
          }
          else if (checker(hookQsRvis)) {
            // console.log("QsRvis" + checker(hookQsRvis));
            bContainer.visible = true;

            // board1.visible = true;
            // board2.visible = true;
            // board3.visible = true;
            // question.visible = true;

            board1.x = hookQsR[0].x + 130;
            board2.x = hookQsR[1].x + 130;
            board3.x = hookQsR[2].x + 130;

            // board1.y = hookQsR[0].y + 40;
            // board2.y = hookQsR[1].y + 40;
            // board3.y = hookQsR[2].y + 40;
          }
        } catch (err) { }
      } else {




        // console.log("HookQs Position: " + hookQs[0].x);


        // 




        // console.log("hookPosf Position: " + hookPosf);




        // console.log("hookQsR Position = " + hookQsR[0].x);
        // console.log("board1 x: " + board1.x);

        // console.log(bgH);


        // bgH = 4370;
        // board1.x = hookQsR[0].x
        // board2.x = hookQsR[0].x;
        // board3.x = hookQsR[0].x;

        // board1.y = hookQsR[0].y
        // board2.y = hookQsR[0].y;
        // board3.y = hookQsR[0].y;
        // console.log("hookQsR Position =" + hookQsR[0].x);
        // console.log("board1 x: " + board1.x);
        // console.log(bgH);

      }








      // }

    } else if (bgH <= -1200) {
      if (hooksPlay == true && nextLevel == true) {
        // bgH = 4370;
        nextLevel = false;
      }
    }
    // console.log("BgH:" + bgH)
  }

  if (lContainer.visible == true) {
    console.log("lContainer visible: ," + lContainer.visible + " myNFTMarket" + myNFTMarket.x + "    " + myNFTMarket.y + " myNFTMarket.visible");
    setTsnRight(myNFTMarket, 1100);
    setTsnSlowR(myNFTbox, 1172);
    setTsnRight(nftButton, 1555);
    setTsnSlowTR(myNFTInfo);

  }


  // console.log("r" + hooksRemoved);
  // console.log("c" + hooksCreated);

  if (delayStart == true) {
    bgSpeed -= 0.10;
    console.log("delayStart + speed")

  }
  // console.log(delayStart == true)
  // console.log(bgSpeed)

  bgX = (bgX + bgSpeed);
  bgF = (bgF + bgSpeed);
  bgF2 = (bgF2 + bgSpeed);
  bgBack.tileTransform.position.x = bgX / 3.5;
  bgMiddle.tileTransform.position.x = bgX / 3.5;
  bgFront.tileTransform.position.x = bgX / 3.4;
  // console.log(bgX);

  if (blueGroup.x > -1200) {
    blueGroup.x = bgF / 2.1;
  } else {
    bgF = 5700;
    // 5700 = where the fish won't be seen on screen
    blueGroup.x = bgF / 2.1;
  }

  greyFish1.x = blueGroup.x + 1000;


  if (greyFish2.x > -1200) {
    greyFish2.x = bgF2 / 3;
  } else {
    bgF2 = 6800;
    greyFish2.x = bgF2 / 3;
  }
  // console.log(player.y);


  // console.log("BlueGroup Position is " + blueGroup.x);
  fgGrass1.tileTransform.position.x = bgX / 2;
  fgGrass2.tileTransform.position.x = bgX / 2;
  fgGrass3.tileTransform.position.x = bgX / 2;


  fgBack.tileTransform.position.x = bgX / 2;
  fgMiddle.tileTransform.position.x = bgX / 2;
  fgFront.tileTransform.position.x = bgX / 1.5;
  bkg.tileTransform.position.x = bgX / 1;


}
//CHECK IF QUESTION ANSWER IS CORRECT

function checkAnswer() {
  console.log("checking Answer");
  console.log(hookQs[0].x);

  if (bgH < 2422) {
    console.log("player y: " + player.y);
    for (let i = 0; i < correctAnswers.length; i++) {
      console.log(correctAnswers);
      console.log(" level check: " + levels[i]);
      if (levels[i] == true) {
        if (between(player.y, 104, 264)) {
          console.log("correct answer" + correctAnswers[i]);
          if (pairQuestions[i][0] == correctAnswers[i].replace('*', '')) {
            buttonSFX.play();
            console.log("Your Answer is Correct");

            onLevelWin();
          } else {
            console.log("Your Answer = " + pairQuestions[i][0])
            console.log(pairQuestions);
            console.log("correct answers" + correctAnswers);
            console.log("Correct Answer = " + correctAnswers[i])
            onGameEnd();
          }
        }
        else if (between(player.y, 287, 570)) {

          if (pairQuestions[i][1] == correctAnswers[i].replace('*', '')) {
            buttonSFX.play();
            console.log("Your Answer is Correct");
            onLevelWin();
          } else {

            console.log("Your Answer = " + pairQuestions[i][1])
            console.log("Correct Answer = " + correctAnswers[i])
            console.log(pairQuestions[i][1])
            onGameEnd();
          }
        }
        else if (between(player.y, 655, 855)) {

          if (pairQuestions[i][2] == correctAnswers[i].replace('*', '')) {
            buttonSFX.play();
            console.log("Your Answer is Correct");
            onLevelWin();
          } else {
            console.log("Your = " + pairQuestions[i][2])
            console.log("Correct Answer = " + correctAnswers[i])
            // console.log(pairQuestions[i][2])
            onGameEnd();
          }
        } else {
          setTimeout(() => {
            console.log("Not in correct Board Area")
            onGameEnd();
          }, 1000)



        }
      }
      console.log(gameEnded);
    }

  }
}


// GameEnd Logic for Home buttons
// function resetDataPairs() {
//     pairQ1 = []
//     pairQ2 = []
//     pairQ3 = []
//     pairQ4 = []
//     pairQ5 = []
// }

function removeQBoards() {

  for (let i = 0; i < 3; i++) {

    xContainer.removeChild(hookUp[i]);
    xContainer.removeChild(hookQs[i]);
    xContainer.removeChild(hookCombo[i]);
    xContainer.removeChild(hookQsR[i]);
    xContainer.removeChild(hookQsW[i]);
  }


  hookUp = [];
  hookQs = [];
  hookCombo = [];
  hookQsR = [];
  hookQsW = [];


}
function miniRemoveHQs() {
  levels = [];
  buttonStarted = false;
  console.log("Refreshing Hooks & Boards");
  xContainer.removeChild(myLevel);
  bContainer.removeChild(board1);
  bContainer.removeChild(board2);
  bContainer.removeChild(board3);
  fgContainer.removeChild(question);

  removeQBoards();

  gameEnd();
  hooksCreated = false;
  hooksRemoved = false;
  hooksPlay = false;

  bkg.visible = true;
  bkg2.visible = false;
  player.visible = false;
  delayStart = false;
  scoreCounter = 0;
  score.visible = false;
  bgH = 4370;
  hooksRemoved = false;
  hooksCreated = false;
  hooksPlay = false;
  hooksCalled = 0;
  myHScore.visible = false;

  moveQAs = false;
  pairQuestions = [];
  correctAnswers = [];


}

function checkAnsColor() {
  if (bgH < 2422) {
    console.log("player y: " + player.y);
    for (let i = 0; i < correctAnswers.length; i++) {
      if (levels[i] == true) {
        try {
          if (between(player.y, 104, 264)) {

            if (pairQuestions[i][0] == correctAnswers[i].replace('*', '')) {

              hookQsR[0].visible = true;
              hookQsR[1].visible = false;
              hookQsR[2].visible = false;
              hookQsW[0].visible = false;
              hookQsW[1].visible = true;
              hookQsW[2].visible = true;


            }
          }
          else if (between(player.y, 287, 570)) {

            if (pairQuestions[i][1] == correctAnswers[i].replace('*', '')) {

              hookQsR[0].visible = false;
              hookQsR[1].visible = true;
              hookQsR[2].visible = false;
              hookQsW[0].visible = true;
              hookQsW[1].visible = false;
              hookQsW[2].visible = true;

            }
          }
          else if (between(player.y, 655, 855)) {

            if (pairQuestions[i][2] == correctAnswers[i].replace('*', '')) {

              hookQsR[0].visible = false;
              hookQsR[1].visible = false;
              hookQsR[2].visible = true;
              hookQsW[0].visible = true;
              hookQsW[1].visible = true;
              hookQsW[2].visible = false;


            }

          }
        } catch (err) {
          console.log("pair Questions value" + pairQuestions[i][0]);
          console.log("correctAnswers[i] value" + correctAnswers[i].replace('*', ''));
        }


      }
    }
  }
}

// FUNCTION TO REMOVE HOOKS: REMOVEHOOKQS()
function removeHookQs() {

  // Hook Logic
  hooksPlay = false;
  moveQAs = true;
  board1.visible = true;
  board2.visible = true;
  board3.visible = true;
  question.visible = true;

  hooksRemoved = true;


  console.log("Removed hooks!");




  // console.log(player.y)
  for (let i = 0; i < 3; i++) {

    hookQs[i].visible = false;
    hookCombo[i].visible = false;
    hookQsR[i].visible = true;
    hookQsW[i].visible = true;
    hookUp[i].visible = true;



  }

  for (let i = 0; i < 3; i++) {
    hookUp[i].visible = true;
    hookUp[i].loop = true;

    if (hookUp[i].playing == false) {

      console.log("not playing yet, current frame = " + hookUp[i].currentFrame);
    }
    hookUp[i].animationSpeed = 1;

    // hookUp[i].onLoop = function () {
    //     // hookUp[i].stop();
    //     hookUp[i].animationSpeed = 0;
    //     console.log("resetting animation speed.")
    // }

    hookUp[i].onLoop = function () {

      if (hookUp[i].playing) {
        hookUp[i].animationSpeed = 0;
        hookUp[i].visible = false;
      }


    }


  }
  // setTimeout(() => {
  //     try {
  //         for (let i = 0; i < 3; i++) {
  //             console.log("resetting animation speed.")
  //             hookUp[i].animationSpeed = 0;
  //             // hookUp[i].visible = false;
  //             // hookUp[i].stop();
  //         }

  //     } catch (err) { };

  // }, 612);

  for (let i = 0; i < 3; i++) {
    hookUp[i].play();

    // if (hookUp[i].currentFrame == 36) {
    //     console.log("resetting animation speed.")
    //     hookUp[i].animationSpeed = 0;
    // }

    console.log("Animating question board");



    // hookQsR[i].loop = false;
    // hookQsR[i].animationSpeed = 1;
  }


  // setTimeout(() => {
  //     for (let i = 0; i < 3; i++) {
  //         console.log("resetting animation speed 2.")
  //         // hookQsR[i].animationSpeed = 0;
  //         hookQsR[i].loop = true;
  //     }
  // }, 848.99992);

  // for (let i = 0; i < 3; i++) {
  //     // hookQsR[i].play();




  //     hookQsW[i].loop = false;
  //     hookQsW[i].animationSpeed = 1;
  // }

  // setTimeout(() => {
  //     for (let i = 0; i < 3; i++) {
  //         console.log("resetting animation speed 3.")
  //         // hookQsW[i].animationSpeed = 0;
  //         hookQsW[i].loop = false;


  //     }

  // }, 848.99992);


  for (let i = 0; i < 3; i++) {
    // hookQsW[i].play();
    hookRemoveSFX.play();


    // hookCombo[i].play();
    // hookCombo[i].loop = false;

  }

  //Text Logic

  console.log("ready to check Answer & Return Level");

  console.log("Player is ahead of hookPosf");

  console.log("gameEnded = " + gameEnded);


  if (gameEnded == false) {
    checkAnsColor();
    checkAnswer();
  }



  console.log(gameEnded);






}
function createHookQs() {
  console.log(gameEnded);


  hookPlay();
  // Blank Question Board Creation


  console.log("Hooks created!");
  let hkDTextures = [];
  hkDTextures = [];
  const hqTexture = PIXI.Texture.from(`./Game Files/Sprites/backgroundItems/BackgroundItems/Final/Hook/hookQuestion.png`);
  for (let i = 0; i < 37; i++) {
    const hkDTexture = PIXI.Texture.from(`./Game Files/Sprites/GameSprites/Hook/HookD/frame_${i}_delay-0.1s.png`);
    hkDTextures.push(hkDTexture);
  }




  // Hook Creation

  for (let i = 0; i < 3; i++) {
    const hookC = new PIXI.AnimatedSprite(hkDTextures);
    hookC.visible = false;
    console.log(typeof (hookC));
    hookC.position.set(1420 - (30 * (i + 1)), -150 - (300 * (i + 1)));
    // hook.loop = false;
    // hook.onLoop = function () {
    //     hook.loop = false;
    //     // hook.stop();
    // }
    hookC.scale.set(1.5, 1.5);
    hookC.animationSpeed = 1 + (0.1 * (i + 1));

    hookCombo.push(hookC);

    xContainer.addChild(hookCombo[i]);

  }
  for (let i = 0; i < 3; i++) {
    const hookQ = new PIXI.Sprite.from(hqTexture);
    hookQ.position.set(1300 + (30 * (i + 1)), -200 + (300 * (i + 1)));
    hookQ.scale.set(0.5, 0.5);

    hookQ.visible = false;
    hookQs.push(hookQ);

    xContainer.addChild(hookQs[i]);
    console.log("added " + hookQs[i]);
  }

  for (let i = 0; i < 3; i++) {


    hookQs[i].visible = true;



  }


  let hkUTextures = [];
  // let hQRTextures = [];
  // let hQWTextures = [];

  hkUTextures = [];
  // hQRTextures = [];
  // hQWTextures = [];


  for (let i = 0; i < 37; i++) {
    const hkUTexture = PIXI.Texture.from(`./Game Files/Sprites/GameSprites/Hook/HookU/frame_${i}_delay-0.1s.png`);
    hkUTextures.push(hkUTexture);
  }

  // for (let i = 0; i < 51; i++) {
  //     const hQRTexture = PIXI.Texture.from(`./Game Files/Sprites/GameSprites/Hook/HQR/frame_${i}_delay-0.05s.png`);
  //     hQRTextures.push(hQRTexture);
  // }

  const hQRTexture = PIXI.Texture.from(`./Game Files/Sprites/GameSprites/Hook/hookQuestionR.png`);

  // for (let i = 0; i < 51; i++) {
  //     const hQWTexture = PIXI.Texture.from(`./Game Files/Sprites/GameSprites/Hook/HQW/frame_${i}_delay-0.05s.png`);
  //     hQWTextures.push(hQWTexture);
  // }

  const hQWTexture = PIXI.Texture.from(`./Game Files/Sprites/GameSprites/Hook/hookQuestionW.png`);

  for (let i = 0; i < 3; i++) {

    const hookU = new PIXI.AnimatedSprite(hkUTextures);
    hookU.position.set(810 + (30 * (i + 1)), -1350 + (300 * (i + 1)));

    hookU.scale.set(1.5, 1.5);
    hookU.animationSpeed = 1 + (0.1 * i);
    hookU.loop = false;
    // hook.onLoop = function () {
    //     hook.loop = false;
    //     // hook.stop();
    // }

    hookU.visible = false;
    // hookU.onFrameChange = function () {
    //     console.log("Hookup Frame Changed.")
    //     // updated!
    // };
    // hookU.onComplete = function () {
    //     hookU.currentFrame = 0;
    // }
    hookUp.push(hookU);
    xContainer.addChild(hookUp[i]);
    console.log("new freaking Hooks" + hookUp.length + " " + i);


  }
  for (let i = 0; i < 3; i++) {

    const hookQR = new PIXI.Sprite.from(hQRTexture);
    hookQR.position.set(app.screen.width + 500, -200 + (300 * (i + 1)));
    hookQR.scale.set(0.5, 0.5);
    // hookQR.animationSpeed = 1;
    hookQR.visible = false;
    // hookQR.loop = false;
    // hookQR.onLoop = function () {
    //     // hookQR.stop();
    //     hookQR.loop = false;

    // }
    hookQsR.push(hookQR);

    xContainer.addChild(hookQsR[i]);



    const hookQW = new PIXI.Sprite.from(hQWTexture);
    hookQW.position.set(app.screen.width + 500, -200 + (300 * (i + 1)));
    hookQW.scale.set(0.5, 0.5);
    // hookQW.animationSpeed = 1;
    hookQW.visible = false;
    // hookQW.loop = false;
    // hookQW.onLoop = function () {  
    // //  hookQW.stop();
    //     hookQW.loop = false;

    // }

    hookQsW.push(hookQW);

    xContainer.addChild(hookQsW[i]);


  }


  //Text Logic






  hooksCreated = true;
  hookPlay();

}

function hookPlay() {
  moveQAs = false;
  if (hooksCreated == false && hooksCalled == 0) {
    // hooksCalled += 1;



    getQandA("0", "1", "2", "3");
    console.log("got Q&As");
    fgContainer.addChild(question);

  }
  if (hooksCreated == true) {


    if (hooksCalled < 6) {

      for (let i = 0; i < 3; i++) {

        hookQsR[i].visible = false;
        hookQsW[i].visible = false;
        hookQs[i].visible = true;


      }

      // Replaying Hooks
      for (let i = 0; i < 3; i++) {

        hookCombo[i].loop = false;

        hookCombo[i].visible = true;
        hookCombo[i].play();
        if (hooksCalled < 5) {
          hookSplashSFX.play();
        }



      }
    }
    hooksRemoved = false;
    moveQAs = false;
    console.log("# of Hooks Called: " + hooksCalled);
    if (hooksCalled == 0) {
      hooksCalled += 1;
      returnLevel();

    } else if (hooksCalled > 0 && hooksCalled < 7) {
      hooksCalled += 1;
      returnLevel();
    }

    console.log("# of Hooks Called now: " + hooksCalled);

    for (let i = 0; i < levels.length - 1; i++) {
      if (levels[i] == true) {
        myLevel.text = "Level: " + (i + 1);
        console.log(myLevel.text + " Loaded")
      }

    }
    let fn = levels.length - 1
    bossLevel = levels[fn]
    if (bossLevel == true) {
      myLevel.text = "Level " + levels.length + " : Boss Level "
      correct.text = correctAnswers[correctAnswers.length - 1].replace('*', '') + " is Correct! You won an NFT in your inventory!"
    }

    if (level1) {
      console.log(pairQ1[0], pairQ1[1], pairQ1[2], pairQ1[3]);
      updateQandA(pairQ1[0], pairQ1[1], pairQ1[2], pairQ1[3]);

      // for (let i = 0; i < 8; i++) {
      //     if (bgSpeed < minSpeed) {
      //     bgSpeed += 1
      //     console.log("speed" + bgSpeed);
      //     }
      // }



    }
    else if (level2) {

      updateQandA(pairQ2[0], pairQ2[1], pairQ2[2], pairQ2[3]);

    } else if (level3) {

      updateQandA(pairQ3[0], pairQ3[1], pairQ3[2], pairQ3[3]);
    } else if (level4) {
      updateQandA(pairQ4[0], pairQ4[1], pairQ4[2], pairQ4[3]);
    } else if (level5) {
      updateQandA(pairQ5[0], pairQ5[1], pairQ5[2], pairQ5[3]);

      // for (let i = 0; i < 11; i++) {
      //     if (bgSpeed < minSpeed) {
      //     bgSpeed += 1
      //     console.log("speed" + bgSpeed);

      //     }
      // }
    }
    if (hooksCalled < 6) {
      hooksPlay = true;
      console.log(gameEnded);
    } else {
      hooksPlay = false;
    }



  }


}

//Will move most of start game procedures into this function
function onGameStart() {
  setTimeout(function () {


    delayStart = false;
  }, 3000);


}

//A function that creates the high score & NFT Images displays;
function gameEnd() {
  scores.push(scoreCounter);
  myHScore.text = "High Scores           "
  scores.sort(function (a, b) {
    return a - b;
  }).reverse();

  for (var i = 0; i < scores.length; i++) {
    myHScore.text += scores[i] + "                                  "
  }

  scoreCounter = 0;
}


function initLevel() {
  technoMusic.play();
  hookSplashSFX.play();

  // validate();
  getScore(scoreCounter);
  score.visible = false;


  //Initialize Background Images
  bkg = new PIXI.TilingSprite(app.loader.resources["bkg"].texture, app.screen.width, app.screen.height);
  bkg2 = new PIXI.TilingSprite(app.loader.resources["bkg2"].texture, app.screen.width, app.screen.height);
  bkg2.visible = false;

  bkgContainer.addChild(bkg);
  bkgContainer.addChild(bkg2);

  //Initialize Fish Textures
  const bfTextures = [];
  for (let i = 0; i < 16; i++) {
    const bfTexture = PIXI.Texture.from(`./Game Files/Sprites/backgroundItems/BackgroundItems/Final/BlueFishS/bluefish_${i}.png`);
    bfTextures.push(bfTexture);
  }

  const bgTextures = [];
  for (let i = 0; i < 16; i++) {
    const bgTexture = PIXI.Texture.from(`./Game Files/Sprites/backgroundItems/BackgroundItems/Final/Shadows/BlueGroup/bluegroup_${i}.png`);
    bgTextures.push(bgTexture);
  }

  const gfTextures = [];
  for (let i = 0; i < 11; i++) {
    const gfTexture = PIXI.Texture.from(`./Game Files/Sprites/backgroundItems/BackgroundItems/Final/Shadows/GreyFish1/greyShadow_${i}.png`);
    gfTextures.push(gfTexture);
  }
  const gf2Textures = [];
  for (let i = 0; i < 17; i++) {
    const gf2Texture = PIXI.Texture.from(`./Game Files/Sprites/backgroundItems/BackgroundItems/Final/Shadows/GreyFish2/greyNShadow_${i}.png`);
    gf2Textures.push(gf2Texture);
  }


  // loading image Texture
  const ldTextures = [];
  for (let i = 0; i < 11; i++) {
    const ldTexture = PIXI.Texture.from(`./Game Files/Sprites/backgroundItems/BackgroundItems/Final/LoadingS/loading_${i}.png`);
    ldTextures.push(ldTexture);
  }



  //Players' & Background Fish Initialization
  player = new PIXI.AnimatedSprite(bfTextures);
  player.anchor.set(0.5);
  player.position.set(app.view.width / 2, app.view.height / 2);
  player.scale.set(1.25, 1.25);
  player.animationSpeed = 0.25;
  player.visible = false;
  player.play();

  blueGroup = new PIXI.AnimatedSprite(bgTextures);
  blueGroup.position.set(1200, 200);
  blueGroup.scale.set(0.5, 0.5);
  blueGroup.animationSpeed = 0.25;
  blueGroup.play();

  greyFish1 = new PIXI.AnimatedSprite(gfTextures);
  greyFish1.position.set(1900, 200);
  greyFish1.scale.set(0.5, 0.5);
  greyFish1.animationSpeed = 0.125;
  greyFish1.play();

  greyFish2 = new PIXI.AnimatedSprite(gf2Textures);
  greyFish2.position.set(2100, 300);
  greyFish2.scale.set(0.35, 0.35);
  greyFish2.animationSpeed = 0.105;
  greyFish2.play();

  loadingSprite = new PIXI.AnimatedSprite(ldTextures);
  loadingSprite.position.set(1200, 700);
  loadingSprite.scale.set(0.5, 0.5);
  loadingSprite.animationSpeed = 0.125;
  loadingSprite.visible = false;
  loadingSprite.play();


  //Creating Background Sprites & Adding All Sprites to the stage

  // xContainer.addChild(myScore);
  aContainer.addChild(blueGroup);
  aContainer.addChild(greyFish1);
  bkgContainer.addChild(greyFish2);

  bgBack = createBg(app.loader.resources["bgBack"].texture);
  bgMiddle = createBg(app.loader.resources["bgMiddle"].texture);
  bgFront = createBg(app.loader.resources["bgFront"].texture);

  fgGrass1 = createBg(app.loader.resources["fgGrass1"].texture);
  fgGrass2 = createBg(app.loader.resources["fgGrass2"].texture);
  fgGrass3 = createBg(app.loader.resources["fgGrass3"].texture);

  fgBack = createBg(app.loader.resources["fgBack"].texture);
  fgMiddle = createBg(app.loader.resources["fgMiddle"].texture);



  fgContainer.addChild(player);

  fgContainer.addChild(bkgFilter);

  fgContainer.addChild(myInfo);

  fgContainer.addChild(score);

  fgContainer.addChild(correct);

  fgContainer.addChild(myLevel);



  fgFront = createFg(app.loader.resources["fgFront"].texture);

  document.addEventListener("keyup", switchDir);



  console.log("height + width", nftContainer.width, nftContainer.height)

  app.ticker.add(gameLoop)

}
//Function to create Foreground Sprites from Textures
function createFg(texture) {
  let tiling = new PIXI.TilingSprite(texture, app.screen.width, app.screen.height / 2)
  if (texture == app.loader.resources["fgFront"].texture) {
    tiling.position.set(0, 675);
    tiling.tileScale.x = 0.6;
    tiling.tileScale.y = 0.6;
    xContainer.addChild(tiling);
  }
  return tiling;
}

//Function to create Background Sprites from Textures
function createBg(texture) {

  let tiling = new PIXI.TilingSprite(texture, app.screen.width, app.screen.height / 2)
  if (texture == app.loader.resources["bgBack"].texture) {
    tiling.position.set(0, 600);
    tiling.tileScale.x = 0.5;
    tiling.tileScale.y = 0.5;
  }
  else if (texture == app.loader.resources["bgMiddle"].texture) {
    tiling.position.set(0, 510);

    tiling.tileScale.x = 0.3;
    tiling.tileScale.y = 0.3;
  } else if (texture == app.loader.resources["bgFront"].texture) {
    tiling.position.set(0, 450);
    tiling.tileScale.x = 0.5;
    tiling.tileScale.y = 0.5;
  } else if (texture == app.loader.resources["fgBack"].texture) {
    tiling.position.set(0, 710);

  }
  else if (texture == app.loader.resources["fgMiddle"].texture) {
    tiling.position.set(0, 350);

    tiling.tileScale.x = 0.8;
    tiling.tileScale.y = 0.8;
  }

  else if (texture == app.loader.resources["fgGrass1"].texture) {
    tiling.position.set(0, 598);
    tiling.tileScale.x = 0.6;
    tiling.tileScale.y = 0.6;
  } else if (texture == app.loader.resources["fgGrass2"].texture) {
    tiling.position.set(0, 598);
    tiling.tileScale.x = 0.6;
    tiling.tileScale.y = 0.6;
  } else if (texture == app.loader.resources["fgGrass3"].texture) {
    tiling.position.set(0, 598);
    tiling.tileScale.x = 0.6;
    tiling.tileScale.y = 0.6;
  }



  xContainer.addChild(tiling);
  return tiling;
}

function switchDir(e) {
  maxSpeed = -24;
  minSpeed = -6;
  sIncrement = 1;
  // console.log(e.keyCode);
  switch (e.keyCode) {

    case 39:
      // right arrow

      if (bgSpeed > maxSpeed && buttonStarted == true) {

        console.log("increasing speed");
        bgSpeed -= sIncrement
      } else {
        console.log("max speed: " + maxSpeed);
      }
      break;
    case 37:
      if (bgSpeed < minSpeed && delayStart == false) {

        console.log("decreasing speed");
        bgSpeed += sIncrement
      } else {
        console.log("min speed: " + buttonStarted == true);
      }

      break;
    case 32:

      // bgSpeed = 0;
      break;

  }
}

//Adding all containers to stage upon Initialization
app.stage.addChild(bkgContainer);
app.stage.addChild(aContainer);
app.stage.addChild(xContainer);
app.stage.addChild(bContainer);
app.stage.addChild(sContainer);
app.stage.addChild(nftContainer);
app.stage.addChild(fgContainer);
app.stage.addChild(popupContainer);

app.stage.addChild(gmContainer);
app.stage.addChild(lContainer);




oceanSFX.play();


}

